import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react'

import axios from 'axios'
import moment from 'moment'
import { message } from 'antd'
import API from '@mybricks/sdk-for-app/api'
import toolsPlugin from '@mybricks/plugin-tools'
import versionPlugin from 'mybricks-plugin-version'
import { Locker, Toolbar } from '@mybricks/sdk-for-app/ui'
import { config as ThemePlugin } from '@mybricks/plugin-theme'

import css from './designer.less'

const SPADesigner = (window as any).mybricks.SPADesigner
// const LOCAL_DATA_KEY = '"--mybricks--'

export default function Designer({ appData }) {
  const designerRef = useRef<{ dump: () => any, toJSON: () => any, getPlugin: (namespace: string) => any, geoView: { canvasDom } }>()
  const [operable, setOperable] = useState(false)
  const [beforeunload, setBeforeunload] = useState(false)
  const [saveTip, setSaveTip] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)
  const [publishLoading, setPublishLoading] = useState(false)

  const save = useCallback((param: { name?; shareType?; content?; icon?},
    skipMessage?: boolean) => {
    if (!operable) {
      message.warn('请先点击右上角个人头像上锁获取页面编辑权限')
      return
    }

    const { name, shareType, content, icon } = param
    API.File.save({
      userId: appData.user.id,
      fileId: appData.fileId,
      name,
      shareType,
      content,
      icon,
    }).then(() => {
      !skipMessage && message.success(`保存完成`);
      if (content) {
        setSaveTip(`改动已保存-${moment(new Date()).format('HH:mm')}`)
      }
    }).catch(e => {
      !skipMessage && message.error(`保存失败：${e.message}`);
      if (content) {
        setSaveTip('保存失败')
      }
    }).finally(() => {
      setSaveLoading(false)
    })
  }, [operable])

  const onSaveClick = useCallback(() => {
    setSaveLoading(true)

    const json = designerRef.current.dump()
    save({ name: appData.fileContent.name, content: JSON.stringify(json) })

    setBeforeunload(false)

    API.App.getPreviewImage({ // Todo... name 中文乱码
      element: designerRef.current.geoView.canvasDom,
      // name: `${ctx.fileItem.name}.png`
    }).then(res => {
      const url = new URL(res)

      if (url.protocol === 'https:') {
        url.protocol = 'http:'
      }

      save({ icon: url.href }, true)
    }).catch((err) => {
      console.error(err)
    })

  }, [operable])

  const onPublishClick = useCallback(async () => {
    setPublishLoading(true)
    const json = designerRef.current.dump()
    save({ name: appData.fileContent.name, content: JSON.stringify(json) })

    setBeforeunload(false)

    const toJSON = designerRef.current.toJSON()

    const themesConfig = toJSON.plugins['@mybricks/plugins/theme/config']

    const res = await axios.post('/api/theme/publish', {
      userId: appData.user.id,
      fileId: appData.fileId,
      json: themesConfig,
      title: appData.fileContent.name
    })

    if (res.data.code === 1) {
      message.success({
        key: 'publish',
        content: '发布成功',
        duration: 2,
      })

    } else {
      message.error({
        content: res.data.message || '发布失败',
        duration: 2,
      })
    }

    setPublishLoading(false)
  }, [operable])

  useEffect(() => {
    if (beforeunload) {
      window.onbeforeunload = () => {
        return true
      }
    } else {
      window.onbeforeunload = null
    }
  }, [beforeunload])

  const onEdit = useCallback(() => {
    setBeforeunload(true);
  }, [])

  const RenderLocker = useMemo(() => {
    return (
      <Locker
        statusChange={(status) => {
          setOperable(status === 1)
        }}
      />
    )
  }, [])

  return (
    <div className={`${css.view} fangzhou-theme`}>
       <Toolbar title={appData.fileContent.name} updateInfo={<Toolbar.LastUpdate content={saveTip} />}>
        {RenderLocker}
        <Toolbar.Save
          disabled={!operable}
          loading={saveLoading}
          onClick={onSaveClick}
          dotTip={beforeunload}
        />
        <Toolbar.Button
          disabled={!operable}
          loading={publishLoading}
          onClick={onPublishClick}
        >发布</Toolbar.Button>
      </Toolbar>
      <div className={css.designer}>
        <SPADesigner
          ref={designerRef}
          config={spaDesignerConfig({appData})}
          onEdit={onEdit}
        />
      </div>
    </div>
  )
}

function spaDesignerConfig ({appData}) {
  return {
    plugins: [
      ThemePlugin,
      versionPlugin({
        user: appData.user,
        file: appData.fileContent || {}
      }),
      toolsPlugin(),
    ],
    comLibLoader() {
      return new Promise((resolve) => {
        // TODO: 先写死
        resolve(['https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/comlibs/7632_1.2.67/2023-08-22_20-42-39/edit.js', 'https://f2.eckwai.com/kos/nlav12333/fangzhou/pub/comlibs/7182_1.0.53/2023-08-14_19-41-04/edit.js'])
      })
    },
    pageContentLoader() {
      return new Promise((resolve) => {
        resolve(appData.fileContent.content)
      })
    },
    // TODO: 临时开放，需要看类似选中、悬浮、禁用状态等
    toplView: {},
    com: {
      env: {
        i18n(title) {
          return title
        },
      }
    },
    geoView: {
      layout: 'absolute',
      scenes: {
        adder: [
          {
            type: 'normal',
            title: '普通场景',
            layout: 'absolute'
          },
          {
            type: 'popup',
            title: '对话框',
            template: {
              namespace: 'mybricks.basic-comlib.popup',
              deletable: false,
              asRoot: true
            }
          },
          {
            type: 'popup',
            title: '抽屉',
            template: {
              namespace: 'mybricks.basic-comlib.drawer',
              deletable: false,
              asRoot: true
            }
          },
        ]
      },
      theme:{
        css:[
          'https://f2.beckwai.com/udata/pkg/eshop/fangzhou/pub/pkg/antd-4.21.6/antd.variable.min.css'
        ],
      },
    }
  }
}
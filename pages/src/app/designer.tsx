import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react'

import axios from 'axios'
import moment from 'moment'
import { message, Button } from 'antd'
import API from '@mybricks/sdk-for-app/api'
// import toolsPlugin from '@mybricks/plugin-tools'
import versionPlugin from 'mybricks-plugin-version'
import { Locker, Toolbar } from '@mybricks/sdk-for-app/ui'

import myEditors from './editors'
import { traverse, initThemeInfo, initTemplateInfo } from './editors/theme/view/config'

import css from './designer.less'
import notePlugin from '@mybricks/plugin-note'
import upload from './utils/upload'
import searchUser from './utils/searchUser'
import { createFromIconfontCN } from '@ant-design/icons'

const SPADesigner = window.mybricks.SPADesigner
// const LOCAL_DATA_KEY = '"--mybricks--'

export default function Designer({ appData }) {
  const designerRef = useRef<{ 
    dump: () => any, 
    toJSON: () => any, 
    geoView: { canvasDom }, 
    loadContent: (content: any) => void,
    components: {
      getAll: () => any
    }
  }>()
  const [operable, setOperable] = useState(false);
  const operableRef = useRef(operable);
  const [beforeunload, setBeforeunload] = useState(false)
  const [saveTip, setSaveTip] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)
  const [publishLoading, setPublishLoading] = useState(false)
  const context = useMemo(() => {
    const content = appData.fileContent.content
    return {
      theme: content.theme || {
        themes: [],
        variables: [],
        templates: []
      },
      componentType: content.componentType || 'PC'
    }
  }, [])

  const [ctx, setCtx] = useState(() => {
    return {
      fontJS: appData.fileContent?.content?.fontJS
    }
  })

  //页面刷新的时候，添加fontJS资源
  useEffect(() => {
    createFromIconfontCN({
      scriptUrl: ctx.fontJS, // 在 iconfont.cn 上生成
    })
  }, [ctx.fontJS])

  const save = useCallback((param: { name?; shareType?; content?; icon?},
    skipMessage?: boolean) => {
    if (!operableRef.current) {
      message.warn('请先点击右上角个人头像上锁获取页面编辑权限')
      return
    }

    const { name, shareType, content, icon } = param
    appData.save({
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

  const getSaveJson = useCallback(() => {
    const json = designerRef.current.dump()
    const { themes } = initThemeInfo(traverse(designerRef.current.components.getAll()).reduce((f, s) => [...f, ...s], []), context.theme.themes)
    const { templates } = initTemplateInfo(traverse(designerRef.current.components.getAll()).reduce((f, s) => [...f, ...s], []), context.theme.templates || [])
    
    context.theme.themes = themes
    context.theme.templates = templates
    json.theme = context.theme
    json.componentType = context.componentType
    json.fontJS = ctx.fontJS

    return json
  }, [])

  const onSaveClick = useCallback(() => {
    setSaveLoading(true)
    const json = getSaveJson()
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
    const json = getSaveJson()
    save({ name: appData.fileContent.name, content: JSON.stringify(json) }, true)

    setBeforeunload(false)

    const res = await axios.post('/api/theme/publish', {
      userId: appData.user.id,
      fileId: appData.fileId,
      json: json.theme,
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
          operableRef.current = status === 1
        }}
        compareVersion={true}
      />
    )
  }, [])

  return (
    <div className={`${css.view} fangzhou-theme`}>
      <Toolbar title={appData.fileContent.name} updateInfo={<Toolbar.LastUpdate content={saveTip} />}>
        <Toolbar.Tips/>
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
        <Toolbar.Tools
          onImport={(value) => {
            try {
              const { content, theme } = JSON.parse(value)
              context.theme = theme || {
                themes: [],
                variables: [],
                templates: []
              }
              designerRef.current.loadContent(content)
            } catch (e) {
              message.error(e)
              console.error(e)
            }
          }}
          getExportDumpJSON={() => {
            return getSaveJson()
          }}
          getExportToJSON={() => {
            return designerRef.current.toJSON()
          }}
        />
      </Toolbar>
      <div className={css.designer}>
        <SPADesigner
          ref={designerRef}
          config={spaDesignerConfig({
            ctx,
            appData, 
            onSaveClick,
            designerRef, 
            context 
          })}
          onEdit={onEdit}
        />
      </div>
    </div>
  )
}

function spaDesignerConfig ({ ctx, appData, onSaveClick, designerRef, context }) {
  const content = appData.fileContent?.content || {}
  const isH5 = content.componentType === 'H5'

  return {
    shortcuts: {
      'ctrl+s': [onSaveClick],
    },
    plugins: [
      versionPlugin({
        user: appData.user,
        file: appData.fileContent || {}
      }),
      notePlugin({
        user: appData.user,
        onUpload: async (file: File) => {
          return new Promise(async (resolve, reject) => {
            try {
              const res = await upload(`api/theme/upload`, file);
              console.log(res, 'onUpload')
              resolve(res);
            } catch (e) {
              message.error('上传图片失败!');
              reject(e);
            }
          })
        },
        onSearchUser: (keyword: string) => {
          return new Promise(async (resolve, reject) => {
            try {
              const res = await searchUser(`api/theme/searchUser`, {
                keyword
              });
              const formatRes = (res || []).map(item => {
                const { email, id, name, avatar } = item;
                return {
                  name: name ? `${name}(${email})` : email,
                  id,
                  username: email,
                  orgDisplayName: '',
                  thumbnailAvatarUrl: avatar
                }
              })
              resolve(formatRes);
            } catch (e) {
              message.error('搜索用户失败!');
              reject('搜索用户失败!');
            }
          })
        }
      }),
      // toolsPlugin(),
    ],
    comLibLoader() {
      return new Promise((resolve) => {
        
        // TODO: 先写死
        const localComlibs = JSON.parse(localStorage.getItem('MYBRICKS_APP_THEME_COMLIBS'))
        if (localComlibs) {
          resolve(localComlibs)
        } else if (isH5) {
          resolve(['public/comlibs/h5.js'])
        } else {
          resolve([
            'public/comlibs/mybricks.normal-pc.js',
            'public/comlibs/mybricks.basic-comlib.js',
          ])
        }
      })
    },
    pageContentLoader() {
      return new Promise((resolve) => {
        resolve(appData.fileContent.content)
      })
    },
    // TODO: 临时开放，需要看类似选中、悬浮、禁用状态等
    toplView: {},
    editView: {
      width: 400,
      editorAppender(editConfig) {
        editConfig.fontJS = ctx.fontJS
        return myEditors({ editConfig, designerRef, context }, { fileId: appData.fileId })
      },
      items(_, cate0) {
        cate0.title = '主题包'
        cate0.items = [
          {
            title: '主题包配置',
            type: 'Theme'
          },
          {
            items: [
              {
                title: 'iconfont js链接',
                type: 'Text',
                description: '设置iconfont js链接',
                value: {
                  get() {
                    return ctx.fontJS
                  },
                  set(context, v: string) {
                    ctx.fontJS = v
                    createFromIconfontCN({
                      scriptUrl: v, // 在 iconfont.cn 上生成
                    })
                  },
                },
              },
            ],
          },
        ]
      },
      editorOptions: {
        expression: {
          CDN: {
            codemirror: '/mfs/editor_assets/codemirror/codemirror_1.0.13_index.min.js'
          }
        },
        richtext: {
          CDN: {
            tinymce: '/mfs/editor_assets/richText/tinymce/5.7.1/tinymce.min.js',
            language: '/mfs/editor_assets/richText/tinymce/5.7.1/zh_CN.js',
          }
        },
        align: {
          CDN: {
            left: '/mfs/editor_assets/align/left.defc4a63ebe8ea7d.svg',
            rowCenter: '/mfs/editor_assets/align/center.c284343a9ff9672a.svg',
            right: '/mfs/editor_assets/align/right.a7763b38b84b5894.svg',
            top: '/mfs/editor_assets/align/top.98906024d52b69de.svg',
            columnCenter: '/mfs/editor_assets/align/center.100376f4ade480cd.svg',
            bottom: '/mfs/editor_assets/align/bottom.6ee532067ed440ca.svg',
            column: '/mfs/editor_assets/align/column-space-between.31d560c0e611198f.svg',
            row: '/mfs/editor_assets/align/row-space-between.ead5cd660c0f1c33.svg',
          }
        },
        array: {
          CDN: {
            sortableHoc: '/mfs/editor_assets/react-sortable/react-sortable-hoc-2.0.0_index.umd.min.js'
          }
        },
        expcode: {
          CDN: {
            prettier: {
              standalone: '/mfs/editor_assets/prettier/2.6.2/standalone.js',
              babel: '/mfs/editor_assets/prettier/2.6.2/parser-babel.js'
            },
            eslint: '/mfs/editor_assets/eslint/8.15.0/eslint.js',
            paths: {
              vs: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs",
            },
            monacoLoader: '/mfs/editor_assets/monaco-editor/0.33.0/min/vs/loader.min.js'
          }
        },
        csseditor: {
          CDN: {
            prettier: {
              standalone: '/mfs/editor_assets/prettier/2.6.2/standalone.js',
              babel: '/mfs/editor_assets/prettier/2.6.2/parser-babel.js'
            },
            eslint: '/mfs/editor_assets/eslint/8.15.0/eslint.js',
            paths: {
              vs: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs",
            },
            monacoLoader: '/mfs/editor_assets/monaco-editor/0.33.0/min/vs/loader.min.js'
          }
        },
        stylenew: {
          CDN: {
            prettier: {
              standalone: '/mfs/editor_assets/prettier/2.6.2/standalone.js',
              babel: '/mfs/editor_assets/prettier/2.6.2/parser-babel.js'
            },
            eslint: '/mfs/editor_assets/eslint/8.15.0/eslint.js',
            paths: {
              vs: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs",
            },
            monacoLoader: '/mfs/editor_assets/monaco-editor/0.33.0/min/vs/loader.min.js'
          }
        },
        code: {
          CDN: {
            prettier: {
              standalone: '/mfs/editor_assets/prettier/2.6.2/standalone.js',
              babel: '/mfs/editor_assets/prettier/2.6.2/parser-babel.js'
            },
            eslint: '/mfs/editor_assets/eslint/8.15.0/eslint.js',
            paths: {
              vs: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs",
            },
            monacoLoader: '/mfs/editor_assets/monaco-editor/0.33.0/min/vs/loader.min.js'
          }
        }
      }
    },
    com: {
      env: {
        i18n(title) {
          return title
        },
        design: true
      }
    },
    geoView: {
      width: 600,
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
          'public/antd-4.21.6/antd.variable.min.css'
        ],
      },
    }
  }
}

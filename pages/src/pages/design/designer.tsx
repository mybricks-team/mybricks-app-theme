import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useLayoutEffect
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

import { DESIGN_MATERIAL_EDITOR_OPTIONS, mergeEditorOptions, PURE_INTERNET_EDITOR_OPTIONS } from "./editor-options";

import comlibLoader from "./configs/comLibLoader";
import comLibAdder from "./configs/comLibAdder";
import { getInitComLibs } from './configs/utils/getComlibs'
import { DESIGNER_STATIC_PATH } from "../constants";
import { getDomainFromPath } from "../utils";
// import { initThemeGlobal } from "./editors/ThemeGlobal"
import { initThemeGlobal } from "./editors/Design/utils";
import classNames from "classnames";
import { publish as publish_icon } from './icon/publish'
import Dialog from "./editors/Design/Variables/Dialog/Dialog";
import { useUpdateEffect } from './editors/hooks'

// const LOCAL_DATA_KEY = '"--mybricks--'

export default function Designer({ appData }) {
  const [openDesignDialog, setOpenDesignDialog] = useState(false);
  const [SPADesigner, setSPADesigner] = useState(null)
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

  const [statesChangeCallBack] = useState({
    openDesignDialog: new Set<any>(),
  })
  const statesRef = useRef({
    openDesignDialog,
  })

  useUpdateEffect(() => {
    Array.from(statesChangeCallBack.openDesignDialog).forEach((fn) => fn(openDesignDialog))
  }, [openDesignDialog])

  const appConfig = useMemo(() => {
    let config = null
    try {
      const originConfig = appData.config[APP_NAME]?.config || {}
      config =
        typeof originConfig === 'string'
          ? JSON.parse(originConfig)
          : originConfig
    } catch (error) {
      console.error('get appConfig error', error)
    }
    return config || {}
  }, [appData.config[APP_NAME]?.config])

  const [ctx, setCtx] = useState(() => {
    return {
      user: appData.user,
      fileId: appData.fileId,
      sdk: {
        projectId: appData.projectId,
        openUrl: appData.openUrl,
      },
      fontJS: appData.fileContent?.content?.fontJS,
      setting: appData.config || {},
      comlibs: [],
      latestComlibs: [],
      hasMaterialApp: appData.hasMaterialApp,
      uploadService: appConfig?.uploadServer?.uploadService || ''
    }
  })

  const loadDesigner = useCallback(() => {
    const designer = appConfig.designer?.url || DESIGNER_STATIC_PATH
    if (designer) {
      const script = document.createElement('script')
      script.src = designer
      document.head.appendChild(script)
      script.onload = () => {
        ;(window as any).mybricks.SPADesigner &&
          setSPADesigner((window as any).mybricks.SPADesigner)
      }
    }
  }, [])

  useLayoutEffect(() => {
    appData.getInitComLibs({
      localComlibs: [],
      currentComlibs: appData.fileContent?.content?.comlibs,
    }).then(({ comlibs, latestComlibs }) => {
      const hasAIComlib = comlibs.some(lib => lib.namespace === 'mybricks.ai-comlib-pc');

      setCtx((pre) => ({ ...pre, comlibs, hasAIComlib, latestComlibs }))
    }).finally(loadDesigner)
  }, [])

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
    // const { themes } = initThemeInfo(traverse(designerRef.current.components.getAll()).reduce((f, s) => [...f, ...s], []), context.theme.themes)
    const { templates } = initTemplateInfo(traverse(designerRef.current.components.getAll()).reduce((f, s) => [...f, ...s], []), context.theme.templates || [])

    // context.theme.themes = themes
    context.theme.templates = templates
    json.theme = context.theme
    json.componentType = context.componentType
    json.fontJS = ctx.fontJS
    json.comlibs = ctx.comlibs

    return json
  }, [ctx])

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
  }, [ctx, operable])

  const onPublishClick = useCallback(async () => {
    setPublishLoading(true)
    const json = getSaveJson()
    save({ name: appData.fileContent.name, content: JSON.stringify(json) }, true)

    setBeforeunload(false)

    const publishTheme = JSON.parse(JSON.stringify(json.theme))

    const newThemes = [];
    const hash = {};
    const namespaceSet = new Set();

    publishTheme.themes.forEach((theme) => {
      if (!namespaceSet.has(theme.namespace)) {
        namespaceSet.add(theme.namespace)
        hash[theme.namespace] = theme.components
      } else {
        hash[theme.namespace].push(...theme.components)
      }
    })

    namespaceSet.forEach((namespace: string) => {
      const components = hash[namespace]
      newThemes.push({
        namespace,
        components: hash[namespace].map((component, index) => {
          return {
            ...component,
            isDefault: !index // [TODO] 默认第一个是默认风格
          }
        })
      })
    })

    const res = await axios.post('/api/theme/publish', {
      userId: appData.user.id,
      fileId: appData.fileId,
      json: {
        ...json.theme,
        themes: newThemes
      },
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
  }, [ctx, operable])

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

  const onLoad = useCallback(() => {
    initThemeGlobal({ designer: designerRef.current, context })
    // setOpenDesignDialog(true)
    // statesRef.current.openDesignDialog = true
  }, [])

  const RenderLocker = useMemo(() => {
    return (
      <Locker
        statusChange={(status) => {
          setOperable(status === 1)
          operableRef.current = status === 1
        }}
        compareVersion={true}
        autoLock={true}
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
        {/* <Toolbar.Button
          disabled={!operable}
          loading={publishLoading}
          onClick={onPublishClick}
        >发布</Toolbar.Button> */}
        <div
          data-mybricks-tip={`{content:'发布',position:'bottom'}`} 
          className={
            classNames({
            [css.publish_btn]: true,
            [css.btn_disable]: !operable
          })
          } 
          onClick={() => {
            if(!operable) return
            //在调试模式，不给点击
            onPublishClick()
          }}>
          {publish_icon}
        </div>
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
        {SPADesigner && <>
            <SPADesigner
              ref={designerRef}
              onLoad={onLoad}
              config={spaDesignerConfig({
                ctx,
                appData, 
                onSaveClick,
                designerRef, 
                context,
                setState: {
                  setOpenDesignDialog(value) {
                    statesRef.current.openDesignDialog = value;
                    setOpenDesignDialog(value);
                  },
                  onOpenDesignDialogChange: (fn) => {
                    fn(statesRef.current.openDesignDialog);
                    statesChangeCallBack.openDesignDialog.add(fn);
                  }
                }
              })}
              onEdit={onEdit}
            />
            <Dialog
              open={openDesignDialog}
              // @ts-ignore
              designer={designerRef.current}
              context={context}
              onClose={() => {
                setOpenDesignDialog(false)
                statesRef.current.openDesignDialog = false;
              }}
            />
          
        </>}
      </div>
    </div>
  )
}

function spaDesignerConfig ({ ctx, appData, onSaveClick, designerRef, context, setState }) {
  const content = appData.fileContent?.content || {}
  const isH5 = content.componentType === 'H5'
  const localComlibs = JSON.parse(localStorage.getItem('MYBRICKS_APP_THEME_COMLIBS'))

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
        user: ctx.user,
        onUpload: async (file: File) => {
          return new Promise(async (resolve, reject) => {
            const { manateeUserInfo, fileId } = ctx;
            let uploadService = ctx.uploadService;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folderPath", `/files/${fileId}`);

            const useConfigService = !!uploadService;

            if (!useConfigService) {
              uploadService = "/paas/api/flow/saveFile";
            }

            try {
              const res = await axios<any, any>({
                url: uploadService,
                method: "post",
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data",
                  ...manateeUserInfo,
                },
              });
              const { data = {} } = res.data;
              const { url } = data;
              if (!url) {
                reject(`没有返回图片地址`);
              }
              const staticUrl = /^http/.test(url)
                ? url
                : `${getDomainFromPath(uploadService)}${url}`;
              resolve({ url: staticUrl });
              reject(`【图片上传出错】: ${message}`);
            } catch (error) {
              message.error(error.message);
              reject(error);
            }
          });
        },
        onAtsEmail: ({ subject, to, body, extra, from }) => {
          let data = { fileId: ctx.fileId, subject, to, body, extra, from };
          const config = appData.config[APP_NAME]?.config;
          const serviceApi = config?.emailApiConfig?.sendAtsEmailApi || "";
          if (serviceApi) {
            axios({
              method: "POST",
              url: serviceApi,
              withCredentials: false,
              data,
              headers: {
                "Content-Type": "application/json",
              },
            }).catch((err) => {
              console.log("err", err);
            });
          }
        },
        onSearchUser: (keyword: string) => {
          return new Promise(async (resolve, reject) => {
            try {
              const res = await searchUser(`api/theme/searchUser`, {
                keyword,
              });
              // @ts-ignore
              const formatRes = (res || []).map((item) => {
                const { email, id, name, avatar } = item;
                return {
                  name: name ? `${name}(${email})` : email,
                  id,
                  username: email,
                  orgDisplayName: "",
                  thumbnailAvatarUrl: avatar,
                };
              });
              resolve(formatRes);
            } catch (e) {
              message.error("搜索用户失败!");
              reject("搜索用户失败!");
            }
          });
        },
      }),
      // toolsPlugin(),
    ],
    // ...(ctx.hasMaterialApp && !localComlibs && !isH5
    //   ? {
    //       comLibAdder: comLibAdder(ctx),
    //     }
    //   : {}),
    // comLibLoader(params) {
    //   if (localComlibs || isH5) {
    //     return new Promise((resolve) => {
    //       if (localComlibs) {
    //         resolve(localComlibs)
    //       } else if (isH5) {
    //         resolve(['public/comlibs/h5.js'])
    //       }
    //     })
    //   }
    comLibAdder: appData.comLibAdder(ctx),
    comLibLoader: appData.comLibLoader({
      comlibs: ctx.comlibs
    }),
    //   return comlibLoader(ctx)(params)
    // },
    // comLibLoader() {
    //   return new Promise((resolve) => {
        
    //     // TODO: 先写死
    //     const localComlibs = JSON.parse(localStorage.getItem('MYBRICKS_APP_THEME_COMLIBS'))
    //     if (localComlibs) {
    //       resolve(localComlibs)
    //     } else if (isH5) {
    //       resolve(['public/comlibs/h5.js'])
    //     } else {
    //       resolve([
    //         'public/comlibs/mybricks.basic-comlib.js',
    //         'public/comlibs/mybricks.normal-pc.js',
    //       ])
    //     }
    //   })
    // },
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
        return myEditors({ editConfig, designerRef, context, setState }, { fileId: appData.fileId })
      },
      items(_, cate0, cate1, cate2) {
        cate0.title = "设计"
        cate0.items = [
          {
            type: "Design"
          },
          // {
          //   type: "ThemeComponent"
          // }
          // {
          //   type: "ComponentStyles"
          // }
        ]


        // cate0.title = '组件'
        // cate0.items = [
        //   {
        //     type: 'ThemeComponent'
        //   },
        // ];
        // cate1.title = "设计规范";
        // cate1.items = [
        //   {
        //     type: 'ThemeGlobal'
        //   },
        // ];

        // cate2.title = "其它";
        // cate2.items = [
        //   {
        //     items: [
        //       {
        //         title: 'iconfont js链接',
        //         type: 'Text',
        //         description: '设置iconfont js链接',
        //         value: {
        //           get() {
        //             return ctx.fontJS
        //           },
        //           set(context, v: string) {
        //             ctx.fontJS = v
        //             createFromIconfontCN({
        //               scriptUrl: v, // 在 iconfont.cn 上生成
        //             })
        //           },
        //         },
        //       },
        //     ],
        //   },
        // ];
      },
      editorOptions: mergeEditorOptions([
        !!ctx.setting?.system.config?.isPureIntranet &&
        PURE_INTERNET_EDITOR_OPTIONS,
        DESIGN_MATERIAL_EDITOR_OPTIONS(ctx),
      ]),
    },
    com: {
      usePreviewImage: true,
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
          // 'public/antd-4.21.6/antd.variable.min.css'
        ],
      },
      toolbarContainer: '#sdk_toolbar_center',
    }
  }
}

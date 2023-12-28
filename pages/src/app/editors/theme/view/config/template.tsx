import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect
} from 'react'

import { message } from 'antd'
import domToImage from 'dom-to-image'
import API from '@mybricks/sdk-for-app/api'
import { getCssVarToValueMap, getStyleInnerText , traverse} from './utils'
import {
  Button,
  Select,
  Toggle,
  PlusOutlined,
  EditOutlined,
  RemoveOutlined,
  ArrorRightOutlined,
  CircleCheckOutlined
} from '../compoments'
import { DesignAll } from './all'
import { useUpdateEffect } from '../hooks'
import { uuid, deepCopy } from '../../../utils'
import { useThemeEditorContext } from '../../index'

import type { Data, Component } from '../type'

import viewStyle from '../view.less'
import configStyle from './index.less'


/**  不同类别，组件可创建的模版最多一个 */
export const maxCompTemplate = 1

export function initTemplateInfo (pageComponents: Array<Component>, templates: Data['templates']) {
  
  
  const namespaceToAllMap = {}
  const namespaceMap = {}
  const themeIdToThemeMap = {}
  const copyTemplates = deepCopy(templates)
  const notInPageNamespaceMap = {}
  
  copyTemplates.forEach(({ namespace }) => {
    if (!namespaceMap[namespace]) {
      namespaceMap[namespace] = true
      notInPageNamespaceMap[namespace] = true
    }
  })

  pageComponents.forEach(({
    id,
    def: {
      title: defTitle,
      namespace
    },
    model: {
      css,
      data
    },
    title,
    dom
  }) => {

    Reflect.deleteProperty(notInPageNamespaceMap, namespace)

    if (!namespaceMap[namespace]) {
      namespaceMap[namespace] = true
      copyTemplates.push({
        namespace,
        components: []
      })
    }

    if (!namespaceToAllMap[namespace]) {
      namespaceToAllMap[namespace] = {
        title: defTitle,
        options: []
      }
    }

    if (css || data) {
      themeIdToThemeMap[id] = {
        id,
        title,
        namespace,
        styleAry: css,
        data
      }
      namespaceToAllMap[namespace].options.push({label: title, value: id, dom})
    }
  })

  const finalThemes = []

  copyTemplates.forEach(({ namespace, components }) => {
    if (!notInPageNamespaceMap[namespace]) {
      const finalComponents = []
      finalThemes.push({
        namespace,
        components: finalComponents
      })
      components.forEach((component) => {
        const theme = themeIdToThemeMap[component.templateId]
        if (theme) {
          finalComponents.push({ ...component, styleAry: theme.styleAry })
        }
      })
    }
  })

  return {
    templates: finalThemes,
    namespaceToAllMap,
    themeIdToThemeMap
  }
}
export function DesignTemplate () {
  const { data, component, popView } = useThemeEditorContext()
  const [themePanlOpen, setThemePanlOpen] = useState(false)
  const [templatePanelFormData, setTemplatePanelFormData] = useState(null)
  const [templates, setTemplates] = useState<Data['templates']>([])
  // const [searchValue, setSearchValue] = useState('')
  const [themeExpandMap, setThemeExpandMap] = useState({})

  const { namespaceToAllMap, themeIdToThemeMap } = useMemo(() => {
    const { templates, ...other } = initTemplateInfo(traverse(component.getAll()).reduce((f, s) => [...f, ...s], []), data.templates || [])
    data.templates = templates

    setTemplates(templates)

    return other
  }, [])

  /** 组件模版可添加状态，下面有多余1条模版，就不可添加; key 为namespace */
  const mapCompTemplateCanAddStatus = useMemo(() => {
      const res = {}
      templates.forEach(temp => {
        if(temp.components.length >= maxCompTemplate) {
          res[temp.namespace] = true
        } else {
          res[temp.namespace] = false
        }
      })
      console.log('templates', res)

      return res
  }, [templates])

  const themeOperate = useCallback(({
    id,
    title,
    templateId,
    namespace,
    previewUrl
  }: {
    id: string
    title?: string
    templateId?: string
    namespace: string
    previewUrl?: string
  }, operate) => {
    const themeIndex = data.templates.findIndex((theme) => theme.namespace === namespace)
    const components = data.templates[themeIndex].components
    switch (operate) {
      case 'add':
        components.push({...themeIdToThemeMap[templateId], title, id: uuid(), templateId, previewUrl, isDefault: components.length ? false : true})
        break
      case 'delete':
        const deleteIndex = components.findIndex((component) => component.id === id)
        const deleteComponent = components[deleteIndex]
        components.splice(deleteIndex, 1)
        if (deleteComponent.isDefault && components.length) {
          components[0].isDefault = true
        }
        break
      case 'edit':
        const editIndex = components.findIndex((component) => component.id === id)
        const editComponent = components[editIndex]
        components.splice(editIndex, 1, {...themeIdToThemeMap[templateId], title, id, templateId, previewUrl, isDefault: editComponent.isDefault})
        break
      case 'default':
        components.forEach((component) => {
          if (component.id === id) {
            component.isDefault = true
          } else {
            component.isDefault = false
          }
        })
      default:
        break
    }

    setTemplates([...data.templates])
  }, [])

  const actionOperate = useCallback((e, formData, type) => {
    e.stopPropagation()
    if (type === 'add') {
      setTemplatePanelFormData(formData)
      setThemePanlOpen(true)
    } else if (type === 'edit') {
      const editId = templatePanelFormData?.id
      const editNamespace = templatePanelFormData?.namespace
      if (editNamespace === formData.namespace && editId === formData.id) {
        onAddThemePanelCancel()
      } else {
        setTemplatePanelFormData(formData)
        setThemePanlOpen(true)
      }
    } else {
      const editId = templatePanelFormData?.id
      const editNamespace = templatePanelFormData?.namespace
      if (editNamespace === formData.namespace && editId === formData.id) {
        onAddThemePanelCancel()
      }
      themeOperate(formData, 'delete')
    }
    
  }, [templatePanelFormData])

  const onAddThemePanelOk = useCallback((value) => {
    themeOperate(value, templatePanelFormData.id ? 'edit' : 'add')
    onAddThemePanelCancel()
  }, [templatePanelFormData])

  const onAddThemePanelCancel = useCallback(() => {
    setThemePanlOpen(false)
    setTemplatePanelFormData(null)
  }, [])

  const onExpandSwitch = useCallback(({ namespace }) => {
    setThemeExpandMap((value) => {
      return {
        ...value,
        [namespace]: !value[namespace]
      }
    })
  }, [])

  useUpdateEffect(() => {
    if (themePanlOpen) {
      const { id, namespace } = templatePanelFormData
      const { title, options } = namespaceToAllMap[namespace]

      popView(`${id ? '编辑' : `新建"${title}"`}模板`, ({ close }) => {
        return (
          <ThemePanel
            onOk={(value) => {
              onAddThemePanelOk(value)
              close()
            }}
            defaultValue={templatePanelFormData}
            options={options}
            themeIdToThemeMap={themeIdToThemeMap}
          />
        )
      }, {width: 320, beforeEditView: true})
    }
  }, [themePanlOpen, templatePanelFormData])

  const configThemeList = useMemo(() => {
    const editId = templatePanelFormData?.id
    const editNamespace = templatePanelFormData?.namespace

    return (
      <div className={configStyle.themeList}>
        {templates.length ? templates.map(({ namespace, components }) => {
          const { title } = namespaceToAllMap[namespace]
          const expand = themeExpandMap[namespace]

          return (
            <div key={namespace}>
              <div className={configStyle.themeItem} onClick={() => onExpandSwitch({ namespace })}>
                <div className={configStyle.left}>
                  <div className={expand ? configStyle.iconExpand : configStyle.icon}>
                    {ArrorRightOutlined}
                  </div>
                  <div className={configStyle.title}>
                    {title}
                  </div>
                </div>
                <div
                  className={`${configStyle.icon}${!editId && namespace === editNamespace ? ` ${configStyle.iconActive}` : ''} ${mapCompTemplateCanAddStatus[namespace] ? ` ${configStyle.iconDisabled}` : ''}`}
                  data-mybricks-tip={`{content:'新建模板',position:'left'}`}
                  onClick={(e) => {
                    if(mapCompTemplateCanAddStatus[namespace] === true) {
                      e.stopPropagation()
                      return
                    }
                    actionOperate(e, { namespace }, 'add')
                  }}
                >
                  {PlusOutlined}
                </div>
              </div>

              <div className={`${configStyle.itemPanel}${expand ? ` ${configStyle.itemPanelOpen}` : ''}`}>
                {components.length ? components.map(({
                  id,
                  title,
                  templateId,
                  isDefault,
                  namespace
                }) => {
                  return (
                    <div key={id} className={`${configStyle.item}${editId ? (editId === id ? ` ${configStyle.itemActive}` : ``) : ''}`}>
                      <div className={configStyle.left}>
                        <div className={configStyle.name}>
                          <span data-mybricks-tip={title}>{title}</span>
                        </div>
                      </div>
                      <div className={configStyle.right}>
                        {/* 确定下，是否有默认模版的逻辑 ；对比主题中默认主题的作用；
                            无需默认模版
                         */}
                        {/* <div
                          data-mybricks-tip={isDefault ? '默认模板' : '设置为默认模板'}
                          className={`${configStyle.action}${isDefault ? ` ${configStyle.actionIsDefault}` : ''}`}
                          onClick={() => themeOperate({namespace, id}, 'default')}
                        >
                          {CircleCheckOutlined}
                        </div> */}
                        <div
                          data-mybricks-tip='编辑'
                          className={`${configStyle.action} ${configStyle.actionEdit}`}
                          onClick={(e) => actionOperate(e, { id, title, templateId, namespace }, 'edit')}
                        >
                          {EditOutlined}
                        </div>
                        <div
                          data-mybricks-tip='删除'
                          className={configStyle.action}
                          onClick={(e) => actionOperate(e, { id, namespace }, 'delete')}
                        >
                          {RemoveOutlined}
                        </div>
                      </div>
                    </div>
                  )
                }) : (
                  <div className={configStyle.empty}>
                    无定制模板，请添加
                  </div>
                )}
              </div>
            </div>
          )
        }) : (
          <div className={configStyle.empty}>
            请在画布中添加组件
          </div>
        )}
      </div>
    )
  }, [templates, templatePanelFormData, themeExpandMap])

  return (
    <>
      {configThemeList}
    </>
  )
}

function ThemePanel ({
  onOk,
  options,
  defaultValue,
  themeIdToThemeMap
}: any) {
  const idRef = useRef<HTMLDivElement>()
  const titleRef = useRef<HTMLDivElement>()
  const [formData] = useState({ ...defaultValue })
  const [saveLoading, setSaveLoading] = useState(false)

  const validate = useCallback(() => {
    const title = formData.title?.trim()
    const templateId = formData.templateId
    let result: any = {
      id: formData.id,
      namespace: formData.namespace,
      templateId,
      title
    }
    if (!title) {
      result = false
      titleRef.current.classList.add(configStyle.error)
    }
    if (!templateId) {
      result = false
      idRef.current.classList.add(configStyle.error)
    }

    return result
  }, [])

  const onSaveClick = useCallback(async () => {
    if (saveLoading) {
      return
    }
    const result = validate()
    if (result) {
      const messageKey = 'upload' + uuid()
      message.loading({ content: '预览图生成中...', key: messageKey });
      setSaveLoading(true)
      const { templateId } = result
      const option = options.find((option) => option.value === templateId)
      const dom = option.dom
      const copyDom = dom.cloneNode(true)

      copyDom.style.top = '0px'
      copyDom.style.left = '0px'
      copyDom.style.right = '0px'
      copyDom.style.bottom = '0px'
      copyDom.style.position = 'relative'
      copyDom.style.width = dom.offsetWidth
      copyDom.style.height = dom.offsetHeight
      copyDom.style.zIndex = '-1'

      const domParent = dom.parentElement
      domParent.appendChild(copyDom)

      domToImage.toSvg(copyDom, {
        filter: (dom) => {
          const className = dom.className
          if (typeof className === 'string' && className.startsWith('append-')) {
            return false
          }
          return true
        }
      })
        .then((dataUrl) => {
          const { id, styleAry } = themeIdToThemeMap[option.value]
          let innerText = '';

          // 这里需要将变量转换为具体的值设置，否则生成svg后样式丢失，变量没必要写入svg
          const cssVarToValueMap = getCssVarToValueMap()

          styleAry.forEach(({css, selector, global}) => {
            if (selector === ':root') {
              selector = '> *:first-child'
            }
            if (Array.isArray(selector)) {
              selector.forEach((selector) => {
                innerText = innerText + getStyleInnerText({id, css, selector, global, cssVarToValueMap})
              })
            } else {
              innerText = innerText + getStyleInnerText({id, css, selector, global, cssVarToValueMap})
            }
          })

          API.Upload.toOss({
            content: dataUrl.replace('data:image/svg+xml;charset=utf-8,', '').replace(`<foreignObject`, `<style>${innerText}</style><foreignObject`),
            folderPath: '/theme_pack_app',
            fileName: `${uuid()}_${templateId}.svg`
          }).then((value: any) => {
            result.previewUrl = value.url
            // function copyText(txt: string): boolean {
            //   const input = document.createElement('input')
            //   document.body.appendChild(input)
            //   input.value = txt
            //   input.select()
            //   document.execCommand('copy')
            //   document.body.removeChild(input)
            //   return true
            // }
            // copyText(value.url)
            message.destroy(messageKey)
            setSaveLoading(false)
            onOk(result)
          }).catch((error) => {
            console.error('预览图上传失败: ', error)
            setSaveLoading(false)
            onOk(result)
          })
        })
        .catch((error) => {
          console.error('截图失败: ', error)
          setSaveLoading(false)
          onOk(result)
        })
        .finally(() => {
          domParent.removeChild(copyDom)
        })
    }
  }, [saveLoading])

  const onTitleInputChange = useCallback((e) => {
    const value = e.target.value.trim()
    formData.title = value
    if (!value.length) {
      titleRef.current.classList.add(configStyle.error)
    } else {
      titleRef.current.classList.remove(configStyle.error)
    }
  }, [])

  const onSelectChange = useCallback((value) => {
    formData.templateId = value
    idRef.current.classList.remove(configStyle.error)
  }, [])

  return (
    <div className={configStyle.popView}>
      <div className={configStyle.toolbar}>
        <Button type='primary' onClick={onSaveClick}>保存</Button>
      </div>
      <div className={configStyle.form}>
        <div className={configStyle.formItem}>
          <label>
            <i>*</i>名称
          </label>
          <div
            ref={titleRef}
            className={`${configStyle.editor} ${configStyle.textEdt}`}
            data-err={'请输入模板名称'}
          >
            <input
              type={'text'}
              placeholder={'请输入模板名称'}
              defaultValue={formData.title}
              onChange={onTitleInputChange}
            />
          </div>
        </div>
        <div className={configStyle.formItem}>
          <label>
            <i>*</i>配置
          </label>
          <div
            ref={idRef}
            className={`${configStyle.editor} ${configStyle.textEdt}`}
            data-err={'请选择模板配置'}
          >
            <Select
              defaultValue={formData.templateId}
              placeholder='请选择模板'
              options={options}
              onChange={onSelectChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
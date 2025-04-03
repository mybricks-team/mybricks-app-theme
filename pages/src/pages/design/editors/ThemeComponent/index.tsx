import React, { useRef, useMemo, useState, useContext, useCallback } from "react";
import { message } from "antd";
import domToImage from 'dom-to-image'
import API from '@mybricks/sdk-for-app/api'
import { EditorContext } from "..";
import { deepCopy, uuid } from "../utils";
import { useUpdateEffect } from "../hooks";
import type { ThemeData, Component } from "../type";
import {
  ArrorRightOutlined,
  PlusOutlined,
  CircleCheckOutlined,
  EditOutlined,
  RemoveOutlined,
  Button,
  Select,
} from "../compoments";
import css from "./index.less";

const ThemeComponent = () => {
  const { designer, editConfig, context } = useContext(EditorContext);
  const { data, component, popView } = useMemo(() => {
    const { themes, components } = designer
    const { popView } = editConfig

    return {
      get data() {
        return context.theme
      },
      themes,
      component: {
        getAll: components.getAll
      },
      popView
    }
  }, [])
  const [themePanlOpen, setThemePanlOpen] = useState(false)
  const [themePanelFormData, setThemePanelFormData] = useState(null)
  const [themes, setThemes] = useState<ThemeData['themes']>([])
  // const [searchValue, setSearchValue] = useState('')
  const [themeExpandMap, setThemeExpandMap] = useState({})

  const { namespaceToAllMap, themeIdToThemeMap } = useMemo(() => {
    const { themes, ...other } = initThemeInfo(traverse(component.getAll()).reduce((f, s) => [...f, ...s], []), data.themes)
    data.themes = themes
    setThemes(themes)

    return other
  }, [])

  const themeOperate = useCallback(({
    id,
    title,
    themeId,
    namespace,
    previewUrl
  }: {
    id: string
    title?: string
    themeId?: string
    namespace: string
    previewUrl?: string
  }, operate) => {
    const themeIndex = data.themes.findIndex((theme) => theme.namespace === namespace)
    const components = data.themes[themeIndex].components
    switch (operate) {
      case 'add':
        components.push({...themeIdToThemeMap[themeId], title, id: uuid(), themeId, previewUrl, isDefault: components.length ? false : true})
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
        components.splice(editIndex, 1, {...themeIdToThemeMap[themeId], title, id, themeId, previewUrl, isDefault: editComponent.isDefault})
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

    setThemes([...data.themes])
  }, [])

  const actionOperate = useCallback((e, formData, type) => {
    e.stopPropagation()
    if (type === 'add') {
      setThemePanelFormData(formData)
      setThemePanlOpen(true)
    } else if (type === 'edit') {
      const editId = themePanelFormData?.id
      const editNamespace = themePanelFormData?.namespace
      if (editNamespace === formData.namespace && editId === formData.id) {
        onAddThemePanelCancel()
      } else {
        setThemePanelFormData(formData)
        setThemePanlOpen(true)
      }
    } else {
      const editId = themePanelFormData?.id
      const editNamespace = themePanelFormData?.namespace
      if (editNamespace === formData.namespace && editId === formData.id) {
        onAddThemePanelCancel()
      }
      themeOperate(formData, 'delete')
    }
    
  }, [themePanelFormData])

  const onAddThemePanelOk = useCallback((value) => {
    themeOperate(value, themePanelFormData.id ? 'edit' : 'add')
    onAddThemePanelCancel()
  }, [themePanelFormData])

  const onAddThemePanelCancel = useCallback(() => {
    setThemePanlOpen(false)
    setThemePanelFormData(null)
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
      const { id, namespace } = themePanelFormData
      const namespaceToAllMap = getNamespaceToAllMap(traverse(component.getAll()).reduce((f, s) => [...f, ...s], []));
      const { title, options } = namespaceToAllMap[namespace]

      popView(`${id ? '编辑' : `新建"${title}"`}组件规范`, ({ close }) => {
        return (
          <ThemePanel
            onOk={(value) => {
              onAddThemePanelOk(value)
              close()
            }}
            defaultValue={themePanelFormData}
            options={options}
            themeIdToThemeMap={themeIdToThemeMap}
          />
        )
      }, {width: 320, beforeEditView: true, onClose: onAddThemePanelCancel})
    }
  }, [themePanlOpen, themePanelFormData])

  const configThemeList = useMemo(() => {
    const editId = themePanelFormData?.id
    const editNamespace = themePanelFormData?.namespace

    return (
      <div className={css.themeList}>
        {themes.length ? themes.map(({ namespace, components }) => {
          const { title } = namespaceToAllMap[namespace]
          const expand = themeExpandMap[namespace]

          return (
            <div key={namespace}>
              <div className={css.themeItem} onClick={() => onExpandSwitch({ namespace })}>
                <div className={css.left}>
                  <div className={expand ? css.iconExpand : css.icon}>
                    {ArrorRightOutlined}
                  </div>
                  <div className={css.title}>
                    {title}
                  </div>
                </div>
                <div
                  className={`${css.icon}${!editId && namespace === editNamespace ? ` ${css.iconActive}` : ''}`}
                  data-mybricks-tip={`{content:'新建组件规范',position:'left'}`}
                  onClick={(e) => actionOperate(e, { namespace }, 'add')}
                >
                  {PlusOutlined}
                </div>
              </div>

              <div className={`${css.itemPanel}${expand ? ` ${css.itemPanelOpen}` : ''}`}>
                {components.length ? components.map(({
                  id,
                  title,
                  themeId,
                  isDefault,
                  namespace
                }) => {
                  return (
                    <div key={id} className={`${css.item}${editId ? (editId === id ? ` ${css.itemActive}` : ``) : ''}`}>
                      <div className={css.left}>
                        <div className={css.name}>
                          <span data-mybricks-tip={title}>{title}</span>
                        </div>
                      </div>
                      <div className={css.right}>
                        <div
                          data-mybricks-tip={isDefault ? '默认组件规范' : '设置为默认组件规范'}
                          className={`${css.action}${isDefault ? ` ${css.actionIsDefault}` : ''}`}
                          onClick={() => themeOperate({namespace, id}, 'default')}
                        >
                          {CircleCheckOutlined}
                        </div>
                        <div
                          data-mybricks-tip='编辑'
                          className={`${css.action} ${css.actionEdit}`}
                          onClick={(e) => actionOperate(e, { id, title, themeId, namespace }, 'edit')}
                        >
                          {EditOutlined}
                        </div>
                        <div
                          data-mybricks-tip='删除'
                          className={css.action}
                          onClick={(e) => actionOperate(e, { id, namespace }, 'delete')}
                        >
                          {RemoveOutlined}
                        </div>
                      </div>
                    </div>
                  )
                }) : (
                  <div className={css.empty}>
                    无定制组件，请添加
                  </div>
                )}
              </div>
            </div>
          )
        }) : (
          <div className={css.empty}>
            请在画布中添加组件
          </div>
        )}
      </div>
    )
  }, [themes, themePanelFormData, themeExpandMap])

  return configThemeList
}

export default ThemeComponent;

const getNamespaceToAllMap = (pageComponents: Array<Component>) => {
  const namespaceToAllMap = {}
  const namespaceMap = {}
  const notInPageNamespaceMap = {}

  pageComponents.forEach(({
    id,
    def: {
      title: defTitle,
      namespace
    },
    model: {
      css, 
    },
    title,
    dom
  }) => {

    Reflect.deleteProperty(notInPageNamespaceMap, namespace)

    if (!namespaceMap[namespace]) {
      namespaceMap[namespace] = true
    }

    if (!namespaceToAllMap[namespace]) {
      namespaceToAllMap[namespace] = {
        title: defTitle,
        options: []
      }
    }

    if (css) {
      namespaceToAllMap[namespace].options.push({label: title, value: id, dom})
    }
  })

  return namespaceToAllMap;
}

export function initThemeInfo (pageComponents: Array<Component>, themes: ThemeData['themes']) {
  const namespaceToAllMap = {}
  const namespaceMap = {}
  const themeIdToThemeMap = {}
  const copyTemplates = deepCopy(themes)
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

    if (css) {
      themeIdToThemeMap[id] = {
        id,
        title,
        namespace,
        styleAry: css,
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
        const theme = themeIdToThemeMap[component.themeId]
        if (theme) {
          finalComponents.push({ ...component, styleAry: theme.styleAry })
        }
      })
    }
  })

  return {
    themes: finalThemes,
    namespaceToAllMap,
    themeIdToThemeMap
  }
}

function traverse (slots) {
  return slots.map(({ comAry }) => {
    if (Array.isArray(comAry)) {
      return comAry.map((com) => {
        const { slots } = com
        if (Array.isArray(slots)) {
          return [com, ...traverse(slots).reduce((f, s) => [...f, ...s], [])]
        }
        return [com]
      })
    }

    return []
  }).reduce((f, s) => [...f, ...s], [])
}

function ThemePanel ({
  onOk,
  options,
  defaultValue,
  themeIdToThemeMap
}: any) {
  const idRef = useRef<HTMLDivElement>()
  const titleRef = useRef<HTMLDivElement>()
  const [formData, setFormData] = useState({ ...defaultValue })
  const [saveLoading, setSaveLoading] = useState(false)
  const optionValueMap = useMemo(() => {
    return options.reduce((pre, cur) => {
      pre[cur.value] = cur
      return pre
    }, {})
  }, [])

  function validate () {
    const title = formData.title?.trim()
    const themeId = formData.themeId
    let result: any = {
      id: formData.id,
      namespace: formData.namespace,
      themeId,
      title
    }
    if (!title) {
      result = false
      titleRef.current.classList.add(css.error)
    }
    if (!themeId) {
      result = false
      idRef.current.classList.add(css.error)
    }

    return result
  }

  async function onSaveClick() {
    if (saveLoading) {
      return
    }
    const result = validate()
    if (result) {
      const messageKey = 'upload' + uuid()
      message.loading({ content: '预览图生成中...', key: messageKey });
      setSaveLoading(true)
      const { themeId } = result
      const option = options.find((option) => option.value === themeId)
      const dom = option.dom

      if (!dom) {
        onOk(result)
        return
      }

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

          styleAry?.forEach(({css, selector, global}) => {
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
            fileName: `${uuid()}_${themeId}.svg`
          }).then((value: any) => {
            result.previewUrl = value.url
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
  }

  function onTitleInputChange (e) {
    const value = e.target.value.trim()
    setFormData({
      ...formData,
      title: value,
    })
    if (!value.length) {
      titleRef.current.classList.add(css.error)
    } else {
      titleRef.current.classList.remove(css.error)
    }
  }

  function onSelectChange (value) {
    setFormData((formData) => {
      return {
        ...formData,
        themeId: value,
        title: formData.title || optionValueMap[value].label
      }
    })
    idRef.current.classList.remove(css.error)
  }

  return (
    <div className={css.popView}>
      <div className={css.toolbar}>
        <Button type='primary' onClick={onSaveClick}>保存</Button>
      </div>
      <div className={css.form}>
        <div className={css.formItem}>
          <label>
            <i>*</i>名称
          </label>
          <div
            ref={titleRef}
            className={`${css.editor} ${css.textEdt}`}
            data-err={'请输入组件名称'}
          >
            <input
              type={'text'}
              placeholder={'请输入组件名称'}
              value={formData.title}
              onChange={onTitleInputChange}
            />
          </div>
        </div>
        <div className={css.formItem}>
          <label>
            <i>*</i>组件
          </label>
          <div
            ref={idRef}
            className={`${css.editor} ${css.textEdt}`}
            data-err={'请选择组件'}
          >
            <Select
              defaultValue={formData.themeId}
              placeholder='请选择组件'
              options={options}
              onChange={onSelectChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function getStyleInnerText ({id, css, selector, global, cssVarToValueMap}) {
  return `
    ${global ? '' : `.${id} `}${selector.replace(/\{id\}/g, `${id}`)} {
      ${Object.keys(css).map(key => {
        let value = css[key]
        if (typeof value === 'string' && value.startsWith('var')) {
          const varValue = cssVarToValueMap[value]
          if (varValue) {
            value = varValue
          }
        }
        return `${convertCamelToHyphen(key)}: ${value}${/!important/.test(value) ? '' : '!important'};`
      }).join('\n')}
    }
  `
}

function convertCamelToHyphen(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function getCssVarToValueMap () {
  const result = {}
  window['MYBRICKS_CSS_VARIABLE_LIST'].forEach(({options}) => {
    options.forEach(({value, resetValue}) => {
      result[value] = resetValue
    })
  })
  return result
}

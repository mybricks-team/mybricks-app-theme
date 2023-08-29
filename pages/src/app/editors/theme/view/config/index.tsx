import React, {
  useRef,
  useMemo,
  useState,
  useCallback
} from 'react'
import { createPortal } from 'react-dom'
import type { MutableRefObject } from 'react'

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
import { uuid, deepCopy } from '../../../utils'

import type { Data, Component, RenderProps } from '../type'

import viewStyle from '../view.less'
import configStyle from './index.less'

interface ConfigViewProps extends RenderProps {
  data: Data
  popView: any // TODO
}

const TOGGLE_OPTIONS = [
  { label: '全局样式', value: 'all' },
  { label: '组件定制', value: 'component'}
]

export const ConfigView = (props: ConfigViewProps) => {
  const viewRef = useRef<HTMLDivElement>()
  const [mode, setMode] = useState('all')

  useMemo(() => {
    console.log('主题插件: ', props.data)
  }, [])

  const design = useMemo(() => {
    let JSX

    if (mode === 'all') {
      JSX = DesignAll
    } else {
      JSX = DesignComponent
    }

    return <JSX {...props} viewRef={viewRef}/>
  }, [mode])

  return (
    <div className={viewStyle.view} ref={viewRef}>
      {/* <div className={viewStyle.header}>
        主题包配置
      </div> */}
      <Toggle
        defaultValue={mode}
        options={TOGGLE_OPTIONS}
        onChange={setMode}
      />
      {design}
    </div>
  )
}

interface DesignProps extends ConfigViewProps {
  viewRef: MutableRefObject<HTMLDivElement>
}

function initThemeInfo (pageComponents: Array<Component>, themes: Data['themes']) {
  const namespaceToAllMap = {}
  const namespaceMap = {}
  const themeIdToThemeMap = {}
  const finalThemes = deepCopy(themes)
  const notInPageNamespaceMap = {}
  
  finalThemes.forEach(({namespace}) => {
    if (!namespaceMap[namespace]) {
      namespaceMap[namespace] = true
      notInPageNamespaceMap[namespace] = true
    }
  })

  function traverse (components: Array<Component>) {
    if (Array.isArray(components)) {
      components.forEach(({
        id,
        def: {
          title: defTitle,
          namespace
        },
        model: {
          css
        },
        slots,
        title
      }) => {

        Reflect.deleteProperty(notInPageNamespaceMap, namespace)

        if (!namespaceMap[namespace]) {
          namespaceMap[namespace] = true
          finalThemes.push({
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
            styleAry: css
          }
          namespaceToAllMap[namespace].options.push({label: title, value: id})
        }

        if (Array.isArray(slots)) {
          slots.forEach((slot) => {
            traverse(slot.comAry)
          })
        }
      })
    }
  }

  traverse(pageComponents)

  /**
   * TODO: 
   * 1. 删除了所有某一类组件
   * 2. 删除了某一定制组件
   */
  Object.keys(notInPageNamespaceMap).forEach((key) => {
    const index = finalThemes.findIndex(({ namespace }) => namespace === key)
    if (index !== -1) {
      finalThemes.splice(index, 1)
    }
  })

  return {
    themes: finalThemes,
    namespaceToAllMap,
    themeIdToThemeMap
  }
}

function DesignComponent ({ data, viewRef, component }: DesignProps) {
  const [themePanlOpen, setThemePanlOpen] = useState(false)
  const [themePanelFormData, setThemePanelFormData] = useState(null)
  const [themes, setThemes] = useState<Data['themes']>([])
  // const [searchValue, setSearchValue] = useState('')
  const [themeExpandMap, setThemeExpandMap] = useState({})

  const { namespaceToAllMap, themeIdToThemeMap } = useMemo(() => {
    const { themes, ...other } = initThemeInfo(component.getAll().map((slot) => slot.comAry).reduce((f, s) => [...f, ...s]), data.themes)
    
    data.themes = themes
    setThemes(themes)

    return other
  }, [])

  const themeOperate = useCallback(({
    id,
    title,
    themeId,
    namespace
  }: {
    id: string
    title?: string
    themeId?: string
    namespace: string
  }, operate) => {
    const themeIndex = data.themes.findIndex((theme) => theme.namespace === namespace)
    const components = data.themes[themeIndex].components
    switch (operate) {
      case 'add':
        components.push({...themeIdToThemeMap[themeId], title, id: uuid(), themeId, isDefault: components.length ? false : true})
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
        components.splice(editIndex, 1, {...themeIdToThemeMap[themeId], title, id, themeId, isDefault: editComponent.isDefault})
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

    // TODO: 查询功能
    // if (!searchValue) {
    //   setThemes([...data.themes])
    // } else {
    //   setThemes(() => {
    //     return data.themes.filter((theme) => theme.title.indexOf(searchValue) !== -1)
    //   })
    // }
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

  // const onSearchValueChange = useCallback((e) => {
  //   setSearchValue(e.target.value)
  //   const value = e.target.value.trim()
  //   console.log(value, 'value')
  //   console.log(data.themes, 'data.themes')
  //   if (!value) {
  //     setThemes(data.themes)
  //   } else {
  //     const finalThemes = []
  //     const themeExpandMap = {}
  //     data.themes.filter(({ namespace, components }) => {
  //       const theme = { namespace, components: []}
  //       const { title } = namespaceToAllMap[namespace]
  //       if (components.length) {
  //         const filterComponents = components.filter(({ title }) => title.indexOf(value) !== -1)
  //         if (filterComponents.length) {
  //           theme.components = filterComponents
  //         }
  //       }
        
  //     })
  //   }
  // }, [])

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

  const themePanel = useMemo(() => {
    if (themePanlOpen) {
      const { id, namespace } = themePanelFormData
      const { title, options } = namespaceToAllMap[namespace]
      const container = document.querySelector('div[class^="lyStage-"]')

      return (
        <div key={id + namespace}>
          <ThemePanel
            title={`${id ? '编辑' : `新建"${title}"`}主题`}
            onOk={onAddThemePanelOk}
            defaultValue={themePanelFormData}
            onCancel={onAddThemePanelCancel}
            style={{ right: 0 }}
            container={container}
            options={options}
          />
        </div>
      )
    }

    return null
  }, [themePanlOpen, themePanelFormData])

  const configThemeList = useMemo(() => {
    const editId = themePanelFormData?.id
    const editNamespace = themePanelFormData?.namespace

    return (
      <div className={configStyle.themeList}>
        {themes.length ? themes.map(({ namespace, components }) => {
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
                  className={`${configStyle.icon}${!editId && namespace === editNamespace ? ` ${configStyle.iconActive}` : ''}`}
                  data-mybricks-tip={`{content:'新建主题',position:'left'}`}
                  onClick={(e) => actionOperate(e, { namespace }, 'add')}
                >
                  {PlusOutlined}
                </div>
              </div>

              <div className={`${configStyle.itemPanel}${expand ? ` ${configStyle.itemPanelOpen}` : ''}`}>
                {components.length ? components.map(({
                  id,
                  title,
                  themeId,
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
                        <div
                          data-mybricks-tip={isDefault ? '默认主题' : '设置为默认主题'}
                          className={`${configStyle.action}${isDefault ? ` ${configStyle.actionIsDefault}` : ''}`}
                          onClick={() => themeOperate({namespace, id}, 'default')}
                        >
                          {CircleCheckOutlined}
                        </div>
                        <div
                          data-mybricks-tip='编辑'
                          className={`${configStyle.action} ${configStyle.actionEdit}`}
                          onClick={(e) => actionOperate(e, { id, title, themeId, namespace }, 'edit')}
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
                    无定制组件，请添加
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
  }, [themes, themePanelFormData, themeExpandMap])

  return (
    <>
      {/* <div className={configStyle.toolbar}>
        <div className={configStyle.search}>
          <input
            type={'text'}
            placeholder={'请输入名称搜索主题'}
            onChange={onSearchValueChange}
          />
        </div>
      </div> */}
      {configThemeList}
      {themePanel}
    </>
  )
}

function ThemePanel ({
  title,
  onOk,
  onCancel,
  style,
  options,
  defaultValue,
  container
}: any) {
  const idRef = useRef<HTMLDivElement>()
  const titleRef = useRef<HTMLDivElement>()
  const [formData] = useState({ ...defaultValue })

  const validate = useCallback(() => {
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
      titleRef.current.classList.add(configStyle.error)
    }
    if (!themeId) {
      result = false
      idRef.current.classList.add(configStyle.error)
    }

    return result
  }, [])

  const onSaveClick = useCallback(() => {
    const result = validate()
    if (result) {
      onOk(result)
    }
  }, [])

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
    formData.themeId = value
    idRef.current.classList.remove(configStyle.error)
  }, [])

  return createPortal(
    <div className={configStyle.themePanel} style={style} key={formData}>
      <div className={`${viewStyle.header} ${configStyle.header}`}>
        <div>
          {title}
        </div>
        <div>
          <Button onClick={onCancel}>关闭</Button>
          <Button type='primary' onClick={onSaveClick}>保存</Button>
        </div>
      </div>
      <div className={configStyle.form}>
        <div className={configStyle.formItem}>
          <label>
            <i>*</i>名称
          </label>
          <div
            ref={titleRef}
            className={`${configStyle.editor} ${configStyle.textEdt}`}
            data-err={'请输入主题名称'}
          >
            <input
              type={'text'}
              placeholder={'请输入主题名称'}
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
            data-err={'请选择主题配置'}
          >
            <Select
              defaultValue={formData.themeId}
              placeholder='请选择主题'
              options={options}
              onChange={onSelectChange}
            />
          </div>
        </div>
      </div>
    </div>,
    // document.body
    container
  )
}

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback
} from 'react'
import { createPortal } from 'react-dom'

import {
  Button,
  Select,
  PlusOutlined,
  EditOutlined,
  RemoveOutlined
} from '../compoments'

import type { FC } from 'react'
import type { Data, Component, RenderProps } from '../type'

import viewStyle from '../view.less'
import configStyle from './index.less'

interface ConfigViewProps extends RenderProps {
  data: Data
}

function initThemeInfo (pageComponents: Array<Component>, data: Data) {
  const themeOptions = []
  const themeIdToThemeMap = {}

  function traverse (components: Array<Component>) {
    if (Array.isArray(components)) {
      components.forEach(({
        id,
        def,
        title,
        model,
        slots
      }) => {
        const { css } = model
  
        if (css) {
          themeOptions.push({label: title, value: id})
          themeIdToThemeMap[id] = {
            id,
            title,
            namespace: def.namespace,
            styleAry: css
          }
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

  const configThemesMap = {}

  data.themes.forEach((theme) => {
    configThemesMap[theme.id] = true
  })

  return {
    themeOptions,
    configThemesMap,
    themeIdToThemeMap
  }
}

export const ConfigView: FC = ({ data, component }: ConfigViewProps) => {
  const viewRef = useRef<HTMLDivElement>()
  const [addThemePanlOpen, setAddThemePanlOpen] = useState(false)
  const [themePanelFormData, setThemePanelFormData] = useState(null)
  const [themes, setThemes] = useState(data.themes)
  const [searchValue, setSearchValue] = useState('')

  const { themeOptions, configThemesMap, themeIdToThemeMap } = useMemo(() => {
    return initThemeInfo(component.getAll().comAry, data)
  }, [])

  const themeOperate = useCallback(({ id, title }, operate) => {
    switch (operate) {
      case 'add':
        if (!configThemesMap[id]) {
          configThemesMap[id] = true
          data.themes.push({...themeIdToThemeMap[id], title})
        }
        break
      case 'delete':
        configThemesMap[id] = false
        const index = data.themes.findIndex((theme) => theme.id === id)
        if (index !== -1) {
          data.themes.splice(index, 1)
        }
        break
      case 'edit':
        if (!configThemesMap[id]) {
          configThemesMap[id] = true
          const editIndex = data.themes.findIndex((theme) => theme.id === themePanelFormData.id)
          if (editIndex !== -1) {
            data.themes.splice(editIndex, 1, {...themeIdToThemeMap[id], title})
          }
        }
        break
      default:
        break
    }

    if (!searchValue) {
      setThemes([...data.themes])
    } else {
      setThemes(() => {
        return data.themes.filter((theme) => theme.title.indexOf(searchValue) !== -1)
      })
    }
  }, [searchValue, themePanelFormData])

  const onSearchValueChange = useCallback((e) => {
    setSearchValue(e.target.value)
    const value = e.target.value.trim()
    if (!value) {
      setThemes(data.themes)
    } else {
      setThemes(() => {
        return data.themes.filter((theme) => theme.title.indexOf(value) !== -1)
      })
    }
  }, [])

  const onPlusClick = useCallback(() => {
    setThemePanelFormData(null)
    setAddThemePanlOpen(true)
  }, [])

  const onAddThemePanelOk = useCallback((value) => {
    themeOperate(value, themePanelFormData ? 'edit' : 'add')
    onAddThemePanelCancel()
  }, [searchValue, themePanelFormData])

  const onAddThemePanelCancel = useCallback(() => {
    setAddThemePanlOpen(false)
    setThemePanelFormData(null)
  }, [])

  const addThemePanel = useMemo(() => {
    if (addThemePanlOpen) {
      const { top, right } = viewRef.current!.getBoundingClientRect()
      return (
        <AddThemePanel
          title='新建主题'
          onOk={onAddThemePanelOk}
          onCancel={onAddThemePanelCancel}
          style={{ top, left: right + 1 }}
          options={themeOptions.filter((themeOption) => !configThemesMap[themeOption.value])}
        />
      )
    }

    return null
  }, [addThemePanlOpen])

  const editThemePanel = useMemo(() => {
    if (themePanelFormData) {
      const { top, right } = viewRef.current!.getBoundingClientRect()
      return (
        <AddThemePanel
          title='编辑主题'
          onOk={onAddThemePanelOk}
          onCancel={onAddThemePanelCancel}
          defaultValue={themePanelFormData}
          style={{ top, left: right + 1 }}
          options={themeOptions.filter((themeOption) => !configThemesMap[themeOption.value] || themePanelFormData?.id === themeOption.value)}
        />
      )
    }

    return null
  }, [themePanelFormData])

  const configThemeList = useMemo(() => {
    const editId = themePanelFormData?.id
    return (
      <div className={configStyle.themeList}>
        {themes.map((theme) => {
          const { id, title } = theme
          return (
            <div className={`${configStyle.item}${editId ? (editId === id ? ` ${configStyle.active}` : ` ${configStyle.disabled}`) : ''}`}>
              <div>
                <div className={configStyle.left}>
                  <div className={configStyle.name}>
                    <span data-mybricks-tip={title}>{title}</span>
                  </div>
                </div>
                <div className={configStyle.right}>
                  <div
                    data-mybricks-tip='编辑'
                    className={configStyle.action}
                    onClick={() => {
                      setThemePanelFormData({id, title})
                    }}
                  >
                    {EditOutlined}
                  </div>
                  <div
                    data-mybricks-tip='删除'
                    className={configStyle.action}
                    onClick={() => themeOperate(theme, 'delete')}
                  >
                    {RemoveOutlined}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }, [themes, themePanelFormData])

  return (
    <div className={viewStyle.view} ref={viewRef}>
      <div className={viewStyle.header}>
        主题包配置
      </div>
      <div className={configStyle.toolbar}>
        <div className={configStyle.search}>
          <input
            type={'text'}
            placeholder={'请输入名称搜索主题'}
            onChange={onSearchValueChange}
          />
          <div className={configStyle.icon} data-mybricks-tip='新建主题' onClick={onPlusClick}>
            <PlusOutlined />
          </div>
        </div>
      </div>
      {configThemeList}
      {addThemePanel}
      {editThemePanel}
    </div>
  )
}

function AddThemePanel ({
  title,
  onOk,
  onCancel,
  style,
  options,
  defaultValue
}: any) {
  const idRef = useRef<HTMLDivElement>()
  const titleRef = useRef<HTMLDivElement>()
  const [formData] = useState(defaultValue ? { ...defaultValue } : { title: '', id: '' })

  const validate = useCallback(() => {
    const title = formData.title.trim()
    const id = formData.id
    let result: any = {
      id,
      title
    }
    if (!title) {
      result = false
      titleRef.current.classList.add(configStyle.error)
    }
    if (!id) {
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
    formData.id = value
    idRef.current.classList.remove(configStyle.error)
  }, [])

  return createPortal(
    <div className={configStyle.panel} style={style}>
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
              defaultValue={formData.id}
              placeholder='请选择主题'
              options={options}
              onChange={onSelectChange}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

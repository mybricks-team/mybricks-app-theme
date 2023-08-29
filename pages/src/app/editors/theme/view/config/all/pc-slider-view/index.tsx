import React, { useRef, useMemo, useCallback, useState } from 'react'
import { createPortal, render } from 'react-dom'

import { Collapse } from 'antd'

import Picker from '../components/color-picker'
import PickerEditor from '../components/color-picker/picker'
import { generateColors, hsla2rgba } from '../utils/color'
import { Button, PlusOutlined } from '../../../compoments'
import { uuid } from '../../../../../utils'
import { MYBRICKS_VARIABLE_CSS_CONFIG, SET_MYBRICKS_CSS_VARIABLE_LIST } from '../../../../index'

import type { Theme } from '../types'

import css from './style.less'

const { Panel } = Collapse

export default function ({ data, theme, viewRef, popView }: { data: any, theme: Theme, viewRef: any, popView: any }) {
  return (
    <div className={css.container}>
      <VariableConfiguration
        viewRef={viewRef}
        variables={MYBRICKS_VARIABLE_CSS_CONFIG}
        data={data}
        theme={theme}
        root={true}
        popView={popView}
      />
    </div>
  )
}

function VariableConfiguration ({
  variables,
  data,
  theme,
  root = false,
  viewRef,
  popView
}) {
  // const onResetClick = useCallback((e, {id, items}) => {
  //   e.stopPropagation()
  //   const defaultColor = MYBRICKS_VARIABLE_CSS[id]
  //   theme.set(id, defaultColor)
  //   data.variables[0].config[id] = defaultColor
  //   generateColors({ data, theme, primaryColor: defaultColor, children: items })
  // }, [])

  const variablePanels = useMemo(() => {
    return variables.map(({ id, title, items }) => {
      const header = (
        <div className={css.header}>
          <div className={css.title}>
            {title}
          </div>
          <div className={css.color} data-mybricks-tip={root ? `修改${title}将自动计算相应色值` : ''}>
            <Picker data={data} theme={theme} themeItem={{id, title, items, isSeed: root}} />
          </div>
          {/* {root && (
            <Button
              size='small'
              shape='round'
              onClick={(e) => onResetClick(e, {id, items})}
            >
              重置
            </Button>
          )} */}
        </div>
      )
      return root ? (
        <Panel
          key={id}
          header={header}
        >
          {items ? (
            <VariableConfiguration
              variables={items}
              data={data}
              theme={theme}
              viewRef={viewRef}
              popView={popView}
            />
          ): (
            <div className={css.empty}>无关联色</div>
          )}
        </Panel>
      ) : (
        <div key={id} className={css.customPanel}>
          {header}
        </div>
      )
    })
  }, [])

  return (
    <Collapse accordion={root} ghost>
      {variablePanels}
      {root && <Panel
        key={'custom'}
        header={(
          <div className={css.header}>
            <div className={css.title}>
              {'自定义'}
            </div>
          </div>
        )}
      >
        <CustomVariables data={data} viewRef={viewRef} theme={theme} popView={popView}/>
      </Panel>}
    </Collapse>
  )
}

function CustomVariables ({ data, viewRef, theme, popView }) {
  const [variables, setVariables] = useState(data.variables[2].configs)
  const [variableConfigPanelOpen, setVariableConfigPanelOpen] = useState(false)
  const [variableConfigPanelFormData, setVariableConfigPanelFormData] = useState(null)

  const onAddClick = useCallback(() => {
    console.log(popView)
    setVariableConfigPanelOpen(true)
    setVariableConfigPanelFormData(null)
  }, [])

  const onEditClick = useCallback((formData) => {
    setVariableConfigPanelOpen(true)
    setVariableConfigPanelFormData(formData)
  }, [])

  const onVariableConfigPanelOk = useCallback((value) => {
    if (!value.id) {
      setVariables((variables) => {
        const finalVariables = variables.concat({ ...value, id: uuid() })
        data.variables[2].configs = finalVariables
        SET_MYBRICKS_CSS_VARIABLE_LIST({ data, theme })
        return finalVariables
      })
    } else {
      setVariables((variables) => {
        const index = variables.findIndex((variable) => variable.id === value.id)
        variables.splice(index, 1, value)
        data.variables[2].configs = variables
        SET_MYBRICKS_CSS_VARIABLE_LIST({ data, theme })
        return [...variables]
      })
    }
    onVariableConfigPanelCancel()
  }, [])

  const onVariableConfigPanelCancel = useCallback(() => {
    setVariableConfigPanelOpen(false)
    setVariableConfigPanelFormData(null)
  }, [])

  const themePanel = useMemo(() => {
    if (variableConfigPanelOpen) {
      const { id, key } = variableConfigPanelFormData || {}
      const container = document.querySelector('div[class^="lyStage-"]')

      return (
        <div key={id + key}>
          <ThemePanel
            title={`${id ? '编辑' : '新建'}自定义变量`}
            onOk={onVariableConfigPanelOk}
            defaultValue={variableConfigPanelFormData}
            onCancel={onVariableConfigPanelCancel}
            container={container}
            style={{ right: 0}}
          />
        </div>
      )
    }

    return null
  }, [variableConfigPanelOpen, variableConfigPanelFormData])

  return (
    <div className={css.customVariables}>
      {variables.map(({ id, key, name, value }) => {
        return (
          <div
            key={id}
            data-mybricks-tip={name}
            className={css.circel}
            style={{backgroundColor: value, borderColor: value}}
            onClick={() => onEditClick({ id, key, name, value })}
          />
        )
      })}
      <div
        className={`${css.circel} ${css.addIcon}`}
        onClick={onAddClick}
        data-mybricks-tip='添加变量'
      >
        {PlusOutlined}
      </div>
      {themePanel}
    </div>
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
  const nameRef = useRef<HTMLDivElement>()
  const [formData] = useState({ ...defaultValue })
  const [edit] = useState(formData.key)
  const [color, setColor] = useState(defaultValue?.value || '#ffffff')

  const validate = useCallback(() => {
    const name = formData.name?.trim()
    const key = formData.key?.trim()
    // const themeId = formData.themeId
    let result: any = {
      id: formData.id,
      name,
      key,
      value: formData.value || '#ffffff'
    }
    if (!name) {
      result = false
      nameRef.current.classList.add(css.error)
    }

    if (result && (!key || !/^--[\w-]+$/.test(key))) {
      result.key = `--mybricks-${uuid()}-${uuid()}`
    }

    return result
  }, [])

  const onSaveClick = useCallback(() => {
    const result = validate()
    if (result) {
      onOk(result)
    }
  }, [])

  const onNameChange = useCallback((e) => {
    const value = e.target.value.trim()
    formData.name = value
    if (!value.length) {
      nameRef.current.classList.add(css.error)
    } else {
      nameRef.current.classList.remove(css.error)
    }
  }, [])

  const onKeyChange = useCallback((e) => {
    const value = e.target.value.trim()
    formData.key = value
  }, [])

  const onColorChange = useCallback(({ hsl }) => {
    const color = hsla2rgba(hsl)
    formData.value = color
    setColor(color)
  }, [])

  return createPortal(
    <div className={css.themePanel} style={style} key={formData}>
      <div className={css.header}>
        <div>
          {title}
        </div>
        <div>
          <Button onClick={onCancel}>关闭</Button>
          <Button type='primary' onClick={onSaveClick}>保存</Button>
        </div>
      </div>
      <div className={css.form}>
        <div className={css.formItem}>
          <label>
            <i>*</i>名称
          </label>
          <div
            ref={nameRef}
            className={`${css.editor} ${css.textEdt}`}
            data-err={'请输入变量名称'}
          >
            <input
              type={'text'}
              placeholder={'请输入变量名称'}
              defaultValue={formData.name}
              onChange={onNameChange}
            />
          </div>
        </div>
        {!edit && <div className={css.formItem}>
            <label>
              key
            </label>
            <div className={`${css.editor} ${css.textEdt}`}>
              <input
                type={'text'}
                placeholder={'不输入则自动生成(例: --xxx-x)'}
                defaultValue={formData.key}
                onChange={onKeyChange}
              />
            </div>
          </div>}
        <div className={css.formItem}>
          <label>
            颜色
          </label>
          <div className={`${css.editor} ${css.textEdt}`}>
            <PickerEditor
              color={color}
              onChange={onColorChange}
            />
          </div>
        </div>
      </div>
    </div>,
    // document.body
    container
  )
}

import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { createPortal } from 'react-dom'
import { Segmented, Select, Popover, Modal, message, Popconfirm } from "antd";
import { RightOutlined, CheckOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { generate } from '@ant-design/colors'
import { convertHyphenToCamel, convertCamelToHyphen, useThemeChange } from "../../../../theme2"

import {
  Toggle,
  Button,
  Colorpicker,
  // PlusOutlined,
  RemoveOutlined,
  ArrorRightOutlined
} from '../../compoments'
import { uuid } from '../../../../utils'
import { ThemeEditorContext } from "../../../../theme2"

import { useThemeEditorContext, MYBRICKS_VARIABLE_CSS_CONFIG, SET_MYBRICKS_CSS_VARIABLE_LIST } from '../../../index'
import { ThemeEditor as Editor } from "@mybricks/theme-token";

import css from './index.less'
import { useUpdateEffect } from '../../hooks';

const { confirm } = Modal;

const MYBRICKS_VARIABLE_CSS_TITLES = ['主题色分类', '成功色分类', '错误色分类', '警告色分类', '信息色分类']
const ColorIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-v-6ec2bbd6=""><path d="M5.12244 13.2087L14.4632 20.0582C15.151 20.746 17.2416 19.7702 19.1332 17.8787C21.0248 15.9871 22.0005 13.8965 21.3127 13.2087L14.4632 3.86792"></path><path d="M11.6601 10.4063C14.2394 7.82703 15.4939 4.89976 14.4622 3.86806C13.4305 2.83635 10.5032 4.09089 7.92396 6.67016C5.34469 9.24942 4.09015 12.1767 5.12185 13.2084C6.15356 14.2401 9.08083 12.9856 11.6601 10.4063Z"></path><path d="M3 20.2387C3 19.2657 4.76125 16.7162 4.76125 16.7162C4.76125 16.7162 6.5225 19.2657 6.5225 20.2387C6.5225 21.2118 5.73434 22 4.76125 22C3.78816 22 3 21.2118 3 20.2387Z"></path><path d="M14.4481 12.3131H17.9706C18.9631 12.3131 19.8597 11.9026 20.5 11.2421C21.1147 10.608 21.4931 9.74347 21.4931 8.79063C21.4931 6.84533 19.9159 5.26813 17.9706 5.26813H15.4899"></path></svg>
const TextIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-v-6ec2bbd6=""><path d="M12 4H4V8.44444M12 4H20V8.44444M12 4V20M12 20H15.5556M12 20H8.44444"></path></svg>
const BorderIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-v-6ec2bbd6=""><path d="M10 3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V10"></path><path d="M10 20.5H5.5C4.39543 20.5 3.5 19.6046 3.5 18.5V14"></path><path d="M14 3.5H18.5C19.6046 3.5 20.5 4.39543 20.5 5.5V10"></path><path d="M14 20.5H18.5C19.6046 20.5 20.5 19.6046 20.5 18.5V14"></path></svg>
const BoxShadowIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-v-6ec2bbd6=""><circle cx="11.8304" cy="12.3307" r="2.83333"></circle><path d="M11.8333 5.66667V3M11.8333 21.6667V19M21.1667 12.3333H18.5M5.16667 12.3333H2.5M16.5475 7.61929L18.4331 5.73368M5.23372 18.933L7.11934 17.0474M18.4328 18.933L16.5472 17.0474M7.11937 7.61929L5.23375 5.73367"></path></svg>
const FilterIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-v-6ec2bbd6=""><circle opacity="0.4" cx="8" cy="15.5" r="5.5"></circle><circle opacity="0.7" cx="16" cy="15.5" r="5.5"></circle><circle cx="12" cy="8.5" r="5.5"></circle></svg>
const CSS_MODE_OPTIONS = [
  { label: ColorIcon, value: 'color', tip: '颜色' },
  { label: TextIcon, value: 'text', tip: '文字', disabled: true },
  { label: BorderIcon, value: 'border', tip: '边框', disabled: true },
  { label: BoxShadowIcon, value: 'boxShadow', tip: '阴影', disabled: true },
  { label: FilterIcon, value: 'filter', tip: '滤镜', disabled: true }
]

export function DesignAll () {
  const [cssMode, setCssMode] = useState('color')
  const { onThemeChange } = useThemeChange()

  const { designer, context, mybricksPrefixCls } = useContext(ThemeEditorContext);

  const { defaultVariableKey, variablesOptions } = useMemo(() => {
    const variables = context.theme.variables;
    let defaultVariableKey;
    const variablesOptions = variables.map(({ key, title, active }) => {
      if (active) {
        defaultVariableKey = key
      }
      return {
        label: title,
        value: key
      }
    })

    return {
      defaultVariableKey,
      variablesOptions
    }
  }, [])

  const [variableKey, setVariableKey] = useState(defaultVariableKey);

  const handleVariableSelectChange = (value) => {
    setVariableKey(value);
  }

  const { variable } = useMemo(() => {
    const variables = context.theme.variables;
    let theme;
    variables.forEach((variable) => {
      if (variable.key !== variableKey) {
        variable.active = false
      } else {
        variable.active = true
        theme = variable;
      }
    })

    return {
      variable: theme,
    }
  }, [variableKey])

  const [brandColor, setBrandColor] = useState(variable.variables.find(({ id }) => id === "mybricks@theme").configs[0].value)

  const [title, setTitle] = useState(variable.title)

  useUpdateEffect(() => {
    setBrandColor(variable.variables.find(({ id }) => id === "mybricks@theme").configs[0].value)
    setTitle(variable.title);
    onThemeChange();
  }, [variable])

  const handleThemeChange = (theme) => {
    const customTheme = variable.variables.find(({ id }) => id === "custom@theme")
    customTheme.configs.forEach(({ key }) => {
      designer.themes.removeCSSVar(key)
    })

    setVariableKey(theme)
  }

  return (
    <>
      <Popover
        placement="leftTop"
        title={"主题"}
        content={<ThemeList theme={variable} onChange={handleThemeChange} setTitle={setTitle} />}
        trigger="hover"
      >
        <div className={css.themeSelect}>
          <div className={css.themeSelectLeft}>
            <div className={css.themeSelectColor} style={{backgroundColor: brandColor}}></div>
            <div>{title}</div>
          </div>
          <div className={css.themeSelectRight}>
            <RightOutlined />
          </div>
        </div>
      </Popover>
      <div className={css.cssModeSelect}>
        <Toggle
          // block
          defaultValue={cssMode}
          onChange={() => {}}
          options={CSS_MODE_OPTIONS}
        />
      </div>
      <GeneralTheme
        variable={variable}
        onBrandColorChange={setBrandColor}
        onThemeChange={onThemeChange}
      />
    </>
  )
}

const ThemeList = ({ onChange, theme, setTitle }: any) => {
  const { context, generateDefaultVariables } = useContext(ThemeEditorContext);
  const [formData] = useState({ title: "", key: "" });
  const titleRef = useRef<HTMLDivElement>()
  const keyRef = useRef<HTMLDivElement>()
  const [actived, setActived] = useState(theme.key);
  const [showAdd, setShowAdd] = useState(false);
  const [variables, setVariables] = useState(context.theme.variables);
  const [updateVariable, setUpdateVariable] = useState(null);

  const handleThemeClick = (key) => {
    setActived(key);
    onChange(key)
  }

  const handleValidate = useCallback(() => {
    const title = formData.title?.trim()
    const key = formData.key?.trim()
    let result: any = {
      title,
      key
    }
    if (!title) {
      result = false
      titleRef.current.classList.add(css.error)
    }
    if (!key) {
      result = false
      keyRef.current.classList.add(css.error)
    } else if (variables.find(({ key: vKey }) => vKey === key)) {
      result = false
      keyRef.current.classList.add(css.error)
      message.warning("已存在相同的key，请再次修改")
    }

    return result
  }, [])

  const handleThemeAdd = (result) => {
    // const result = handleValidate()
    // if (result) {
    //   const newVariables = generateDefaultVariables(result);
    //   setVariables((variables) => {
    //     return variables.concat(newVariables)
    //   })
    //   context.theme.variables = context.theme.variables.concat(newVariables);
    //   handleThemeAddCencel();
    // }
    const newVariables = generateDefaultVariables(result);
    setVariables((variables) => {
      return variables.concat(newVariables)
    })
    context.theme.variables = context.theme.variables.concat(newVariables);
    handleThemeAddCencel();
  }

  const handleThemeTitleChange = useCallback((e) => {
    const title = e.target.value.trim()
    formData.title = title
    if (!title.length) {
      titleRef.current.classList.add(css.error)
    } else {
      titleRef.current.classList.remove(css.error)
    }
  }, [])
  const handleThemeKeyChange = useCallback((e) => {
    const key = e.target.value.trim()
    formData.key = key
    if (!key.length) {
      keyRef.current.classList.add(css.error)
    } else {
      keyRef.current.classList.remove(css.error)
    }
  }, [])

  const handleThemeAddCencel = () => {
    // formData.title = "";
    // titleRef.current = null;
    // formData.key = "";
    // keyRef.current = null;
    setShowAdd(false);
  }

  const handleThemeUpdate = (result) => {
    updateVariable.key = result.key
    updateVariable.title = result.title

    // const newVariables = generateDefaultVariables(result);
    setVariables((variables) => {
      return [...variables]
    })
    // context.theme.variables = context.theme.variables.concat(newVariables);
    // handleThemeAddCencel();
    setUpdateVariable(null);

    setTitle(result.title)
  }

  const handleThemeDelete = (variable: any) => {
    // setVariables((variables) => {
    //   const res = variables.filter(({ key }) => key !== variable.key)

    //   if (variable.active) {
    //     res[0].active = true
    //   }

    //   return res;
    // })

    // context.theme.variables = context.theme.variables.filter(({ key }) => key !== variable.key)
    // if (variable.active) {
    //   context.theme.variables[0].active = true
    //   setActived(context.theme.variables[0].key)
    //   onChange(context.theme.variables[0].key)
    // }

    const res = variables.filter(({ key }) => key !== variable.key)
    context.theme.variables = res;
    setVariables(res)

    if (variable.active) {
      res[0].active = true
      setActived(res[0].key)
      onChange(res[0].key)
    }
  }


  return (
    <div style={{ width: 264 }}>
      {
        variables.map((variable) => {
          return (
            <>
              <div
                key={variable.key}
                className={css.themeSelect}
                style={{ outline: actived === variable.key ? "2px solid #fa6400" : "" }}
                onClick={() => handleThemeClick(variable.key)}
              >
                <div className={css.themeSelectLeft}>
                  <div className={css.themeSelectColor} style={{backgroundColor: variable.variables.find(({ id }) => id === "mybricks@theme").configs[0].value}}>

                  </div>
                  <div>{variable.title}</div>
                </div>
                <div className={css.themeSelectRight} onClick={e => e.stopPropagation()}>
                  <EditOutlined onClick={() => setUpdateVariable(variable)}/>      
                  {variables.length > 1 && (
                    <Popconfirm
                      title={`确认删除主题“${variable.title}”吗，删除后无法恢复`}
                      okText="删除"
                      cancelText="取消"
                      okType="danger"
                      onConfirm={() => handleThemeDelete(variable)}
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  )}
                </div>
              </div>
              {updateVariable && updateVariable.key === variable.key && <ThemePopAddForm
                vKey={variable.key}
                title={variable.title}
                okText={"编辑"}
                variables={variables}
                onOk={handleThemeUpdate}
                onCancel={() => setUpdateVariable(null)}
              />}
            </>
          )
        })
      }
      <div className={css.themePopAdd} onClick={() => setShowAdd(true)}>
        <div>添加主题</div>
        <PlusOutlined />
      </div>
      {showAdd && (
        <ThemePopAddForm
          vKey={""}
          title={""}
          okText={"添加"}
          variables={variables}
          onOk={handleThemeAdd}
          onCancel={() => setShowAdd(false)}
        />
      )}
      {/* {!showAdd && <Button
        type='primary'
        style={{ height: 32, width: "100%", marginTop: 12 }}
        onClick={() => onChange(actived)}
      >确认</Button>} */}
    </div>
  )
}

const ThemePopAddForm = ({
  vKey,
  title,
  okText,
  onOk,
  onCancel,
  variables
}) => {
  const titleRef = useRef<any>();
  const keyRef = useRef<any>();
  const [formData] = useState({ key: vKey, title })

  const handleThemeTitleChange = (e) => {
    const title = e.target.value.trim()
    formData.title = title
    if (!title.length) {
      titleRef.current.classList.add(css.error)
    } else {
      titleRef.current.classList.remove(css.error)
    }
  }
  const handleThemeKeyChange = (e) => {
    const key = e.target.value.trim()
    formData.key = key
    if (!key.length) {
      keyRef.current.classList.add(css.error)
    } else {
      keyRef.current.classList.remove(css.error)
    }
  }
  const handleOkClick = () => {
    // onOk
    const title = formData.title?.trim()
    const key = formData.key?.trim()
    let result: any = {
      title,
      key
    }
    if (!title) {
      result = false
      titleRef.current.classList.add(css.error)
    }
    if (!key) {
      result = false
      keyRef.current.classList.add(css.error)
    } else if (variables.find(({ key: vKey }) => vKey === key) && key !== vKey) {
      result = false
      keyRef.current.classList.add(css.error)
      message.warning("已存在相同的key，请再次修改")
    }

    if (result) {
      onOk(result)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={css.themePopAddForm}
    >
      <div className={css.form} style={{ padding: 0 }}>
        <div className={css.formItem} style={{ marginBottom: 8, marginTop: 8 }}>
          <label>
            <i>*</i>名称
          </label>
          <div
            ref={titleRef}
            style={{ padding: 0 }}
            className={`${css.editor} ${css.textEdt}`}
            data-err={'请输入主题名称'}
          >
            <input
              type={'text'}
              placeholder={'请输入主题名称'}
              defaultValue={formData.title}
              onChange={handleThemeTitleChange}
            />
          </div>
        </div>
        <div className={css.formItem} style={{ marginBottom: 8, marginTop: 8 }}>
          <label>
            <i>*</i>key
          </label>
          <div
            ref={keyRef}
            style={{ padding: 0 }}
            className={`${css.editor} ${css.textEdt}`}
            data-err={'请输入唯一标识，用户主题切换'}
          >
            <input
              type={'text'}
              placeholder={'请输入唯一标识，用户主题切换'}
              defaultValue={formData.key}
              onChange={handleThemeKeyChange}
            />
          </div>
        </div>
        <div>
          <Button
            type='primary'
            style={{ fontWeight: 400, fontSize: 12 }}
            onClick={handleOkClick}
          >{okText}</Button>
          <Button
            style={{ fontWeight: 400, fontSize: 12, border: "1px solid #cdcdcd", marginLeft: 2 }}
            onClick={onCancel}
          >取消</Button>
        </div>
      </div>
    </div>
  )
}

function ThemeContainer ({ children, title }) {
  return (
    <div className={css.themeContainer}>
      <div className={css.themeTitle}>{title}</div>
      <div className={css.themeList}>
        {children}
      </div>
    </div>
  )
}

function GeneralTheme ({ variable, onBrandColorChange, onThemeChange }: any) {
  const { mybricksPrefixCls } = useContext(ThemeEditorContext);
  // const { data, themes } = useThemeEditorContext()
  // const { designer, context } = useContext(ThemeEditorContext);

  // console.log("数据源: ", context.theme)

  // const { defaultVariableValue, variablesOptions } = useMemo(() => {
  //   const variables = context.theme.variables;
  //   let defaultVariableValue;
  //   const variablesOptions = variables.map(({ key, title, active }) => {
  //     if (active) {
  //       defaultVariableValue = key
  //     }
  //     return {
  //       label: title,
  //       value: key
  //     }
  //   })

  //   return {
  //     defaultVariableValue,
  //     variablesOptions
  //   }
  // }, [])

  const { customTheme, mybricksTheme, mybricksThemeToken } = useMemo(() => {
    const mybricksTheme = variable.variables.find(({ id }) => id === "mybricks@theme")
    // mybricksTheme.configs.forEach(({ key, value }) => {
    //   cssVarMap[key] = value;
    //   designerThemesSetCSSVar(key, value);
    // })
    const customTheme = variable.variables.find(({ id }) => id === "custom@theme")
    // customTheme.configs.forEach(({ key, value }) => {
    //   cssVarMap[key] = value;
    //   designerThemesSetCSSVar(key, value);
    // })

    return {
      customTheme,
      mybricksTheme,
      mybricksThemeToken: {
        name: variable.title,
        key: variable.key,
        config: {
          token: mybricksTheme.configs.reduce((p, { key, value }) => {
            p[convertHyphenToCamel(key.replace(`--${mybricksPrefixCls}-`, ""))] = value;
            return p;
          }, {})
        }
      }
    }
  }, [variable])

  const handleSelectChange = (e) => {
    console.log("e: ", e);
  }

  const [theme, setTheme] = useState(mybricksThemeToken);

  useUpdateEffect(() => {
    setTheme(mybricksThemeToken)
  }, [mybricksThemeToken])

  const handleThemeChange = (newTheme, token) => {
    setTheme(newTheme);
    const key = `--${mybricksPrefixCls}-${convertCamelToHyphen(token)}`
    const item = mybricksTheme.configs.find(({ key: tKey }) => tKey === key)
    item.value = newTheme.config.token[token];
    if (token === "colorPrimary") {
      onBrandColorChange(item.value)
    }
    onThemeChange();
  };

  return (
    <div>
      <ThemeContainer title='常规主题'>
        <Editor
          theme={theme}
          onThemeChange={handleThemeChange}
        />
      </ThemeContainer>
      <ThemeContainer title='扩展色'>
        <CustomVariables customTheme={customTheme} onThemeChange={onThemeChange}/>
      </ThemeContainer>
    </div>
  )
}

function CustomVariables ({ customTheme, onThemeChange }: any) {
  // const { data, themes } = useThemeEditorContext()
  const { designer, editConfig, context, mybricksPrefixCls } = useContext(ThemeEditorContext);
  const { data, component, popView, themes } = useMemo(() => {
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

  // const [variables, setVariables] = useState(data.variables[2].configs)
  const [variables, setVariables] = useState(customTheme.configs)

  useUpdateEffect(() => {
    setVariables(customTheme.configs);
  }, [customTheme])

  const [variableConfigPanelOpen, setVariableConfigPanelOpen] = useState(false)
  const [variableConfigPanelFormData, setVariableConfigPanelFormData] = useState(null)

  const onAddClick = () => {
    setVariableConfigPanelOpen(true)
    setVariableConfigPanelFormData(null)
  }

  const onEditClick = (formData) => {
    setVariableConfigPanelOpen(true)
    setVariableConfigPanelFormData(formData)
  }

  const onDeleteClick = (e, { key }) => {
    e.stopPropagation()

    // const variables = data.variables[2].configs
    const variables = customTheme.configs
    const index = variables.findIndex((variable) => variable.key === key)
    variables.splice(index, 1)
    // data.variables[2].configs = variables
    customTheme.configs = variables
    // SET_MYBRICKS_CSS_VARIABLE_LIST({ data, themes })
    onThemeChange()
    setVariables([...variables])

    if (key === variableConfigPanelFormData?.key) {
      onVariableConfigPanelCancel()
    }

    themes.removeCSSVar(key)
  }

  const onVariableConfigPanelOk = ({ key, name, value }) => {
    setVariables((variables) => {
      const index = variables.findIndex((variable) => variable.key === key)
      if (index !== -1) {
        // 编辑
        variables.splice(index, 1, { key, name, value })
        // data.variables[2].configs = variables
        customTheme.configs = variables
        // SET_MYBRICKS_CSS_VARIABLE_LIST({ data, themes })
        onThemeChange()
        return [...variables]
      } else {
        // 新增
        const finalVariables = variables.concat({ key, name, value })
        // data.variables[2].configs = finalVariables
        customTheme.configs = finalVariables
        // SET_MYBRICKS_CSS_VARIABLE_LIST({ data, themes })
        onThemeChange()
        return finalVariables
      }
    })

    onVariableConfigPanelCancel()
  }

  const onVariableConfigPanelCancel = () => {
    setVariableConfigPanelOpen(false)
    setVariableConfigPanelFormData(null)
  }

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
            mybricksPrefixCls={mybricksPrefixCls}
          />
        </div>
      )
    }

    return null
  }, [variableConfigPanelOpen, variableConfigPanelFormData])

  return (
    <div className={css.catelogGroup}>
      <div className={css.catelogContent}>
        {variables.map(({ key, name, value }) => {
          return (
            <div className={css.catelogContentItem} onClick={() => onEditClick({ key, name, value })}>
              <div className={css.catelogContentItemInfo}>
                <div
                  className={css.colorBlock}
                  style={{backgroundColor: themes.getCSSVar(key)}}
                />
                <div>{name}</div>
              </div>
              <div className={css.catelogContentItemAction}>
                <div className={css.catelogContentItemActionIcon} onClick={(e) => onDeleteClick(e, { key })}>
                  {RemoveOutlined}
                </div>
              </div>
            </div>
          )
          })}
          <div className={`${css.catelogContentItem} ${css.center}`} data-mybricks-tip='添加变量' onClick={onAddClick}>
            <div className={`${css.circel} ${css.addIcon}`}>
              {/* {PlusOutlined} */}
              <PlusOutlined />
            </div>
          </div>
        </div>
      {themePanel}
    </div>
  )
}

// function CustomVariables ({ customTheme }: any) {
//   // const { data, themes } = useThemeEditorContext()
//   const { designer, editConfig, context } = useContext(ThemeEditorContext);
//   const { data, component, popView } = useMemo(() => {
//     const { themes, components } = designer
//     const { popView } = editConfig

//     return {
//       get data() {
//         return context.theme
//       },
//       themes,
//       component: {
//         getAll: components.getAll
//       },
//       popView
//     }
//   }, [])
//   console.log("customTheme: ", customTheme)
//   console.log("data.variables: ", data.variables)

//   const [variables, setVariables] = useState(data.variables[2].configs)
//   const [variableConfigPanelOpen, setVariableConfigPanelOpen] = useState(false)
//   const [variableConfigPanelFormData, setVariableConfigPanelFormData] = useState(null)

//   const onAddClick = useCallback(() => {
//     setVariableConfigPanelOpen(true)
//     setVariableConfigPanelFormData(null)
//   }, [])

//   const onEditClick = useCallback((formData) => {
//     setVariableConfigPanelOpen(true)
//     setVariableConfigPanelFormData(formData)
//   }, [])

//   const onDeleteClick = useCallback((e, { key }) => {
//     e.stopPropagation()

//     const variables = data.variables[2].configs
//     const index = variables.findIndex((variable) => variable.key === key)
//     variables.splice(index, 1)
//     data.variables[2].configs = variables
//     SET_MYBRICKS_CSS_VARIABLE_LIST({ data, themes })
//     setVariables([...variables])

//     if (key === variableConfigPanelFormData?.key) {
//       onVariableConfigPanelCancel()
//     }

//     themes.removeCSSVar(key)
//   }, [variableConfigPanelFormData])

//   const onVariableConfigPanelOk = useCallback(({ key, name, value }) => {
//     setVariables((variables) => {
//       const index = variables.findIndex((variable) => variable.key === key)
//       if (index !== -1) {
//         // 编辑
//         variables.splice(index, 1, { key, name, value })
//         data.variables[2].configs = variables
//         SET_MYBRICKS_CSS_VARIABLE_LIST({ data, themes })
//         return [...variables]
//       } else {
//         // 新增
//         const finalVariables = variables.concat({ key, name, value })
//         data.variables[2].configs = finalVariables
//         SET_MYBRICKS_CSS_VARIABLE_LIST({ data, themes })
//         return finalVariables
//       }
//     })

//     onVariableConfigPanelCancel()
//   }, [])

//   const onVariableConfigPanelCancel = useCallback(() => {
//     setVariableConfigPanelOpen(false)
//     setVariableConfigPanelFormData(null)
//   }, [])

//   const themePanel = useMemo(() => {
//     if (variableConfigPanelOpen) {
//       const { id, key } = variableConfigPanelFormData || {}
//       const container = document.querySelector('div[class^="lyStage-"]')

//       return (
//         <div key={id + key}>
//           <ThemePanel
//             title={`${id ? '编辑' : '新建'}自定义变量`}
//             onOk={onVariableConfigPanelOk}
//             defaultValue={variableConfigPanelFormData}
//             onCancel={onVariableConfigPanelCancel}
//             container={container}
//             style={{ right: 0}}
//           />
//         </div>
//       )
//     }

//     return null
//   }, [variableConfigPanelOpen, variableConfigPanelFormData])

//   return (
//     <div className={css.catelogGroup}>
//       <div className={css.catelogContent}>
//         {variables.map(({ key, name, value }) => {
//           return (
//             <div className={css.catelogContentItem} onClick={() => onEditClick({ key, name, value })}>
//               <div className={css.catelogContentItemInfo}>
//                 <div
//                   className={css.colorBlock}
//                   style={{backgroundColor: themes.getCSSVar(key)}}
//                 />
//                 <div>{name}</div>
//               </div>
//               <div className={css.catelogContentItemAction}>
//                 <div className={css.catelogContentItemActionIcon} onClick={(e) => onDeleteClick(e, { key })}>
//                   {RemoveOutlined}
//                 </div>
//               </div>
//             </div>
//           )
//           })}
//           <div className={`${css.catelogContentItem} ${css.center}`} data-mybricks-tip='添加变量' onClick={onAddClick}>
//             <div className={`${css.circel} ${css.addIcon}`}>
//               {/* {PlusOutlined} */}
//               <PlusOutlined />
//             </div>
//           </div>
//         </div>
//       {themePanel}
//     </div>
//   )
// }

function ThemePanel ({
  title,
  onOk,
  onCancel,
  style,
  // options,
  defaultValue,
  container,
  mybricksPrefixCls
}: any) {
  const nameRef = useRef<HTMLDivElement>()
  const keyRef = useRef<HTMLDivElement>()
  const [formData] = useState({ ...defaultValue })
  // const [edit] = useState(formData.key)
  const [color, setColor] = useState(defaultValue?.value || '#ffffff')

  const validate = useCallback(() => {
    const name = formData.name?.trim()
    const key = formData.key?.trim()
    let result: any = {
      // id: formData.id,
      name,
      key,
      value: formData.value || '#ffffff'
    }
    if (!name) {
      result = false
      nameRef.current.classList.add(css.error)
    }

    console.log(key, "key")

    if (key) {
      if (!key.match(/^\-\-\w+/)) {
        keyRef.current.classList.add(css.error)
        result = false
      }
    }

    // if (result && (!key || !/^--[\w-]+$/.test(key))) {
    //   result.key = `--${mybricksPrefixCls}-${uuid()}-${uuid()}`
    // }
    if (result && !key) {
      result.key = `--${mybricksPrefixCls}-${uuid()}-${uuid()}`
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

  const onColorChange = useCallback(({ color }) => {
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
          <label style={{width: 50}}>
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
        <div className={css.formItem}>
          <label style={{width: 50}}>
            css变量
          </label>
          <div
            ref={keyRef}
            className={`${css.editor} ${css.textEdt}`}
            data-err={'请按css变量规范输入(例: --xxx-x)'}
          >
            <input
              type={'text'}
              placeholder={'不输入则自动生成(例: --xxx-x)'}
              defaultValue={formData.key}
              onChange={onKeyChange}
            />
          </div>
        </div>
        <div className={css.formItem}>
          <label style={{width: 50}}>
            颜色
          </label>
          <div className={`${css.editor} ${css.textEdt}`}>
            <Colorpicker value={color} onChange={(color) => onColorChange({ color })}>
              <div className={css.colorRectangle} style={{backgroundColor: color}}/>
            </Colorpicker>
          </div>
        </div>
      </div>
    </div>,
    // document.body
    container
  )
}

// TODO: antd 基于主色设计同色系颜色值
function generateColors ({
  data,
  themes,
  primaryColor,
  children
}) {
  const colors = generate(primaryColor)
  children?.forEach(item => {
    const { id, colorListIndex } = item
    themes.setCSSVar(id, colors[colorListIndex])
    const config = data.variables[0].configs.find(({ key }) => key === id)
    config.value = colors[colorListIndex]
  })
}

import { convertCamelToHyphen } from "./string";
import { uuid } from "../../utils"
import { antdV4CssVarMap, MYBRICKS_PREFIXCLS, applyThemeVariablesToWindow } from "../themeToken";

let _defaultValue;

export const initThemeGlobal = ({ designer, context }) => {
  const { setCSSVar: designerThemesSetCSSVar } = designer.themes;

  // 设置antd4的变量，针对通用的PC、基础组件库【非通用逻辑】
  Object.entries(antdV4CssVarMap()).forEach(([key, value]) => {
    // @ts-ignore
    designerThemesSetCSSVar(key, value);
  })

  activeThemeChange({ designer, context });
}

const CSS_MAP: Record<string, string> = {};
let styleThemes;

  // 写到style标签，用于编辑器回显样式
const setStyleTag = () => {
  if (!styleThemes) {
    styleThemes = document.createElement("style")
    styleThemes.setAttribute("id", "__themes__")
    document.body.appendChild(styleThemes)
  }

  styleThemes.textContent = `:root{${Object.entries(CSS_MAP).reduce((pre, [key, value]) => {
    return pre + `${key}:${value};`
  }, "")}}`
}

export const setVariablesToWindow = ({ context }) => {
  const activedVariables = context.theme.variables.find(({ active }) => active)
  applyThemeVariablesToWindow(activedVariables)
}

export const activeThemeChange = ({ designer, context }) => {
  const { setCSSVar: designerThemesSetCSSVar } = designer.themes
  // 设置当前选中的主题变量
  const activedVariables = context.theme.variables.find(({ active }) => active)

  activedVariables.variables.forEach(({ configs }) => {
    configs.forEach(({ key, value }) => {
      CSS_MAP[key] = value;
      designerThemesSetCSSVar(key, value)
    })
  })

  setStyleTag()

  applyThemeVariablesToWindow(activedVariables)
}

export const variableDelete = ({ designer, key }) => {
  const { setCSSVar: designerThemesSetCSSVar } = designer.themes
  designerThemesSetCSSVar(key, "")
  Reflect.deleteProperty(CSS_MAP, key)
  setStyleTag()
}

export const variableValueChange = ({ designer, variable }) => {
  const { setCSSVar: designerThemesSetCSSVar } = designer.themes
  const { key, value } = variable
  designerThemesSetCSSVar(key, value)
  CSS_MAP[key] = value
  setStyleTag()
}

export const variableKeyChange = ({ designer, params }) => {
  const { setCSSVar: designerThemesSetCSSVar } = designer.themes
  const { previousKey, key } = params
  const value = CSS_MAP[previousKey];
  Reflect.deleteProperty(CSS_MAP, previousKey)
  CSS_MAP[key] = value
  designerThemesSetCSSVar(key, value)
  setStyleTag()
}

export const initRandomCssVariable = () => {
  return {
    key: `--random-${uuid()}-${uuid()}`,
    name: "变量名",
    value: "#ffffff"
  }
}

export const generateDefaultVariables = ({ key, title }) => {
  return {
    active: false,
    key,
    title,
    variables: [
      {
        id: "mybricks@theme",
        configs: Object.entries(_defaultValue).map(([key, value]) => {
          return {
            key: `--${MYBRICKS_PREFIXCLS}-${convertCamelToHyphen(key)}`,
            value
          }
        })
      },
      {
        id: "custom@theme",
        configs: []
        // configs: [initRandomCssVariable()]
      },
    ]
  }
}

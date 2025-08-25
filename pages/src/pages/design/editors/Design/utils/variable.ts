import { getDefaultToken, antdV4, generateColorCssVarListUseForMyBricksEditor } from "@mybricks/theme-token";
import { convertCamelToHyphen, convertHyphenToCamel } from "./string";
import { uuid } from "../../utils"
import { SYSTEM_VARIABLE_NAME_MAP } from "../Variables/Dialog/constants"

const MYBRICKS_PREFIXCLS = "mb";

let _defaultValue;

export const initThemeGlobal = ({ designer, context }) => {
  const { setCSSVar: designerThemesSetCSSVar } = designer.themes;
  const mybricksPrefixCls = 'mb';
  const { cssVarMap: antdV4CssVarMap, defaultValue } = antdV4({ mybricksPrefixCls });

  // 初始化默认主题
  if (!context.theme.variables.length) {
    context.theme.variables = [{
      active: true,
      key: '默认主题',
      title: '默认主题',
      variables: [
        {
          id: "mybricks@theme",
          // @ts-ignore
          configs: Object.entries(defaultValue).map(([ key, value ]) => {
            return {
              key: `--${mybricksPrefixCls}-${convertCamelToHyphen(key)}`,
              value
            }
          })
        },
        {
          id: "custom@theme",
          configs: []
        },
      ]
    }];
  } else {
    // 老数据兼容，类型问题忽略
    const variables = context.theme.variables
    // @ts-ignore
    if (variables.find(({ id }) => id === "antd@4.x")) {
      // 老数据需要兼容
      // @ts-ignore
      const mybricksTheme = variables.find(({ id }) => id === "mybricks@theme");
      // @ts-ignore
      const customTheme = variables.find(({ id }) => id === "custom@theme");

      const cssVarToTokenMap = {
        "--mybricks-primary-color": "colorPrimary",
        "--mybricks-primary-color-hover": "colorPrimaryHover",
        "--mybricks-primary-color-active": "colorPrimaryActive",
        "--mybricks-primary-color-outline": "colorPrimaryBorder",
        "--mybricks-primary-1": "colorPrimaryBg",
        "--mybricks-primary-2": "colorPrimaryBgHover",
        "--mybricks-primary-3": "colorPrimaryBorder",
        "--mybricks-primary-4": "colorPrimaryBorderHover",
        "--mybricks-primary-5": "colorPrimaryHover",
        "--mybricks-primary-6": "colorPrimary",
        "--mybricks-primary-7": "colorPrimaryActive",
        "--mybricks-success-color": "colorSuccess",
        "--mybricks-success-color-hover": "colorSuccessHover",
        "--mybricks-success-color-active": "colorSuccessActive",
        "--mybricks-success-color-outline": "colorSuccessBorder",
        "--mybricks-error-color": "colorError",
        "--mybricks-error-color-hover": "colorErrorHover",
        "--mybricks-error-color-active": "colorErrorActive",
        "--mybricks-error-color-outline": "colorErrorBorder",
        "--mybricks-warning-color": "colorWarning",
        "--mybricks-warning-color-hover": "colorWarningHover",
        "--mybricks-warning-color-active": "colorWarningActive",
        "--mybricks-warning-color-outline": "colorWarningBorder",
        "--mybricks-info-color": "colorInfo"
      }

      // @ts-ignore
      const previousValue = mybricksTheme.configs.reduce((p, c) => {
        p[c.key] = c.value
        return p
      }, {})

      const token = Object.entries(cssVarToTokenMap).reduce((p, [key, value]) => {
        p[value] = previousValue[key]
        return p
      }, {})

      const defaultValue = getDefaultToken({
        token,
      })

      context.theme.variables = [{
        active: true,
        key: '默认主题',
        title: '默认主题',
        variables: [
          {
            id: "mybricks@theme",
              // @ts-ignore
            configs: Object.entries(defaultValue).map(([ key, value ]) => {
              return {
                key: `--${mybricksPrefixCls}-${convertCamelToHyphen(key)}`,
                value
              }
            })
          },
            // @ts-ignore
          customTheme,
        ]
      }];
    }

    context.theme.variables.forEach((variable) => {
      variable.title = variable.key;
      const systemTheme = variable.variables.find((v) => v.id = "mybricks@theme");
      systemTheme.configs.forEach((config) => {
        if (!config.name) {
          config.name = SYSTEM_VARIABLE_NAME_MAP[config.key]
        }
      })
    })
  }

  // 设置antd4的变量
  Object.entries(antdV4CssVarMap).forEach(([ key, value ]) => {
    // @ts-ignore
    designerThemesSetCSSVar(key, value);
  })

  handleThemeChange({ designer, context, mybricksPrefixCls });

  return {
    defaultValue
  }
}

export const handleThemeChange = ({ designer, context, mybricksPrefixCls }) => {
  const { setCSSVar: designerThemesSetCSSVar } = designer.themes;
  const defaultValue = {};
  let styleContent = "";
  // 设置当前选中的主题包变量
  const activedVariables = context.theme.variables.find(({ active }) => active)
  const mybricksTheme = activedVariables.variables.find(({ id }) => id === "mybricks@theme")
  mybricksTheme.configs.forEach(({ key, value }) => {
    defaultValue[convertHyphenToCamel(key.replace(`--${mybricksPrefixCls}-`, ""))] = value;
    styleContent = styleContent + `${key}:${value};`
    designerThemesSetCSSVar(key, value);
  })
  const customTheme = activedVariables.variables.find(({ id }) => id === "custom@theme")
  const customOptions = []
  customTheme.configs.forEach(({ key, value, name }) => {
    styleContent = styleContent + `${key}:${value};`
    designerThemesSetCSSVar(key, value);
    customOptions.push({
      label: name,
      value: `var(${key})`,
      resetValue: value
    })
  })

  // 写到style标签
  let styleThemes = document.getElementById("__themes__")
  if (!styleThemes) {
    styleThemes = document.createElement("style")
    styleThemes.setAttribute("id", "__themes__")
    document.body.appendChild(styleThemes)
  }
  styleThemes.textContent = `:root{${styleContent}}`

  const MYBRICKS_CSS_VARIABLE_LIST = generateColorCssVarListUseForMyBricksEditor({ value: defaultValue, mybricksPrefixCls });

  if (customOptions.length) {
    MYBRICKS_CSS_VARIABLE_LIST.push({
      title: "自定义",
      options: customOptions
    })
  }

  // 设置可选择变量，用于编辑器
  window.MYBRICKS_CSS_VARIABLE_LIST = MYBRICKS_CSS_VARIABLE_LIST
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

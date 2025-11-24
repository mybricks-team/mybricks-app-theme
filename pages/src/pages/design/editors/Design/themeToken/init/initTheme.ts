import { DEFAULT_THEME, DEFAULT_VARIABLES_TITLE, SYSTEM_VARIABLE_NAME_MAP, DEFAULT_SYSTEM_ID } from "./constants";
import type { ThemeData } from "../type"

export const initTheme = (defaultTheme?: ThemeData) => {

  if (!defaultTheme) {
    return DEFAULT_THEME
  }

  compatible1(defaultTheme);

  // 数据兼容
  defaultTheme.variables.forEach((variable) => {
    variable.title = variable.key
    variable.variables.forEach((variable) => {
      if (!variable.title) {
        // 老数据没有title字段
        variable.title = DEFAULT_VARIABLES_TITLE[variable.id]
      }
      if (variable.id === DEFAULT_SYSTEM_ID) {
        // 老数据没有name字段
        variable.configs.forEach((config) => {
          if (!config.name) {
            config.name = SYSTEM_VARIABLE_NAME_MAP[config.key]
          }
        })
      }
    })
  })

  return defaultTheme
}

const compatible1 = (defaultTheme) => {
  // 最初的版本
  if (defaultTheme.variables[0].id !== "mybricks@theme") {
    return;
  }

  console.log("[数据兼容 - compatible1]", JSON.parse(JSON.stringify({
    defaultTheme,
    DEFAULT_THEME
  })))

  // const cssVarMap = {
  //   "--mybricks-primary-color": "--mb-color-primary",
  //   "--mybricks-primary-color-hover": "--mb-color-primary-hover",
  //   "--mybricks-primary-color-active": "--mb-color-primary-active",
  //   "--mybricks-success-color": "--mb-color-success",
  //   "--mybricks-success-color-hover": "--mb-color-success-hover",
  //   "--mybricks-success-color-active": "--mb-color-success-active",
  //   "--mybricks-error-color": "--mb-color-error",
  //   "--mybricks-error-color-hover": "--mb-color-error-hover",
  //   "--mybricks-error-color-active": "--mb-color-error-active",
  //   "--mybricks-warning-color": "--mb-color-warning",
  //   "--mybricks-warning-color-hover": "--mb-color-warning-hover",
  //   "--mybricks-warning-color-active": "--mb-color-warning-active",
  //   "--mybricks-info-color": "--mb-color-info"
  // }

  const cssVarMap = {
    "--mb-color-primary": "--mybricks-primary-color",
    "--mb-color-primary-hover": "--mybricks-primary-color-hover",
    "--mb-color-primary-active": "--mybricks-primary-color-active",
    "--mb-color-success": "--mybricks-success-color",
    "--mb-color-success-hover": "--mybricks-success-color-hover",
    "--mb-color-success-active": "--mybricks-success-color-active",
    "--mb-color-error": "--mybricks-error-color",
    "--mb-color-error-hover": "--mybricks-error-color-hover",
    "--mb-color-error-active": "--mybricks-error-color-active",
    "--mb-color-warning": "--mybricks-warning-color",
    "--mb-color-warning-hover": "--mybricks-warning-color-hover",
    "--mb-color-warning-active": "--mybricks-warning-color-active",
    "--mb-color-info": "--mybricks-info-color"
  }

  const mybricksTheme = defaultTheme.variables[0]
  const customTheme = defaultTheme.variables[2]

  const mybricksThemeColorMap = mybricksTheme.configs.reduce((pre, cur) => {
    pre[cur.key] = cur.value
    return pre;
  }, {})

  defaultTheme.variables = DEFAULT_THEME.variables;
  defaultTheme.variables[0].variables[1].configs.push(...customTheme.configs);

  defaultTheme.variables[0].variables[0].configs.forEach((config) => {
    const key = cssVarMap[config.key]
    if (key) {
      config.value = mybricksThemeColorMap[key]
    }
  })
}

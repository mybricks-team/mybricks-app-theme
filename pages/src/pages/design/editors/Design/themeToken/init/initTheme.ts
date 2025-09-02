import { DEFAULT_THEME, DEFAULT_VARIABLES_TITLE, SYSTEM_VARIABLE_NAME_MAP, DEFAULT_SYSTEM_ID } from "./constants";
import type { ThemeData } from "../type"

export const initTheme = (defaultTheme?: ThemeData) => {

  if (!defaultTheme) {
    return DEFAULT_THEME
  }

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

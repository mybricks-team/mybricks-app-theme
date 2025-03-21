import React, { useMemo, useState, createContext, useContext } from "react";

import { ConfigView } from "../theme/view";

import { ThemeEditor as Editor, getDefaultToken, getDesignToken, antdV4, generateColorCssVarListUseForMyBricksEditor } from "@mybricks/theme-token";


// themes: Array<{
//   namespace: string
//   components: Array<ComTheme>
// }>
// /** 模版数据 */
// templates: Array<{
//   namespace: string
//   /** 组件标题，对应com.json中的title */
//   comTitle: string
//   /** 组件版本 */
//   version: string
//   components: Array<ComTemplate>
// }>
// variables: Array<{
//   active: boolean;
//   key: string;
//   title: string;
//   variables: Array<{
//     id: string
//     configs: Array<{
//       name?: string
//       key: string
//       value: string
//     }>
//   }>
// }>

interface ThemeEditorContext extends ThemeEditorProps {
  mybricksPrefixCls: any;
  generateDefaultVariables: (params: { key: string; title: string }) => any;
}
export const ThemeEditorContext = createContext({} as ThemeEditorContext);

interface ThemeEditorProps {
  editConfig: any;
  designer: {
    components: {
      // 获取页面内所有组件
      getAll: () => any[]
    }
    themes: {
      // 设置组件风格
      // setComThemes: (comThemes: Array<ComTheme>) => void
  
      // 设置css变量
      setCSSVar: (key: string, value: string) => void
  
      // 清除css变量
      removeCSSVar: (key: string) => void
  
      // 一次性清除所有css变量
      clearCSSVar: () => void
  
      // 获取css变量值
      getCSSVar: (key: string) => string
    }
  };
  context: {
    theme: {
      templates: any;
      themes: any;
      variables: Array<{
        active: boolean;
        key: string;
        title: string;
        variables: Array<{
          id: string
          configs: Array<{
            name?: string
            key: string
            value: string
          }>
        }>
      }>
    }
  };
}

export const useThemeChange = (params?: any) => {
  const { designer, editConfig, context } = params || useContext(ThemeEditorContext);

  const { onThemeChange } = useMemo(() => {
    const mybricksPrefixCls = 'mb';
    const { setCSSVar: designerThemesSetCSSVar } = designer.themes;
    const onThemeChange = () => {
      const defaultValue = {};
      const cssVarMap = {};
      let styleContent = "";
      // 设置当前选中的主题包变量
      const activedVariables = context.theme.variables.find(({ active }) => active)
      const mybricksTheme = activedVariables.variables.find(({ id }) => id === "mybricks@theme")
      mybricksTheme.configs.forEach(({ key, value }) => {
        defaultValue[convertHyphenToCamel(key.replace(`--${mybricksPrefixCls}-`, ""))] = value;
        // cssVarMap[key] = value;
        styleContent = styleContent + `${key}:${value};`
        designerThemesSetCSSVar(key, value);
      })
      const customTheme = activedVariables.variables.find(({ id }) => id === "custom@theme")
      const customOptions = []
      customTheme.configs.forEach(({ key, value, name }) => {
        // cssVarMap[key] = value;
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
      // styleThemes.textContent = `:root {${Object.entries(cssVarMap).reduce((p, [key, value]) => {
      //   return p + `${key}:${value};`
      // }, "")}}`;
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

    return {
      onThemeChange
    }
  }, [])

  return {
    onThemeChange
  }
}

const ThemeEditor = ({ editConfig, designer, context }: ThemeEditorProps) => {
  const { onThemeChange } = useThemeChange({ designer, editConfig, context });

  const { providerValue } = useMemo(() => {
    const { setCSSVar: designerThemesSetCSSVar } = designer.themes;
    const mybricksPrefixCls = 'mb';
    const { cssVarMap: antdV4CssVarMap, defaultValue } = antdV4({ mybricksPrefixCls });

    // 初始化默认主题
    if (!context.theme.variables.length) {
      context.theme.variables = [{
        active: true,
        key: 'default',
        title: '默认主题',
        variables: [
          {
            id: "mybricks@theme",
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
      const variables = context.theme.variables
      if (variables.find(({ id }) => id === "antd@4.x")) {
        // 老数据需要兼容
        const mybricksTheme = variables.find(({ id }) => id === "mybricks@theme");
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
          key: 'default',
          title: '默认主题',
          variables: [
            {
              id: "mybricks@theme",
              configs: Object.entries(defaultValue).map(([ key, value ]) => {
                return {
                  key: `--${mybricksPrefixCls}-${convertCamelToHyphen(key)}`,
                  value
                }
              })
            },
            customTheme,
          ]
        }];
      }
    }

    // 设置antd4的变量
    Object.entries(antdV4CssVarMap).forEach(([ key, value ]) => {
      designerThemesSetCSSVar(key, value);
    })

    // const cssVarMap = {};
    // // 设置当前选中的主题包变量
    // const activedVariables = context.theme.variables.find(({ active }) => active)
    // const mybricksTheme = activedVariables.variables.find(({ id }) => id === "mybricks@theme")
    // mybricksTheme.configs.forEach(({ key, value }) => {
    //   cssVarMap[key] = value;
    //   designerThemesSetCSSVar(key, value);
    // })
    // const customTheme = activedVariables.variables.find(({ id }) => id === "custom@theme")
    // customTheme.configs.forEach(({ key, value }) => {
    //   cssVarMap[key] = value;
    //   designerThemesSetCSSVar(key, value);
    // })

    // // 写到style标签
    // let styleThemes = document.getElementById("__themes__")
    // if (!styleThemes) {
    //   styleThemes = document.createElement("style")
    //   styleThemes.setAttribute("id", "__themes__")
    //   document.body.appendChild(styleThemes)
    // }
    // styleThemes.textContent = `:root {${Object.entries(cssVarMap).reduce((p, [key, value]) => {
    //   return p + `${key}:${value};`
    // }, "")}}`;

    // // 设置可选择变量，用于编辑器
    // window.MYBRICKS_CSS_VARIABLE_LIST = generateColorCssVarListUseForMyBricksEditor({ value: defaultValue, mybricksPrefixCls });

    onThemeChange();

    return {
      providerValue: {
        mybricksPrefixCls,
        generateDefaultVariables: ({ key, title }) => {
          return {
            active: false,
            key,
            title,
            variables: [
              {
                id: "mybricks@theme",
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
          }
        },
        editConfig,
        designer,
        // designer: {
        //   ...designer,
        //   themes: {
        //     ...designer.themes,
        //     // setCSSVar: (key, value) => {
        //     //   if (cssVarMap[key] !== value) {
        //     //     cssVarMap[key] = value;
        //     //     styleThemes.textContent = `:root {${Object.entries(cssVarMap).reduce((p, [key, value]) => {
        //     //       return p + `${key}:${value};`
        //     //     }, "")}}`;
        //     //   }
        //     //   return designerThemesSetCSSVar(key, value);
        //     // }
        //   }
        // },
        context
      }
    }
  }, [])

  return {
    render: (
      <ThemeEditorContext.Provider value={providerValue}>
        <ConfigView />
      </ThemeEditorContext.Provider>
    )
  }
}

export default ThemeEditor;

/** 驼峰转为-连接 */
export function convertCamelToHyphen(str: string) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
/** -连接转为驼峰 */
export function convertHyphenToCamel(str) {
  return str.replace(/-(\w)/g, function (match, group1) {
      return group1.toUpperCase();
  });
}
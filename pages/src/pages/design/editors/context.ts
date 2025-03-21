import { createContext } from "react";

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
import { createContext, createElement } from "react";
import API from '@mybricks/sdk-for-app/api'
import ThemeEditor from './theme2'
import ThemeGlobal from './ThemeGlobal'
import ThemeComponent from './ThemeComponent'
import Design from "./Design/Design"

export const EditorContext = createContext({} as {
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
  setState: {
    setOpenDesignDialog: React.Dispatch<React.SetStateAction<boolean>>;
    [key: string]: any;
  }
});

export default ({ editConfig, designerRef, context, setState }, { fileId }) => {
  if (editConfig && !editConfig.upload) {
    editConfig.upload = async (files: Array<File>): Promise<Array<string>> => {
      const content = files[0]
      
      const res = await API.Upload.staticServer({
        content,
        folderPath: `/files/${fileId}`,
        noHash: false,
        fileName: content.name
      }) as { url: string }

      return [res.url]
    }
  }

  const editorsMap = {
    THEME: ThemeEditor,
    THEMECOMPONENT: ThemeComponent,
    THEMEGLOBAL: ThemeGlobal,
    DESIGN: Design
  }

  let editor
  try {
    editor = editorsMap[editConfig.type.toUpperCase()] || editConfig.render
  } catch (err) {
    console.error(err)
  }

  const editorType = typeof editor

  if (editorType === 'function') {
    return createElement(EditorContext.Provider, {
      value: {
        editConfig,
        designer: designerRef.current,
        context,
        setState
      }
    }, createElement(editor))
  }

  if (editConfig === 'object' && typeof editor.render === 'function') {
    return editor
  }

  return
}

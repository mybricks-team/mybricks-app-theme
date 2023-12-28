import type { CSSProperties } from 'react'

export interface CSSFromStyle {
  selector: string
  css: CSSProperties
}

export interface Component {
  id: string
  title: string
  dom: HTMLDivElement
  def: {
    namespace: string
    version: string
    title: string
  }
  model: {
    css?: Array<CSSFromStyle>
    data?: Record<string, any>
  }
  slots?: Array<Slot>
}

export interface Slot {
  id: string
  type: string
  title: string
  style: any
  comAry: Array<Component>
}

export interface RenderProps {
  component: {
    // 获取页面内所有组件
    getAll: () => Array<Slot>
  }
  themes: {
    // 设置组件风格
    setComThemes: (comThemes: Array<ComTheme>) => void

    // 设置css变量
    setCSSVar: (key: string, value: string) => void

    // 清除css变量
    removeCSSVar: (key: string) => void

    // 一次性清除所有css变量
    clearCSSVar: () => void

    // 获取css变量值
    getCSSVar: (key: string) => string
  }
}

/** 组件主题 */
export interface ComTheme {
  id: string
  title: string
  themeId: string
  styleAry: Array<CSSFromStyle>
  isDefault: boolean
  namespace: string
}

/** 组件模板 */
export interface ComTemplate {
  id: string
  title: string
  templateId: string
  styleAry: Array<CSSFromStyle>
  data: Record<string, any>
  isDefault: boolean
  namespace: string
}

export interface Data {
  themes: Array<{
    namespace: string
    components: Array<ComTheme>
  }>
  /** 模版数据 */
  templates: Array<{
    namespace: string
    components: Array<ComTemplate>
  }>
  variables: Array<{
    id: string
    configs: Array<{
      name?: string
      key: string
      value: string
    }>
  }>
}

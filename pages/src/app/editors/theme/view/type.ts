import type { CSSProperties } from 'react'

export interface CSSFromStyle {
  selector: string
  css: CSSProperties
}

export interface Component {
  id: string
  title: string
  def: {
    namespace: string
    version: string
    title: string
  }
  model: {
    css?: Array<CSSFromStyle>
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
    // 设置风格
    setComThemes: (comThemes: Array<ComTheme>) => void
  }
  theme: {
    // 设置css变量
    set: (key: string, value: string) => void
  }
}

export interface ComTheme {
  id: string
  title: string
  themeId: string
  styleAry: Array<CSSFromStyle>
  isDefault: boolean
  namespace: string
}

export interface Data {
  themes: Array<{
    namespace: string
    components: Array<ComTheme>
  }>
  variables: Array<{
    id: string
    // config: {[key: string]: string}
    configs: Array<{
      name?: string
      key: string
      value: string
    }>
  }>
}

import type { CSSProperties } from 'react'

export interface CSSFromStyle {
  selector: string
  css: CSSProperties
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
  /** 宽高 相关样式*/
  style: { width: number, height: number }
  namespace: string
}

export interface ThemeData {
  themes: Array<{
    namespace: string
    components: Array<ComTheme>
  }>
  /** 模版数据 */
  templates: Array<{
    namespace: string
    /** 组件标题，对应com.json中的title */
    comTitle: string
    /** 组件版本 */
    version: string
    components: Array<ComTemplate>
  }>
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

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
    getAll: () => Slot
  }
}

export interface Data {
  themes: Array<{
    id: string
    title: string
    namespace: string
    styleAry: Array<CSSFromStyle>
  }>
}

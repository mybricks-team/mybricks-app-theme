import tinycolor from 'tinycolor2'
import { generate } from '@ant-design/colors'

import { DEFAULT_COLOR_INDEX } from '../constant'
import type { Theme, ThemeConfig } from '../types'

export function hsla2rgba(hsla) {
  const color = tinycolor(hsla).toRgbString()
  return color
}

// 基于主色设置同色系颜色值
export const generateColors = (
  { data, theme, primaryColor, children }
    : { data: any, theme: Theme, primaryColor: string, children: ThemeConfig[] }
) => {
  const colors = generate(primaryColor);
  children?.forEach(item => {
    const { id, colorListIndex = DEFAULT_COLOR_INDEX } = item
    theme.set(id, colors[colorListIndex])
    // data.variables[0].config[id] = colors[colorListIndex]
    const config = data.variables[0].configs.find(({ key }) => key === id)
    config.value = colors[colorListIndex]
  });
};
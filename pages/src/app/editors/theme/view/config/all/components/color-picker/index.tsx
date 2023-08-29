import React, { useCallback } from 'react'

import Picker from './picker'
import { generateColors, hsla2rgba } from '../../utils/color'

import type { Theme, ThemeConfig } from '../../types'

import { SET_MYBRICKS_CSS_VARIABLE_LIST } from '../../../../../index'

export default function ({ data, theme, themeItem }: { data: any, theme: Theme, themeItem: ThemeConfig }) {
  const { id, isSeed, items = [] } = themeItem

  const onSelectColor = useCallback(({ hsl }) => {
    const val = hsla2rgba(hsl)
    theme.set(id, val)
    // TODO
    const config = data.variables[0].configs.find(({ key }) => key === id)
    config.value = val
    // 去除自动计算
    if (isSeed) {
      generateColors({ data, theme, primaryColor: val, children: items });
    }

    SET_MYBRICKS_CSS_VARIABLE_LIST({ data, theme })
  }, [])

  return (
    <Picker color={theme.get(id)} onChange={onSelectColor} />
  )
}

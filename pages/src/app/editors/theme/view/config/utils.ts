export function getStyleInnerText ({id, css, selector, global, cssVarToValueMap}) {
  return `
    ${global ? '' : `.${id} `}${selector.replace(/\{id\}/g, `${id}`)} {
      ${Object.keys(css).map(key => {
        let value = css[key]
        if (typeof value === 'string' && value.startsWith('var')) {
          const varValue = cssVarToValueMap[value]
          if (varValue) {
            value = varValue
          }
        }
        return `${convertCamelToHyphen(key)}: ${value}${/!important/.test(value) ? '' : '!important'};`
      }).join('\n')}
    }
  `
}

export function convertCamelToHyphen(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function getCssVarToValueMap () {
  const result = {}
  window['MYBRICKS_CSS_VARIABLE_LIST'].forEach(({options}) => {
    options.forEach(({value, resetValue}) => {
      result[value] = resetValue
    })
  })
  return result
}


export function traverse (slots) {
  return slots.map(({ comAry }) => {
    if (Array.isArray(comAry)) {
      return comAry.map((com) => {
        const { slots } = com
        if (Array.isArray(slots)) {
          return [com, ...traverse(slots).reduce((f, s) => [...f, ...s], [])]
        }
        return [com]
      })
    }

    return []
  }).reduce((f, s) => [...f, ...s], [])
}
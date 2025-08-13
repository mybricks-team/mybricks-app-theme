import { deepCopy } from '../../utils'

export function initThemeInfo (pageComponents: any, themes: any) {
  const namespaceToAllMap = {}
  const namespaceMap = {}
  const themeIdToThemeMap = {}
  const copyTemplates = deepCopy(themes)
  const notInPageNamespaceMap = {}
  
  copyTemplates.forEach(({ namespace }) => {
    if (!namespaceMap[namespace]) {
      namespaceMap[namespace] = true
      notInPageNamespaceMap[namespace] = true
    }
  })

  pageComponents.forEach(({
    id,
    def: {
      title: defTitle,
      namespace
    },
    model: {
      css, 
    },
    title,
    dom
  }) => {

    Reflect.deleteProperty(notInPageNamespaceMap, namespace)

    if (!namespaceMap[namespace]) {
      namespaceMap[namespace] = true
      copyTemplates.push({
        namespace,
        components: []
      })
    }

    if (!namespaceToAllMap[namespace]) {
      namespaceToAllMap[namespace] = {
        title: defTitle,
        options: []
      }
    }

    if (css) {
      themeIdToThemeMap[id] = {
        id,
        title,
        namespace,
        styleAry: css,
      }
      namespaceToAllMap[namespace].options.push({label: title, value: id, dom})
    }
  })

  const finalThemes = []

  copyTemplates.forEach(({ namespace, components }) => {
    if (!notInPageNamespaceMap[namespace]) {
      const finalComponents = []
      finalThemes.push({
        namespace,
        components: finalComponents
      })
      components.forEach((component) => {
        const theme = themeIdToThemeMap[component.themeId]
        if (theme) {
          finalComponents.push({ ...component, styleAry: theme.styleAry })
        }
      })
    }
  })

  return {
    themes: finalThemes,
    namespaceToAllMap,
    themeIdToThemeMap
  }
}
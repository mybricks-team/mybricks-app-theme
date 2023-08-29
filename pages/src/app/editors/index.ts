import ThemeEditor from './theme'

export default ({ editConfig, designerRef, context }) => {
  const editorsMap = {
    THEME: ThemeEditor
  }

  let editor
  try {
    editor = editorsMap[editConfig.type.toUpperCase()] || editConfig.render
  } catch (err) {
    console.error(err)
  }

  const editorType = typeof editor

  if (editorType === 'function') {
    return editor({ editConfig, designer: designerRef.current, context })
  }

  if (editConfig === 'object' && typeof editor.render === 'function') {
    return editor
  }

  return
}

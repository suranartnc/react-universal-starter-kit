// TODO: improve accuracy
export default (editorState) => {
  const selection = editorState.getSelection()
  const selectedBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey())

  const characterList = selectedBlock.getCharacterList()

  const selectedOffset = selection.getStartOffset()
  const char = characterList.get(selectedOffset)
  if (char === undefined) {
    return null
  }

  return char.getEntity()
}

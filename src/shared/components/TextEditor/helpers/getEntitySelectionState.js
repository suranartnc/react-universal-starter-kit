/**
 * Solution from
 * https://github.com/facebook/draft-js/issues/182#issuecomment-223608572 *
 */
import { SelectionState } from 'draft-js'
import getRangesForDraftEntity from 'draft-js/lib/getRangesForDraftEntity'

export default (editorState, entityKey) => {
  const selectionState = editorState.getSelection()

  const selectionKey = selectionState.getAnchorKey()
  const selectionOffset = selectionState.getAnchorOffset()

  const contentState = editorState.getCurrentContent()

  const block = contentState.getBlockForKey(selectionKey)
  const blockKey = block.getKey()

  let entitySelection
  getRangesForDraftEntity(block, entityKey).forEach((range) => {
    if (range.start <= selectionOffset && selectionOffset <= range.end) {
      entitySelection = new SelectionState({
        anchorOffset: range.start,
        focusOffset: range.end,
        focusKey: blockKey,
        anchorKey: blockKey,
        isBackward: false,
        hasFocus: selectionState.getHasFocus(),
      })
    }
  })

  return entitySelection
}

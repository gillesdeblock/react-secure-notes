import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createHeadingNode } from '@lexical/rich-text'
import { $createParagraphNode, $getRoot, RootNode } from 'lexical'
import { safeParseEditorState } from '@/types/editor'

export function EditorInitPlugin({ content }: { content?: string }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot()
      root.clear()

      const state = content ? safeParseEditorState(content) : null

      if (!state) {
        appendDefaultContent(root)
        return
      }

      editor.setEditorState(editor.parseEditorState(state))
    })
  }, [editor])

  return null
}

function appendDefaultContent(root: RootNode) {
  root.append($createHeadingNode('h1'))
  root.append($createParagraphNode())
}

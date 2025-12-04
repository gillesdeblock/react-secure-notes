import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot, $parseSerializedNode } from 'lexical'
import { parseEditorState } from '@/lib/lexical'
import { useEffect } from 'react'

export function EditorInitializationPlugin({ content }: { content?: string }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.update(() => {
      try {
        console.log('init editor...')
        $getRoot().clear()
        const contentJSON = parseEditorState(content || '')
        if (contentJSON) {
          $getRoot().append(...contentJSON.root.children.map($parseSerializedNode))
        }
      } catch (error) {
        console.error('failed to initialize editor', error?.toString())
      }
    })
  }, [editor])

  return null
}

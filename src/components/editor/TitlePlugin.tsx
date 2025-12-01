import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createTextNode, $getRoot } from 'lexical'
import { $createTitleNode, TitleNode } from '@/components/editor/TitleNode'

export function TitlePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.update(() => {
      if ($getRoot().getFirstChild()?.getType() === TitleNode.getType()) {
        return
      }
      const node = $createTitleNode()
      if ($getRoot().getChildrenSize() > 0) {
        const el = $getRoot().getFirstChild()
        el?.insertBefore(node)
      } else {
        $getRoot().append(node)
        $getRoot().append($createTextNode())
      }
    })
  }, [editor])

  return null
}

import { useEffect } from 'react'
import { $getRoot } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createTitleNode, TitleNode } from '@/components/editor/TitleNode'

type TitlePluginProps = {
  placeholder?: string
}

export function TitlePlugin({ placeholder }: TitlePluginProps) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.update(() => {
      if ($getRoot().getFirstChild()?.getType() === TitleNode.getType()) {
        return
      }
      if ($getRoot().getChildrenSize() > 0) {
        const el = $getRoot().getFirstChild()
        el?.insertBefore($createTitleNode(undefined, placeholder))
      } else {
        $getRoot().append($createTitleNode(undefined, placeholder))
      }
    })
  }, [editor])

  return null
}

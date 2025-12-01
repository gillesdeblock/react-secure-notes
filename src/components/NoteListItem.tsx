import type { Note } from '@/types'
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { useDispatch } from 'react-redux'
import { setSelectedNote } from '@/reducers/note.slice'
import { cn } from '@/lib/utils'
import { TextNode, type SerializedEditorState } from 'lexical'
import { parseEditorState, findNodeRecursive, isSerializedTextNode } from '@/lib/lexical'
import { TitleNode } from './editor/TitleNode'

type NoteListItemProps = React.ComponentProps<typeof Item> & {
  note: Note
  highlight?: boolean
}

export default function NoteListItem({ note, highlight, className }: NoteListItemProps) {
  const dispatch = useDispatch()
  const onClick = () => dispatch(setSelectedNote(note.id))
  const serializedEditorState = parseEditorState(note.content)

  return (
    <Item
      className={cn(
        'hover:cursor-pointer hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-stone-900 dark:active:bg-stone-800',
        { 'bg-gray-50 dark:bg-stone-900': highlight },
        className,
      )}
      onClick={onClick}
    >
      <ItemContent className="overflow-hidden">
        <ItemTitle>{note.title}</ItemTitle>
        <ItemDescription className="text-ellipsis whitespace-nowrap">
          <NoteListItemSubtitle editorState={serializedEditorState} />
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}

function NoteListItemSubtitle({ editorState }: { editorState?: SerializedEditorState | null }) {
  let description: string = ''

  if (editorState) {
    const { node } = findNodeRecursive(editorState.root, (currentNode, ancestors) => {
      if (currentNode.type !== TextNode.getType()) {
        return false
      }
      if (ancestors[ancestors.length - 1]?.type === TitleNode.getType()) {
        return false
      }
      return true
    })
    if (node && isSerializedTextNode(node)) {
      description = node.text
    }
  }

  return <span>{description}</span>
}

import type { Note } from '@/types'
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { TextNode, type SerializedEditorState } from 'lexical'
import { TitleNode } from './editor/TitleNode'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/hooks'
import { selectNoteById } from '@/reducers/notes.slice'
import { parseEditorState, findNodeRecursive, isSerializedTextNode } from '@/lib/lexical'
import { dateTimeFormat } from '@/lib/date'

type NoteListItemProps = React.ComponentProps<typeof Item> & {
  note: Note
  highlight?: boolean
}

export default function NoteListItem({ note, highlight, className }: NoteListItemProps) {
  const dispatch = useAppDispatch()
  const serializedEditorState = parseEditorState(note.content)
  const onClick = () => dispatch(selectNoteById(note.id))

  return (
    <Item
      className={cn(
        'hover:cursor-pointer hover:bg-blue-400/30 active:bg-blue-400/25 dark:hover:bg-blue-400/40 dark:active:bg-blue-400/45',
        { 'bg-blue-400/20 dark:bg-blue-400/40': highlight },
        className,
      )}
      onClick={onClick}
    >
      <ItemContent className="overflow-hidden">
        <ItemTitle>{note.title || 'New note'}</ItemTitle>
        <ItemDescription className="text-ellipsis whitespace-nowrap">
          <NoteListItemSubtitle updatedAt={note.updatedAt} editorState={serializedEditorState} />
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}

function NoteListItemSubtitle({ updatedAt, editorState }: { updatedAt?: string; editorState?: SerializedEditorState | null }) {
  let datetime: string = ''
  let description: string = ''

  if (updatedAt) {
    datetime = dateTimeFormat(updatedAt) || ''
  }
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

  return (
    <span className="inline-flex gap-1">
      {datetime}
      {datetime && description && <> - </>}
      {description}
    </span>
  )
}

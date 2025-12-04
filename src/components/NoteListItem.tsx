import type { Note } from '@/types'
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/hooks'
import { selectNoteById } from '@/reducers/notes.slice'
import { dateTimeFormat } from '@/lib/date'

type NoteListItemProps = React.ComponentProps<typeof Item> & {
  note: Note
  highlight?: boolean
}

export default function NoteListItem({ note, highlight, className }: NoteListItemProps) {
  const dispatch = useAppDispatch()
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
        <ItemTitle className="font-semibold">{note.title || 'New note'}</ItemTitle>
        <ItemDescription className="text-ellipsis whitespace-nowrap">
          <NoteListItemSubtitle text={note.short} updatedAt={note.updatedAt} />
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}

function NoteListItemSubtitle({ text, updatedAt }: { text?: string; updatedAt?: string }) {
  let datetime: string = ''

  if (updatedAt) {
    datetime = dateTimeFormat(updatedAt) || ''
  }

  return (
    <span className="inline-flex gap-2">
      <span className="font-semibold">{datetime}</span>
      {text}
    </span>
  )
}

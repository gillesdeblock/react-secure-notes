import type { Note } from '@/types'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/hooks'
import { selectNoteById } from '@/reducers/notes.slice'
import { dateTimeFormat } from '@/lib/date'
import { Checkbox } from '@/components/ui/checkbox'

type NoteListItemProps = React.ComponentProps<typeof Item> & {
  note: Note
  highlight?: boolean
  selectable?: boolean
  checked?: boolean
  onCheck?: (checked: boolean) => void
}

export default function NoteListItem({ note, highlight, selectable, className, checked, onCheck }: NoteListItemProps) {
  const dispatch = useAppDispatch()
  const onClick = () => dispatch(selectNoteById(note.id))
  const onClickCheckbox = (e: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (onCheck) onCheck(!checked)
  }

  return (
    <Item
      className={cn(
        'hover:cursor-pointer',
        !highlight && 'hover:bg-primary/30 active:bg-primary/$0',
        highlight && 'bg-primary/40',
        className,
      )}
      onClick={onClick}
    >
      <ItemContent className="overflow-hidden flex-row gap-3">
        {selectable && (
          <ItemActions>
            <Checkbox checked={checked} onClick={onClickCheckbox} className="self-center" />
          </ItemActions>
        )}
        <div className="flex-1">
          <ItemTitle>{note.title || 'New note'}</ItemTitle>
          <ItemDescription className="text-ellipsis whitespace-nowrap">
            <NoteListItemSubtitle text={note.short} updatedAt={note.updatedAt} />
          </ItemDescription>
        </div>
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
      <span>{datetime}</span>
      {text}
    </span>
  )
}

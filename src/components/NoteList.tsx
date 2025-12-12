import React from 'react'
import { type Note as NoteType } from '@/types'
import { Separator } from '@/components/ui/separator'
import NoteListItem from '@/components/NoteListItem'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/hooks'
import { cancelNoteToRemove, addNoteToRemove } from '@/reducers/notes.slice'

type NoteListProps = React.ComponentProps<'div'> & {
  notes: NoteType[]
  selectable: boolean
  removeNoteIds: string[]
  selectedNoteId?: string | null
}

export default function NoteList({ notes = [], selectable, selectedNoteId, removeNoteIds, ...props }: NoteListProps) {
  const dispatch = useAppDispatch()
  const isItemHighlighted = (noteId: string) => selectedNoteId === noteId

  const onSetRemoveNoteState = (id: string, checked: boolean) => {
    if (checked) {
      dispatch(addNoteToRemove(id))
    } else {
      dispatch(cancelNoteToRemove(id))
    }
  }

  return (
    <div className={cn('flex flex-col gap-2 min-w-68 max-w-96', props.className)}>
      {[...notes]
        .sort((a, b) => {
          const ta = a.updatedAt ? Date.parse(a.updatedAt) : 0
          const tb = b.updatedAt ? Date.parse(b.updatedAt) : 0
          const na = Number.isNaN(ta) ? 0 : ta
          const nb = Number.isNaN(tb) ? 0 : tb
          return nb - na
        })
        .map((note, index) => (
          <React.Fragment key={note.id}>
            {index > 0 && <Separator orientation="horizontal" className="ml-3 mr-3 data-[orientation=horizontal]:w-auto" />}
            <NoteListItem
              note={note}
              highlight={isItemHighlighted(note.id)}
              selectable={selectable}
              checked={removeNoteIds.includes(note.id)}
              onCheck={(checked) => onSetRemoveNoteState(note.id, checked)}
            />
          </React.Fragment>
        ))}
    </div>
  )
}

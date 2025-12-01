import React from 'react'
import { type Note as NoteType } from '@/types'
import { Separator } from '@/components/ui/separator'
import NoteListItem from '@/components/NoteListItem'
import { cn } from '@/lib/utils'

type NoteListProps = React.ComponentProps<'div'> & {
  notes: NoteType[]
  selectedNoteId?: string
}

export default function NoteList({ notes = [], selectedNoteId, ...props }: NoteListProps) {
  const itemHighlight = (noteId: string) => selectedNoteId === noteId

  return (
    <div className={cn('flex flex-col gap-2 min-w-68 max-w-96', props.className)}>
      {notes.map((note, index) => (
        <React.Fragment>
          {index > 0 && <Separator orientation="horizontal" className="ml-3 mr-3 data-[orientation=horizontal]:w-auto" />}
          <NoteListItem key={note.id} note={note} highlight={itemHighlight(note.id)} />
        </React.Fragment>
      ))}
    </div>
  )
}

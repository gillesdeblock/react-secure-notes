import type { Note } from '@/types'
import Editor from '@/components/editor/Editor'
import { updateNote } from '@/lib/notes'

type NoteEditProps = React.ComponentProps<'div'> & {
  note: Note
}

export default function NoteEdit({ note, ...props }: NoteEditProps) {
  const onSave = (payload: Partial<Note> | null) => {
    const { title = '', content = '' } = payload || {}
    updateNote(note.id, { title, content })
  }
  return <Editor onSave={onSave} title={note.title} content={note.content} {...props} />
}

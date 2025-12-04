import type { Note } from '@/types'
import Editor from '@/components/editor/Editor'
import { useLazyGetNotesQuery, useUpdateNoteMutation } from '@/reducers/notes.api'
import { toast } from 'sonner'
import { $getRoot, type LexicalEditor } from 'lexical'

type NoteEditProps = React.ComponentProps<'div'> & {
  note: Note
}

export default function NoteEdit({ note, ...props }: NoteEditProps) {
  const [updateNote] = useUpdateNoteMutation()
  const [getNotesLazy] = useLazyGetNotesQuery()

  const onSave = async (editor: LexicalEditor) => {
    try {
      const extracted = extractNoteContent(editor)
      await updateNote({ id: note.id, ...extracted }).unwrap()
      toast.success(<span>Saved note {note.title}.</span>, { richColors: true })
      getNotesLazy()
    } catch (error) {
      toast.error(<span>Failed to save Note {note.title}.</span>, { richColors: true })
    }
  }

  return <Editor key={note.id} onSave={onSave} title={note.title} initialContent={note.content} {...props} />
}

function extractNoteContent(editor: LexicalEditor): Partial<Note> {
  const note: Partial<Note> = {
    title: '',
    content: '',
    short: '',
  }

  editor.read(() => {
    const children = $getRoot().getChildren()
    note.title = children[0]?.getTextContent() ?? null
    note.short = children[1]?.getTextContent() ?? null
    note.content = JSON.stringify(editor.getEditorState().toJSON())
  })

  return note
}

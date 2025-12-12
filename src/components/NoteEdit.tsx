import type { Note } from '@/types'
import Editor from '@/components/editor/Editor'
import { useLazyGetNotesQuery, useUpdateNoteMutation } from '@/reducers/notes.api'
import { toast } from 'sonner'
import { $getRoot, type LexicalEditor } from 'lexical'
import { useSelectSelectedNote } from '@/selectors'

export default function NoteEdit(props: React.ComponentProps<'div'>) {
  const [updateNote] = useUpdateNoteMutation()
  const [getNotesLazy] = useLazyGetNotesQuery()
  const [note] = useSelectSelectedNote()

  const onSave = async (editor: LexicalEditor) => {
    if (!note) {
      return
    }
    try {
      const extracted = extractNoteContent(editor)
      await updateNote({ id: note.id, ...extracted }).unwrap()
      toast.success(<span>Saved note {note.title}.</span>, { richColors: true })
      getNotesLazy()
    } catch (error) {
      toast.error(<span>Failed to save Note {note.title}.</span>, { richColors: true })
    }
  }

  return (
    <div {...props}>
      {note ? (
        <Editor key={note.id} initialContent={note.content} onSave={onSave} {...props} />
      ) : (
        <div className="text-gray-400 select-none p-2">Select a note to get started</div>
      )}
    </div>
  )
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

import http from '@/lib/http'
import type { Note } from '@/types'
import { toast } from 'sonner'

export async function fetchNotes() {
  const result = await http('http://localhost:3000/notes')

  if (!result.ok) {
    toast.error('Failed to fetch notes.', { richColors: true })
    return []
  }

  const notes: Note[] = await result.json()
  return notes
}

export async function updateNote(noteId: string, payload: { title: string; content: string }) {
  const result = await http(`http://localhost:3000/notes/${noteId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!result.ok) {
    toast.error('Failed to save note.', { richColors: true })
    return []
  }

  const note: Note = await result.json()
  return note
}

import type { Note } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const notesApi = createApi({
  reducerPath: 'notesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  endpoints: (build) => ({
    getNotes: build.query<Note[], void>({
      query: () => ({
        url: '/notes',
        credentials: 'include',
      }),
    }),
    getNoteById: build.query<Note, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        credentials: 'include',
      }),
    }),

    createNote: build.mutation<Note, { title?: string; content?: string }>({
      query: ({ title = '', content = '' }) => ({
        method: 'POST',
        url: '/notes',
        body: { title, content },
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }),
    }),
    updateNote: build.mutation<Note, { id: string; title?: string | null; content?: string | null }>({
      query: ({ id, ...patch }) => ({
        method: 'PUT',
        url: `/notes/${id}`,
        body: patch,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }),
    }),
  }),
})

export const { useGetNotesQuery, useGetNoteByIdQuery, useCreateNoteMutation, useUpdateNoteMutation, useLazyGetNotesQuery } = notesApi

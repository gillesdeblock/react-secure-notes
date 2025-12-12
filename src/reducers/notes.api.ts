import type { Note } from '@/types'
import * as z from 'zod'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const schemes = {
  'delete-notes': z.object({ deleted: z.number() }),
}

export const notesApi = createApi({
  reducerPath: 'notesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }),
  endpoints: (build) => ({
    getNotes: build.query<Note[], void>({
      query: () => ({
        url: '/notes',
      }),
    }),
    getNoteById: build.query<Note, string>({
      query: (id) => ({
        url: `/notes/${id}`,
      }),
    }),

    createNote: build.mutation<Note, { title?: string; content?: string; short?: string }>({
      query: ({ title = '', content = '', short = '' }) => ({
        method: 'POST',
        url: '/notes',
        body: { title, content, short },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data, meta } = await queryFulfilled

        if (meta?.response?.ok) {
          dispatch(
            notesApi.util.updateQueryData('getNotes', undefined, (notes) => {
              notes.push(data)
            }),
          )
        }
      },
    }),
    updateNote: build.mutation<Note, { id: string; title?: string | null; content?: string | null; short?: string | null }>({
      query: ({ id, ...patch }) => ({
        method: 'PUT',
        url: `/notes/${id}`,
        body: patch,
      }),
    }),
    removeNotes: build.mutation<z.infer<(typeof schemes)['delete-notes']>, { ids?: string[] }>({
      query: ({ ids = [] }) => ({
        method: 'POST',
        url: `/notes/batch-remove`,
        body: { ids },
      }),
      rawResponseSchema: z.object({ deleted: z.number() }),
    }),
  }),
})

export const {
  useGetNotesQuery,
  useLazyGetNotesQuery,
  useGetNoteByIdQuery,
  useLazyGetNoteByIdQuery,

  useCreateNoteMutation,
  useUpdateNoteMutation,
  useRemoveNotesMutation,
} = notesApi

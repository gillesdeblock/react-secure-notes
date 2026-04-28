import type { User } from '@/types'
import { fetchAuthBaseQuery } from '@/lib/auth'
import { createApi } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchAuthBaseQuery(),
  tagTypes: ['current-user'],
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query: () => ({ url: '/me' }),
      providesTags: ['current-user'],
    }),

    login: build.mutation<void, { email: User['email']; password: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
      invalidatesTags: ['current-user'],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.finally(() => dispatch(authApi.util.resetApiState()))
      },
    }),
    register: build.mutation<void, { email: User['email']; password: string }>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
      invalidatesTags: ['current-user'],
    }),
  }),
})

export const { useGetCurrentUserQuery, useLazyGetCurrentUserQuery, useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi

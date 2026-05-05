import type { User } from '@/types'
import type { AuthTokenResponse } from '@/types/auth'
import { fetchAuthBaseQuery } from '@/lib/auth'
import { createApi } from '@reduxjs/toolkit/query/react'
import { setAccessToken, clearAccessToken } from './auth.slice'

export const authApi = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchAuthBaseQuery(),
  tagTypes: ['current-user'],
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query: () => ({ url: '/me' }),
      providesTags: ['current-user'],
    }),

    login: build.mutation<AuthTokenResponse, { email: User['email']; password: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.finally(() => {
          dispatch(clearAccessToken())
          dispatch(authApi.util.resetApiState())
        })
      },
    }),
    register: build.mutation<AuthTokenResponse, { email: User['email']; password: string }>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    }),
    refresh: build.mutation<AuthTokenResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then((result) => {
          dispatch(setAccessToken(result.data.accessToken))
        })
      },
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRefreshMutation,
} = authApi

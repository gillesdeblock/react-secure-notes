import type { User } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
})

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let res = await baseQuery(args, api, extraOptions)

  if (res.meta?.response?.status !== 401) {
    return res
  }

  const refresh = await baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions)

  if (refresh?.error?.status !== 401) {
    return baseQuery(args, api, extraOptions)
  }

  return res
}

export const authApi = createApi({
  reducerPath: 'authAPI',
  baseQuery: baseQueryWithReauth,
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
    register: build.mutation<User, { email: User['email']; password: string }>({
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

import { fetchBaseQuery, type BaseQueryFn, type FetchBaseQueryError, type FetchBaseQueryMeta } from '@reduxjs/toolkit/query'

type AuthBaseQuery = BaseQueryFn<any, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>

export const withTokenRefresh = (baseQuery: AuthBaseQuery): AuthBaseQuery => {
  return async (args, api, extraOptions) => {
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
}

export const fetchAuthBaseQuery = () =>
  withTokenRefresh(
    fetchBaseQuery({
      baseUrl: import.meta.env.VITE_SECURE_NOTES_API,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }),
  )

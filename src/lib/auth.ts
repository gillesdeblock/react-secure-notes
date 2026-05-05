import { fetchBaseQuery, type BaseQueryFn, type FetchBaseQueryError, type FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import type { RootState } from '@/store'
import type { AuthTokenResponse } from '@/types/auth'
import { setAccessToken } from '@/reducers/auth.slice'

type AuthBaseQuery = BaseQueryFn<any, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>

export const withTokenRefresh = (baseQuery: AuthBaseQuery): AuthBaseQuery => {
  return async (args, api, extraOptions) => {
    const state = api.getState() as RootState
    const accessToken = state.auth.accessToken

    // Inject Authorization header if we have a token
    if (accessToken && typeof args === 'object' && args !== null) {
      args.headers = { ...args.headers, Authorization: `Bearer ${accessToken}` }
    }

    let res = await baseQuery(args, api, extraOptions)

    // Don't refresh if it's already a refresh request
    const isRefreshRequest = typeof args === 'object' && args !== null && args.url === '/auth/refresh'

    if (res.meta?.response?.status !== 401 || isRefreshRequest) {
      return res
    }

    // Token expired, attempt to refresh
    const refreshRes = await baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions)

    if (refreshRes.error?.status === 401) {
      // Refresh failed, return original error
      return res
    }

    if (refreshRes.data) {
      const newAccessToken = (refreshRes.data as AuthTokenResponse).accessToken
      api.dispatch(setAccessToken(newAccessToken))
      args.headers = { ...args.headers, Authorization: `Bearer ${newAccessToken}` }
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

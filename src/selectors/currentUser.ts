import { useSelector } from 'react-redux'
import { authApi } from '@/reducers/auth.api'

export const useCurrentUser = () => useSelector(authApi.endpoints.getCurrentUser.select()).data

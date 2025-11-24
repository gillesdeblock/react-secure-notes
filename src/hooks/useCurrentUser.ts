import http from '@/lib/http'
import { resolveUnauthorized } from '@/lib/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setUser } from '@/reducers/auth.slice'

export default function useCurrentUser({ autoload = true } = {}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentUser, setCurrentUser] = useState(null)

  async function fetchCurrentUser(): Promise<void>
  async function fetchCurrentUser(cancelled: boolean): Promise<void>
  async function fetchCurrentUser(cancelled?: boolean): Promise<void> {
    if (cancelled) {
      return
    }

    const response = await http('http://localhost:3000/me')

    if (!response.ok && response.status === 401) {
      dispatch(setUser(null))
      await resolveUnauthorized(navigate)
      return
    }

    const user = await response.json()
    dispatch(setUser(user))
  }

  if (autoload) {
    useEffect(() => {
      let cancelled = false
      fetchCurrentUser(cancelled)
      return () => {
        cancelled = true
      }
    }, [])
  }

  return {
    currentUser,
    setCurrentUser,
    fetchCurrentUser,
  }
}

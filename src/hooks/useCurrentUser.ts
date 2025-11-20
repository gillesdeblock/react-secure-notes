import http from '@/lib/http'
import { resolveUnauthorized } from '@/lib/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function useCurrentUser() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)

  async function fetchCurrentUser(cancelled: boolean) {
    console.log('cancelled?', cancelled)
    if (cancelled) {
      return
    }

    const response = await http('http://localhost:3000/me')

    if (!response.ok && response.status === 401) {
      await resolveUnauthorized(navigate)
      return
    }

    const user = await response.json()
    setCurrentUser(user)
  }

  useEffect(() => {
    let cancelled = false
    fetchCurrentUser(cancelled)
    return () => {
      cancelled = true
    }
  }, [])

  return {
    currentUser,
    setCurrentUser,
    fetchCurrentUser,
  }
}

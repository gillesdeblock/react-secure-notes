import type { NavigateFunction } from 'react-router'
import http from './http'

export async function resolveUnauthorized(navigate: NavigateFunction) {
  const response = await http(`${import.meta.env.VITE_SECURE_NOTES_API}/auth/refresh`, { method: 'POST' })

  if (!response.ok) {
    navigate('/login')
  }
}

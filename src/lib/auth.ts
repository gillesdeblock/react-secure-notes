import type { NavigateFunction } from 'react-router'
import http from './http'

export async function resolveUnauthorized(navigate: NavigateFunction) {
  const response = await http('http://localhost:3000/auth/refresh', { method: 'POST' })

  if (!response.ok) {
    navigate('/login')
  }
}

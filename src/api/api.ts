import http from '@/lib/http'

export class Api {
  url: string

  constructor() {
    this.url = 'http://localhost:3000'
  }

  async getCurrentUser() {
    const response = await http('http://localhost:3000/me')
    const user = await response.json()
    return user
  }

  async login(credentials: { email: string; password: string }) {
    const response = await http('http://localhost:3000/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      // TODO
      throw new Error('Login failed...')
    }
  }

  async refreshToken() {
    const response = await http('http://localhost:3000/auth/refresh', { method: 'POST' })
    console.log('refreshToken', response)
  }
}

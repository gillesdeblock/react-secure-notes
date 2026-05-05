import { useGetCurrentUserQuery } from '@/reducers/auth.api'
import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

const PUBLIC_ROUTES = ['/login', '/register']

export function AuthGate({ children }: React.PropsWithChildren) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isLoading, isError } = useGetCurrentUserQuery()

  useEffect(() => {
    if (!isLoading && isError && !PUBLIC_ROUTES.includes(pathname)) {
      navigate('/login')
    }
  }, [isLoading, isError, pathname])

  if (isLoading) {
    return (
      <div className="relative w-full h-full">
        <Loader2Icon size={32} className="absolute top-1/2 left-1/2 -translate-1/2 animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}

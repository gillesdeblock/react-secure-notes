import { useGetCurrentUserQuery } from '@/reducers/auth.api'
import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function AuthGate({ children }: React.PropsWithChildren<any>) {
  const navigate = useNavigate()
  const { isLoading, isError } = useGetCurrentUserQuery()

  useEffect(() => {
    if (!isLoading && isError) {
      navigate('/login')
    }
  }, [isLoading, isError])

  if (isLoading) {
    return (
      <div className="relative w-full h-full">
        <Loader2Icon size={32} className="absolute top-1/2 left-1/2 -translate-1/2 animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}

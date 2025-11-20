import { Button } from '@/components/ui/button'
import useCurrentUser from './hooks/useCurrentUser'

function App() {
  useCurrentUser()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  )
}

export default App

import { ThemeProvider } from '@/providers/ThemeProvider'
import Menu from '@/components/Menu'
import { Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import Login from '@/pages/Login.tsx'
import Register from '@/pages/Register.tsx'
import Dashboard from '@/pages/Dashboard.tsx'
import { AuthGate } from './components/AuthGate'

function App() {
  return (
    <ThemeProvider>
      <AuthGate>
        <div className="flex flex-col h-full">
          <Menu className="w-full h-auto rounded-none" />
          <Routes>
            <Route path="*" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthGate>
      <Toaster position="top-center" />
    </ThemeProvider>
  )
}

export default App

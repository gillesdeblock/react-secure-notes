import { ThemeProvider } from '@/components/ThemeProvider'
import useCurrentUser from '@/hooks/useCurrentUser'
import Menu from '@/components/Menu'
import { Route, Routes } from 'react-router'
import Login from '@/pages/Login.tsx'
import Register from '@/pages/Register.tsx'
import Dashboard from '@/pages/Dashboard.tsx'

function App() {
  useCurrentUser()

  return (
    <ThemeProvider>
      <Menu className="w-full h-auto rounded-none"></Menu>
      <Routes>
        <Route path="*" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App

import { ThemeProvider } from '@/components/ThemeProvider'
import Menu from '@/components/Menu'
import { Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import Login from '@/pages/Login.tsx'
import Register from '@/pages/Register.tsx'
import Dashboard from '@/pages/Dashboard.tsx'

function App() {
  return (
    <ThemeProvider>
      <Menu className="w-full h-auto rounded-none"></Menu>
      <Toaster position="top-center" />
      <Routes>
        <Route path="*" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App

import http from '@/lib/http'
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger, MenubarItem } from '@/components/ui/menubar'
import { Button } from '@/components/ui/button'
import DarkModeToggle from '@/components/DarkModeToggle'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setUser } from '@/reducers/auth.slice'
import { cn } from '@/lib/utils'

export default function Menu({ className, ...props }: React.ComponentProps<typeof Menubar>) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state: { auth: Partial<{ user: Partial<{ email: string }> }> }) => state.auth.user)

  const onLogout = async () => {
    await http('http://localhost:3000/auth/logout', { method: 'POST' })
    dispatch(setUser(null))
    navigate('/login')
  }

  return (
    <Menubar className={cn('p-2', className)} {...props}>
      <MenubarMenu>
        <div className="flex ml-auto items-center gap-2">
          <DarkModeToggle />
          {user && (
            <>
              <MenubarTrigger asChild>
                <Button variant="outline" className="gap-1 hover:cursor-pointer">
                  <span className="material-symbols-outlined">person</span>
                  {user?.email && <span>{user.email}</span>}
                </Button>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={onLogout}>Logout</MenubarItem>
              </MenubarContent>
            </>
          )}
        </div>
      </MenubarMenu>
    </Menubar>
  )
}

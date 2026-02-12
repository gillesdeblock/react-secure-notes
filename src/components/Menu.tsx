import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger, MenubarItem } from '@/components/ui/menubar'
import { useGetCurrentUserQuery, useLogoutMutation } from '@/reducers/auth.api'
import DarkModeToggle from '@/components/DarkModeToggle'
import { notesApi } from '@/reducers/notes.api'
import { useAppDispatch } from '@/hooks'

export default function Menu({ className, ...props }: React.ComponentProps<typeof Menubar>) {
  const { data: user } = useGetCurrentUserQuery()
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()

  const onLogout = () => {
    dispatch(notesApi.util.resetApiState())
    logout()
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

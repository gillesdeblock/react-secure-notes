import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger, MenubarItem } from '@/components/ui/menubar'
import { useGetCurrentUserQuery, useLogoutMutation } from '@/reducers/auth.api'
import DarkModeToggle from '@/components/DarkModeToggle'

export default function Menu({ className, ...props }: React.ComponentProps<typeof Menubar>) {
  const { data: user } = useGetCurrentUserQuery()
  const [logout] = useLogoutMutation()

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
                <MenubarItem onClick={() => logout()}>Logout</MenubarItem>
              </MenubarContent>
            </>
          )}
        </div>
      </MenubarMenu>
    </Menubar>
  )
}

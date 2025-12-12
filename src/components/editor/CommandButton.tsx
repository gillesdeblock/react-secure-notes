import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function CommandButton({
  children,
  className,
  active,
  disabled,
  variant = 'ghost',
  ...props
}: { active?: boolean } & React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={variant}
      className={cn('rounded-none', { 'bg-accent brightness-95 hover:brightness-90': active && !disabled }, className)}
      {...props}
    >
      {children}
    </Button>
  )
}

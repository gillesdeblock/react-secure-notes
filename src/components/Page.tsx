import { cn } from '@/lib/utils'
import type React from 'react'

export default function Page({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex-1 min-h-0', className)} {...props}>
      {children}
    </div>
  )
}

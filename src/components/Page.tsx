import { cn } from '@/lib/utils'
import type React from 'react'

export default function Page(props: React.ComponentProps<'div'>) {
  return <div className={cn('h-full', props.className)}>{props.children}</div>
}

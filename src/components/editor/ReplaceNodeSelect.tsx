import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import type { ReplaceNodeSelectOption } from '@/types/editor'

export type ReplaceNodeSelectProps = {
  triggerLabel?: string
  options: ReplaceNodeSelectOption[]
} & React.ComponentProps<typeof Select>

export function ReplaceNodeSelect({ triggerLabel, options = [], ...props }: ReplaceNodeSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="border-none rounded-none shadow-none min-w-32">{triggerLabel || '...'}</SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.key} value={option.key}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'

export function FontTypeSelect({
  triggerLabel,
  options = [],
  ...props
}: { triggerLabel?: string; options: string[] } & React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <SelectTrigger className="border-none rounded-none shadow-none">{triggerLabel}</SelectTrigger>
      <SelectContent>
        {options.map((font) => (
          <SelectItem key={font} value={font}>
            {font}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

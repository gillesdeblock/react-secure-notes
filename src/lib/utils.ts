import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function uniquePrimitiveArray<T>(array: T[]) {
  return [...new Set(array)]
}

export function appendStyleProperties(style: string | Record<string, string>, props: Record<string, string>) {
  const target = typeof style === 'string' ? objectifyStyleString(style) : style
  return stringifyStyleObject({ ...target, ...props })
}

export function objectifyStyleString(style: string): Record<string, string> {
  return Object.fromEntries(
    style
      .split(';')
      .filter((property) => property?.trim())
      .map((property) => property.split(':').map((s) => s?.trim()))
      .filter(([key, value]) => key?.trim() && value?.trim()),
  )
}

export function stringifyStyleObject(style: Record<string, string>): string {
  return Object.entries(style)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')
}

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function uniquePrimitiveArray<T>(array: T[]) {
  return [...new Set(array)]
}

export function getStyleProperty(style: string, property: string) {
  const regex = new RegExp(`${property}\s*:\s*([^;]+);?`, 'i')
  const matches = style.match(regex)
  return matches?.[1] ? matches[1].trim() : undefined
}

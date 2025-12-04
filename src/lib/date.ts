const DAY_MS = 1000 * 60 * 60 * 24

export const dateTimeFormat = (date: Date | string, locales?: Intl.LocalesArgument) => {
  let unix: number = 0
  const options: Intl.DateTimeFormatOptions = {}

  if (date instanceof Date) {
    unix = date.getTime()
  } else {
    const parsed = Date.parse(date)
    unix = Number.isNaN(parsed) ? 0 : parsed
  }

  if (Date.now() - unix < DAY_MS) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  } else {
    options.dateStyle = 'short'
  }

  return Intl.DateTimeFormat(locales, options).format(unix)
}

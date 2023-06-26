// Copyright (C) 2023 Nethesis S.r.l.
// SPDX-License-Identifier: AGPL-3.0-or-later

import { enGB, it } from 'date-fns/locale'
import { format, utcToZonedTime } from 'date-fns-tz'

/**
 * Format a date expressed in milliseconds to current locale
 *
 */
export function formatDateLoc(date: any, fmt: string) {
  return format(date, fmt, { locale: getLocale() })
}

export const formatInTimeZoneLoc = (date: any, fmt: string, tz: any) => {
  return format(utcToZonedTime(date, tz), fmt, { timeZone: tz, locale: getLocale() })
}

/**
 * Get browser locale (english fallback)
 */
const getLocale = () => {
  let loc = enGB

  if (navigator) {
    const lang = navigator.language.substring(0, 2)
    switch (lang) {
      case 'it':
        loc = it
        break
      // add other supported languages
    }
  }
  return loc
}

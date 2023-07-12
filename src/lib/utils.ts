// Copyright (C) 2023 Nethesis S.r.l.
// SPDX-License-Identifier: AGPL-3.0-or-later

import { nextTick } from 'vue'

/**
 * Sort function to order array elements by a specific property (for array of objects) or by a specific index (for arrays of arrays)
 *
 */
export const sortByProperty = (property: string | number) => {
  return function (a: any, b: any) {
    if (a[property] < b[property]) {
      return -1
    }
    if (a[property] > b[property]) {
      return 1
    }
    return 0
  }
}

/**
 * Set the focus on an element. To set the focus on a custom component, it needs to expose focus() function (see NeTextInput for an example)
 *
 */
export const focusElement = (elementRef: any) => {
  nextTick(() => {
    if (elementRef && elementRef.value) {
      elementRef.value.focus()
    }
  })
}

/**
 * Returns a i18n key for an error returned by Axios
 *
 */
export const getAxiosErrorMessage = (error: any) => {
  if (error.message === 'Network Error') {
    return 'error.network_error'
  }

  if (/^timeout of .+ exceeded$/.test(error.message)) {
    // axios timeout reached
    return 'error.network_timeout'
  }

  if (error.response) {
    switch (error.response.status) {
      case 401:
        return 'error.http_401'
      case 403:
        return 'error.http_403'
      case 404:
        return 'error.http_404'
      case 500:
        return 'error.http_500'
    }
  }
  return 'error.generic_error'
}

/**
 * Format a byte size according to the International Electrotechnical Commission (IEC), using 1024 as multiple factor
 *
 * @param byteSize the number of bytes to format
 * @returns a string representing the byte size with the appropriate unit
 */
export const byteFormat1024 = (byteSize: number) => {
  switch (true) {
    case !byteSize || isNaN(byteSize):
      return '-'
    case byteSize >= 0 && byteSize < 1024:
      return byteSize + ' B'
    case byteSize >= 1024 && byteSize < Math.pow(1024, 2):
      return Math.round((byteSize / 1024) * 100) / 100 + ' KiB'
    case byteSize >= Math.pow(1024, 2) && byteSize < Math.pow(1024, 3):
      return Math.round((byteSize / Math.pow(1024, 2)) * 100) / 100 + ' MiB'
    case byteSize >= Math.pow(1024, 3) && byteSize < Math.pow(1024, 4):
      return Math.round((byteSize / Math.pow(1024, 3)) * 100) / 100 + ' GiB'
    default:
      return Math.round((byteSize / Math.pow(1024, 4)) * 100) / 100 + ' TiB'
  }
}

/**
 * Format a byte size according to the International System of Units (SI), using 1000 as multiple factor
 *
 * @param byteSize the number of bytes to format
 * @returns a string representing the byte size with the appropriate unit
 */
export const byteFormat1000 = (byteSize: number) => {
  switch (true) {
    case !byteSize || isNaN(byteSize):
      return '-'
    case byteSize >= 0 && byteSize < 1000:
      return byteSize + ' B'
    case byteSize >= 1000 && byteSize < Math.pow(1000, 2):
      return Math.round((byteSize / 1000) * 100) / 100 + ' kB'
    case byteSize >= Math.pow(1000, 2) && byteSize < Math.pow(1000, 3):
      return Math.round((byteSize / Math.pow(1000, 2)) * 100) / 100 + ' MB'
    case byteSize >= Math.pow(1000, 3) && byteSize < Math.pow(1000, 4):
      return Math.round((byteSize / Math.pow(1000, 3)) * 100) / 100 + ' GB'
    default:
      return Math.round((byteSize / Math.pow(1000, 4)) * 100) / 100 + ' TB'
  }
}

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

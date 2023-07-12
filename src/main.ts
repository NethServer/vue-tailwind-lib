import type { App } from 'vue'
import {
  NeButton,
  NeTitle,
  NeTextInput,
  NeTextArea,
  NeFormItemLabel,
  NeInlineNotification,
  NeSkeleton,
  NeTabs,
  NeComboBox,
  NeCheckbox,
  NeToggle,
  NeSpinner,
  NeModal,
  NeExpandable
} from '@/components'
import {
  saveToStorage,
  getJsonFromStorage,
  getStringFromStorage,
  deleteFromStorage,
  savePreference,
  getPreference
} from '@/lib/storage'
import {
  sortByProperty,
  focusElement,
  getAxiosErrorMessage,
  byteFormat1000,
  byteFormat1024
} from '@/lib/utils'
import { formatDateLoc, formatInTimeZoneLoc } from '@/lib/dateTime'
import { NeComboboxOption } from './components/NeComboBox.vue'

export default {
  install: (app: App) => {
    app.component('NeButton', NeButton)
    app.component('NeTitle', NeTitle)
    app.component('NeTextInput', NeTextInput)
    app.component('NeTextArea', NeTextArea)
    app.component('NeFormItemLabel', NeFormItemLabel)
    app.component('NeInlineNotification', NeInlineNotification)
    app.component('NeSkeleton', NeSkeleton)
    app.component('NeTabs', NeTabs)
    app.component('NeComboBox', NeComboBox)
    app.component('NeCheckbox', NeCheckbox)
    app.component('NeToggle', NeToggle)
    app.component('NeSpinner', NeSpinner)
    app.component('NeModal', NeModal)
    app.component('NeExpandable', NeExpandable)
  }
}

export {
  NeButton,
  NeTitle,
  NeTextInput,
  NeTextArea,
  NeFormItemLabel,
  NeInlineNotification,
  NeSkeleton,
  NeTabs,
  NeComboBox,
  NeCheckbox,
  NeToggle,
  NeSpinner,
  NeModal,
  NeExpandable
}

// types
export type { NeComboboxOption }

// utils lib
export { sortByProperty, focusElement, getAxiosErrorMessage, byteFormat1024, byteFormat1000 }

// storage lib
export {
  saveToStorage,
  getJsonFromStorage,
  getStringFromStorage,
  deleteFromStorage,
  savePreference,
  getPreference
}

// dateTime lib
export { formatDateLoc, formatInTimeZoneLoc }

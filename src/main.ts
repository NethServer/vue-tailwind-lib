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
  NeModal
} from '@/components'
import {
  saveToStorage,
  getJsonFromStorage,
  getStringFromStorage,
  deleteFromStorage,
  savePreference,
  getPreference
} from '@/lib/storage'
import { sortByProperty, focusElement, getAxiosErrorMessage } from '@/lib/utils'
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
  NeModal
}

// types
export type { NeComboboxOption }

// utils lib
export { sortByProperty, focusElement, getAxiosErrorMessage }

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

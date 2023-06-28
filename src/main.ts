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
  NeToggle
} from '@/components'
import { setStringItem, getStringItem } from '@/lib/storage'
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
  NeToggle
}

// types
export type { NeComboboxOption }

// utils lib
export { sortByProperty, focusElement, getAxiosErrorMessage }

// storage lib
export { setStringItem, getStringItem }

// dateTime lib
export { formatDateLoc, formatInTimeZoneLoc }

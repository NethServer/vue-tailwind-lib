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
  NeComboBox
} from '@/components'
import { setStringItem, getStringItem } from '@/lib/storage'
import { sortByProperty, focusElement, getAxiosErrorMessage } from '@/lib/utils'
import { formatDateLoc, formatInTimeZoneLoc } from '@/lib/dateTime'

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
  NeComboBox
}

// utils lib
export { sortByProperty, focusElement, getAxiosErrorMessage }

// storage lib
export { setStringItem, getStringItem }

// dateTime lib
export { formatDateLoc, formatInTimeZoneLoc }

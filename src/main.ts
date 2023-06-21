import type { App } from 'vue'
import {
  NeButton,
  NeTitle,
  NeTextInput,
  NeTextArea,
  NeFormItemLabel,
  NeInlineNotification,
  NeSkeleton,
  NeTabs
} from '@/components'
import { setStringItem, getStringItem } from '@/lib/storage'
import { sortByProperty, focusElement, getAxiosErrorMessage } from '@/lib/utils'

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
  NeTabs
}

// utils lib
export { sortByProperty, focusElement, getAxiosErrorMessage }

// storage lib
export { setStringItem, getStringItem }

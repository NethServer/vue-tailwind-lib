import type { App } from 'vue'
import { NeButton, NeTitle, NeTextInput, NeTextArea, NeFormItemLabel } from '@/components'
import { setStringItem, getStringItem } from '@/lib/storage'
import { sortByProperty, focusElement } from '@/lib/utils'

export default {
  install: (app: App) => {
    app.component('NeButton', NeButton)
    app.component('NeTitle', NeTitle)
    app.component('NeTextInput', NeTextInput)
    app.component('NeTextArea', NeTextArea)
    app.component('NeFormItemLabel', NeFormItemLabel)
  }
}

export { NeButton, NeTitle, NeTextInput, NeTextArea, NeFormItemLabel }

// utils lib
export { sortByProperty, focusElement }

// storage lib
export { setStringItem, getStringItem }

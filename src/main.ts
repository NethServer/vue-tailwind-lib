import type { App } from 'vue'
import { NeButton, NeTitle, NeTextInput, NeTextArea } from '@/components'
import { setStringItem, getStringItem } from '@/lib/storage'
import { sortByProperty } from '@/lib/utils'

export default {
  install: (app: App) => {
    app.component('NeButton', NeButton)
    app.component('NeTitle', NeTitle)
    app.component('NeTextInput', NeTextInput)
    app.component('NeTextArea', NeTextArea)
  }
}

export { NeButton, NeTitle, NeTextInput, NeTextArea }

// utils lib
export { sortByProperty }

// storage lib
export { setStringItem, getStringItem }

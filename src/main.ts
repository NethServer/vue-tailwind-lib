import type { App } from 'vue'
import { NeButton, NeTitle } from '@/components'
import { setStringItem, getStringItem } from '@/lib/storage'
import { sortByProperty } from '@/lib/utils'

export default {
  install: (app: App) => {
    app.component('NeButton', NeButton)
    app.component('NeTitle', NeTitle)
  }
}

export { NeButton, NeTitle }

// utils lib
export { sortByProperty }

// storage lib
export { setStringItem, getStringItem }

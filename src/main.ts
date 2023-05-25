import type { App } from 'vue'
import { NeButton, NeTitle, NeTextInput } from '@/components'
import { setStringItem, getStringItem } from '@/lib/storage'
import { sortByProperty } from '@/lib/utils'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' ////
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret as fasUserSecret } from '@fortawesome/free-solid-svg-icons' ////

export default {
  install: (app: App) => {
    app.component('NeButton', NeButton)
    app.component('NeTitle', NeTitle)
    app.component('NeTextInput', NeTextInput)
    // app.component('font-awesome-icon', FontAwesomeIcon) ////
  }
}

// library.add(fasUserSecret) ////

export { NeButton, NeTitle, NeTextInput }

// utils lib
export { sortByProperty }

// storage lib
export { setStringItem, getStringItem }

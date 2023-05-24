import type { Preview } from '@storybook/vue3'
import { h, ref } from 'vue'

import '../src/style.css'
import './storybook.css'

const withThemeProvider = (storyFn, context) => {
  const story = storyFn()

  // const theme = ref(context.globals.theme) ////

  return () => {
    // return h('div', { class: theme }, [ ////
    //   h('div', { class: 'story-wrapper bg-gray-100 dark:bg-gray-800 p-12' }, [
    //     h(story, { ...context.args })
    //   ])
    // ])

    // return h('div', { class: ['story-wrapper bg-gray-100 dark:bg-gray-800 p-12', theme] }, [ ////
    //   h(story, { ...context.args })
    // ])

    // return h('div', { class: ['story-wrapper', 'bg-gray-100', 'dark:bg-gray-800', 'p-12'] }, [
    //   h(story, { ...context.args })
    // ])

    // return h('div', { class: theme }, [h(story, { ...context.args })]) ////

    // return h(story, { class: theme, ...context.args }, [context.globals.theme]) ////

    return h('div', [
      h(story, { ...context.args }),
      h(
        'button',
        {
          onClick: () => {
            // check current theme
            if (document.documentElement.classList.contains('dark')) {
              // switch to light theme
              document.documentElement.classList.remove('dark')
            } else {
              // switch to dark theme
              document.documentElement.classList.add('dark')
            }
          },
          class: 'toggle-theme-button'
        },
        'Toggle dark theme'
      )
    ])
  }
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  // globalTypes: { ////
  //   theme: {
  //     description: 'Global theme for components',
  //     defaultValue: 'light',
  //     toolbar: {
  //       title: 'Theme',
  //       icon: 'mirror',
  //       items: [
  //         { value: 'light', title: 'Light' },
  //         { value: 'dark', title: 'Dark' }
  //       ],
  //       dynamicTitle: false
  //     }
  //   }
  // },
  decorators: [withThemeProvider]
}

export default preview

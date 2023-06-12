import type { Preview } from '@storybook/vue3'
import { h, ref } from 'vue'

import '../src/style.css'
import './storybook.css'

const withThemeProvider = (storyFn, context) => {
  const story = storyFn()

  return () => {
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
  decorators: [withThemeProvider]
}

export default preview

//  Copyright (C) 2023 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import type { Meta, StoryObj } from '@storybook/vue3'

import NeInlineNotification from '../components/NeInlineNotification.vue'

const meta = {
  title: 'NeInlineNotification',
  component: NeInlineNotification,
  tags: ['autodocs'],
  argTypes: {
    kind: { control: 'inline-radio', options: ['info', 'warning', 'error', 'success'] }
  },
  args: {
    kind: 'info',
    title: 'Title',
    description: 'This is a sample description',
    showCloseButton: false
  } // default values
} satisfies Meta<typeof NeInlineNotification>

export default meta
type Story = StoryObj<typeof meta>

const template = '<NeInlineNotification v-bind="args" class="max-w-3xl" />'

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Info: Story = {
  render: (args) => ({
    components: { NeInlineNotification },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {
    kind: 'info'
  }
}

export const Warning: Story = {
  render: (args) => ({
    components: { NeInlineNotification },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {
    kind: 'warning'
  }
}

export const Error: Story = {
  render: (args) => ({
    components: { NeInlineNotification },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {
    kind: 'error'
  }
}

export const Success: Story = {
  render: (args) => ({
    components: { NeInlineNotification },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {
    kind: 'success'
  }
}

export const WithCloseIcon: Story = {
  render: (args) => ({
    components: { NeInlineNotification },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {
    showCloseButton: true
  }
}

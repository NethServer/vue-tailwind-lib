//  Copyright (C) 2023 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import type { Meta, StoryObj } from '@storybook/vue3'

import NeSkeleton from '../components/NeSkeleton.vue'

const meta = {
  title: 'NeSkeleton',
  component: NeSkeleton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] }
  },
  args: { size: 'md', lines: 1 } // default values
} satisfies Meta<typeof NeSkeleton>

export default meta
type Story = StoryObj<typeof meta>

const template = '<NeSkeleton v-bind="args" class="max-w-md"></NeSkeleton>'

export const SingleLine: Story = {
  render: (args) => ({
    components: { NeSkeleton },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {}
}

export const Paragraph: Story = {
  render: (args) => ({
    components: { NeSkeleton },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {
    lines: 10
  }
}

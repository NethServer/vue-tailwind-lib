//  Copyright (C) 2023 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import type { Meta, StoryObj } from '@storybook/vue3'

import NeToggle from '../components/NeToggle.vue'

const meta = {
  title: 'NeToggle',
  component: NeToggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] }
  },
  // default values
  args: {
    label: 'Label',
    size: 'md',
    disabled: false,
    modelValue: true
  }
} satisfies Meta<typeof NeToggle>

export default meta
type Story = StoryObj<typeof meta>

const template = '<NeToggle v-bind="args" />'

export const Default: Story = {
  render: (args) => ({
    components: { NeToggle },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {}
}

export const Small: Story = {
  render: (args) => ({
    components: { NeToggle },
    setup() {
      return { args }
    },
    template: template
  }),
  args: { size: 'sm' }
}

export const Large: Story = {
  render: (args) => ({
    components: { NeToggle },
    setup() {
      return { args }
    },
    template: template
  }),
  args: { size: 'lg' }
}

export const Disabled: Story = {
  render: (args) => ({
    components: { NeToggle },
    setup() {
      return { args }
    },
    template: template
  }),
  args: { disabled: true }
}

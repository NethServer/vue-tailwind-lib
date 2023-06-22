//  Copyright (C) 2023 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import type { Meta, StoryObj } from '@storybook/vue3'

import NeComboBox from '../components/NeComboBox.vue'

const meta = {
  title: 'NeComboBox',
  component: NeComboBox,
  tags: ['autodocs'],
  args: {
    label: 'Choose fruit',
    placeholder: 'Placeholder',
    clearable: true,
    maxOptionsShown: 30,
    noResultsLabel: 'No results',
    limitedOptionsLabel: 'Continue typing to show more options',
    modelValue: '',
    options: [
      { id: '1', label: 'Cherry' },
      { id: '2', label: 'Apple' },
      { id: '3', label: 'Banana' },
      { id: '4', label: 'Avocado', disabled: true },
      { id: '5', label: 'Peach' }
    ]
  } // default values
} satisfies Meta<typeof NeComboBox>

export default meta
type Story = StoryObj<typeof meta>

const template = '<NeComboBox v-bind="args" class="max-w-md" />'

export const Default: Story = {
  render: (args) => ({
    components: { NeComboBox },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {}
}

let manyOptions: any = []

for (let i = 0; i < 150; i++) {
  manyOptions.push({ id: i.toString(), label: `Option ${i}` })
}

export const ManyOptions: Story = {
  render: (args) => ({
    components: { NeComboBox },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {
    options: manyOptions
  }
}

export const NotClearable: Story = {
  render: (args) => ({
    components: { NeComboBox },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {
    clearable: false
  }
}
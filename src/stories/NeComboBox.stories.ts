//  Copyright (C) 2023 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import type { Meta, StoryObj } from '@storybook/vue3'

import NeComboBox from '../components/NeComboBox.vue'

const meta = {
  title: 'NeComboBox',
  component: NeComboBox,
  tags: ['autodocs'],
  args: {
    options: [
      { id: '1', label: 'Cherry' },
      { id: '2', label: 'Apple' },
      { id: '3', label: 'Banana' },
      { id: '4', label: 'Peach' }
    ],
    label: 'Choose fruit',
    selected: '',
    placeholder: 'Placeholder',
    noResultsLabel: 'No results',
    modelValue: ''
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

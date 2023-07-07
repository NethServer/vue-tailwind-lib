//  Copyright (C) 2023 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import type { Meta, StoryObj } from '@storybook/vue3'

import NeModal from '../components/NeModal.vue'

const meta = {
  title: 'NeModal',
  component: NeModal,
  argTypes: {
    kind: { control: 'inline-radio', options: ['neutral', 'info', 'warning', 'error', 'success'] }
  },
  args: {
    visible: true,
    title: 'Title',
    kind: 'neutral',
    primaryLabel: 'Primary',
    secondaryLabel: '',
    cancelLabel: 'Cancel',
    primaryButtonKind: 'primary',
    primaryButtonDisabled: false,
    primaryButtonLoading: false,
    secondaryButtonDisabled: false,
    secondaryButtonLoading: false,
    closeAriaLabel: 'Close'
  } // default values
} satisfies Meta<typeof NeModal>

export default meta
type Story = StoryObj<typeof meta>

const template =
  '<NeModal v-bind="args">\
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>\
  </NeModal>'

export const Neutral: Story = {
  render: (args) => ({
    components: { NeModal },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {}
}

export const Info: Story = {
  render: (args) => ({
    components: { NeModal },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {
    kind: 'info'
  }
}

const warningTemplate =
  '<NeModal v-bind="args">\
  <p>Delete user <strong>John Doe?</strong> This action cannot be undone</p>\
  </NeModal>'

export const Warning: Story = {
  render: (args) => ({
    components: { NeModal },
    setup() {
      return { args }
    },
    template: warningTemplate
  }),
  args: {
    kind: 'warning',
    primaryLabel: 'Delete',
    primaryButtonKind: 'danger'
  }
}

export const Error: Story = {
  render: (args) => ({
    components: { NeModal },
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
    components: { NeModal },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {
    kind: 'success'
  }
}

const singleButtonTemplate =
  '<NeModal v-bind="args">\
  <p>Your system is up to date</p>\
  </NeModal>'

export const SingleButton: Story = {
  render: (args) => ({
    components: { NeModal },
    setup() {
      return { args }
    },
    template: singleButtonTemplate
  }),
  args: {
    title: 'System updates',
    primaryLabel: 'Got it',
    cancelLabel: ''
  }
}

export const ThreeButtons: Story = {
  render: (args) => ({
    components: { NeModal },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {
    primaryLabel: 'Primary',
    secondaryLabel: 'Secondary'
  }
}

export const PrimaryLoading: Story = {
  render: (args) => ({
    components: { NeModal },
    setup() {
      return { args }
    },
    template: template
  }),
  args: {
    primaryLabel: 'Save',
    primaryButtonLoading: true,
    primaryButtonDisabled: true
  }
}
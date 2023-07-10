<!--
  Copyright (C) 2023 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts" setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { faXmark as fasXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo as fasCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { faTriangleExclamation as fasTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck as fasCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark as fasCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import NeButton from './NeButton.vue'

type ModalKind = 'neutral' | 'info' | 'warning' | 'error' | 'success'
type PrimaryButtonKind = 'primary' | 'danger'

interface ModalProps {
  visible: boolean
  title?: string
  kind?: ModalKind
  primaryLabel: string
  secondaryLabel?: string
  cancelLabel?: string
  primaryButtonKind?: PrimaryButtonKind
  primaryButtonDisabled?: boolean
  primaryButtonLoading?: boolean
  secondaryButtonDisabled?: boolean
  secondaryButtonLoading?: boolean
  closeAriaLabel?: string
}

withDefaults(defineProps<ModalProps>(), {
  visible: false,
  title: '',
  kind: 'neutral',
  primaryLabel: '',
  secondaryLabel: '',
  cancelLabel: 'Cancel',
  primaryButtonKind: 'primary',
  primaryButtonDisabled: false,
  primaryButtonLoading: false,
  secondaryButtonDisabled: false,
  secondaryButtonLoading: false,
  closeAriaLabel: 'Close'
})

const emit = defineEmits(['close', 'primaryClick', 'secondaryClick'])

// add fontawesome icons
library.add(fasXmark)
library.add(fasCircleInfo)
library.add(fasTriangleExclamation)
library.add(fasCircleCheck)
library.add(fasCircleXmark)

const iconName: Record<ModalKind, string> = {
  neutral: '',
  info: 'circle-info',
  warning: 'triangle-exclamation',
  error: 'circle-xmark',
  success: 'circle-check'
}

const iconBackground: Record<ModalKind, string> = {
  neutral: '',
  info: 'bg-indigo-100 dark:bg-indigo-800',
  warning: 'bg-amber-100 dark:bg-amber-800',
  error: 'bg-rose-100 dark:bg-rose-800',
  success: 'bg-green-100 dark:bg-green-800'
}

const iconForeground: Record<ModalKind, string> = {
  neutral: '',
  info: 'text-indigo-700 dark:text-indigo-50',
  warning: 'text-amber-700 dark:text-amber-50',
  error: 'text-rose-700 dark:text-rose-50',
  success: 'text-green-700 dark:text-green-50'
}

function onClose() {
  emit('close')
}

function onPrimaryClick() {
  emit('primaryClick')
}

function onSecondaryClick() {
  emit('secondaryClick')
}
</script>

<template>
  <TransitionRoot as="template" :show="visible">
    <Dialog as="div" class="relative z-[100]" @close="onClose">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 transition-opacity bg-opacity-75 dark:bg-opacity-75 bg-gray-500 dark:bg-gray-700"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-[100] overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 bg-white dark:bg-gray-900"
            >
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md leading-none focus:outline-none focus:ring-2 focus:ring-offset-2 text-gray-600 hover:text-gray-700 focus:ring-primary-500 dark:text-gray-300 dark:hover:text-gray-200 dark:focus:ring-primary-300"
                  @click="onClose"
                >
                  <span class="sr-only">{{ closeAriaLabel }}</span>
                  <font-awesome-icon :icon="['fas', 'xmark']" class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <template v-if="kind !== 'neutral'">
                  <div
                    :class="`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${iconBackground[kind]} mb-3 sm:mb-0 sm:mr-4`"
                  >
                    <font-awesome-icon
                      :icon="['fas', iconName[kind]]"
                      aria-hidden="true"
                      :class="`h-5 w-5 ${iconForeground[kind]}`"
                    />
                  </div>
                </template>
                <div class="text-center sm:text-left">
                  <DialogTitle
                    v-if="title"
                    as="h3"
                    class="mb-2 text-base font-semibold leading-6 text-gray-900 dark:text-gray-50"
                    >{{ title }}</DialogTitle
                  >
                  <div>
                    <p class="text-sm text-gray-700 dark:text-gray-200">
                      <slot />
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <NeButton
                  :kind="primaryButtonKind"
                  @click="onPrimaryClick"
                  :disabled="primaryButtonDisabled"
                  :loading="primaryButtonLoading"
                  class="sm:ml-3 w-full sm:w-auto"
                  >{{ primaryLabel }}</NeButton
                >
                <NeButton
                  v-if="secondaryLabel"
                  kind="secondary"
                  @click="onSecondaryClick"
                  :disabled="secondaryButtonDisabled"
                  :loading="secondaryButtonLoading"
                  class="sm:ml-3 mt-3 sm:mt-0 w-full sm:w-auto"
                  >{{ secondaryLabel }}</NeButton
                >
                <NeButton
                  v-if="cancelLabel"
                  kind="tertiary"
                  @click="onClose"
                  class="mt-3 sm:mt-0 w-full sm:w-auto"
                  >{{ cancelLabel }}</NeButton
                >
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

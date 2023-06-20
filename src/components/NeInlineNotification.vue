<!--
  Copyright (C) 2023 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { type PropType } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleInfo as fasCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { faTriangleExclamation as fasTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark as fasCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck as fasCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faXmark as fasXmark } from '@fortawesome/free-solid-svg-icons'

type NotificationKind = 'info' | 'warning' | 'error' | 'success'

const props = defineProps({
  kind: {
    type: String as PropType<NotificationKind>
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  showCloseButton: {
    type: Boolean,
    default: false
  },
  closeAriaLabel: { type: String, default: 'Dismiss' }
})

// add fontawesome icons
library.add(fasCircleInfo)
library.add(fasTriangleExclamation)
library.add(fasCircleXmark)
library.add(fasCircleCheck)
library.add(fasXmark)

const containerKindStyle: { [index: string]: string } = {
  info: 'border-indigo-500 bg-indigo-100 dark:border-indigo-600 dark:bg-indigo-200',
  warning: 'border-amber-500 bg-amber-100 dark:border-amber-600 dark:bg-amber-200',
  error: 'border-rose-500 bg-rose-100 dark:border-rose-600 dark:bg-rose-200',
  success: 'border-green-500 bg-green-100 dark:border-green-600 dark:bg-green-200'
}

const iconName: { [index: string]: string } = {
  info: 'circle-info',
  warning: 'triangle-exclamation',
  error: 'circle-xmark',
  success: 'circle-check'
}

const iconKindStyle: { [index: string]: string } = {
  info: 'text-indigo-700 dark:text-indigo-800',
  warning: 'text-amber-700 dark:text-amber-800',
  error: 'text-rose-700 dark:text-rose-800',
  success: 'text-green-700 dark:text-green-800'
}

const titleKindStyle: { [index: string]: string } = {
  info: 'text-indigo-800 dark:text-indigo-900',
  warning: 'text-amber-800 dark:text-amber-900',
  error: 'text-rose-800 dark:text-rose-900',
  success: 'text-green-800 dark:text-green-900'
}

const descriptionKindStyle: { [index: string]: string } = {
  info: 'text-indigo-700 dark:text-indigo-800',
  warning: 'text-amber-700 dark:text-amber-800',
  error: 'text-rose-700 dark:text-rose-800',
  success: 'text-green-700 dark:text-green-800'
}

const closeIconKindStyle: { [index: string]: string } = {
  info: 'text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-600 focus:ring-offset-indigo-100',
  warning: 'text-amber-700 hover:bg-amber-200 focus:ring-amber-600 focus:ring-offset-amber-100',
  error: 'text-rose-700 hover:bg-rose-200 focus:ring-rose-600 focus:ring-offset-rose-100',
  success: 'text-green-700 hover:bg-green-200 focus:ring-green-600 focus:ring-offset-green-100'
}
</script>

<template>
  <div :class="`rounded-md border-l-4 p-4 ${containerKindStyle[props.kind as string]}`">
    <div class="flex">
      <div class="flex-shrink-0">
        <font-awesome-icon
          :icon="['fas', iconName[props.kind as string]]"
          :class="`h-4 w-4 ${iconKindStyle[props.kind as string]}`"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3
          v-if="props.title"
          :class="`text-sm font-medium ${titleKindStyle[props.kind as string]}`"
          v-html="title"
        ></h3>
        <div
          v-if="props.description"
          :class="`mt-2 text-sm ${descriptionKindStyle[props.kind as string]}`"
        >
          <p v-html="props.description"></p>
        </div>
      </div>
      <div v-if="props.showCloseButton" class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            :class="`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2  ${closeIconKindStyle[props.kind as string]}`"
          >
            <span class="sr-only">{{ props.closeAriaLabel }}</span>
            <font-awesome-icon :icon="['fas', 'xmark']" class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

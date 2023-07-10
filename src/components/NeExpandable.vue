<!--
  Copyright (C) 2023 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown as fasChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp as fasChevronUp } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  expanded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['setExpanded'])

// add fontawesome icons
library.add(fasChevronDown)
library.add(fasChevronUp)

function toggleExpanded() {
  emit('setExpanded', !props.expanded)
}
</script>

<template>
  <div>
    <button
      @click="toggleExpanded"
      class="text-sm font-medium rounded w-full flex items-center justify-between px-2 py-1 border-b border-gray-300 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-50"
    >
      <span>{{ title }}</span>
      <font-awesome-icon
        :icon="['fas', expanded ? 'chevron-up' : 'chevron-down']"
        class="h-4 w-4 shrink-0 text-gray-700 dark:text-gray-200"
        aria-hidden="true"
      />
    </button>
    <Transition name="slide-down">
      <div v-show="expanded" class="text-sm text-gray-700 dark:text-gray-200">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

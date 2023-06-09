<!--
  Copyright (C) 2023 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { computed } from 'vue'
import { uid } from 'uid/single'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleExclamation as fasCircleExclamation } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  label: {
    type: String
  },
  rows: {
    type: Number,
    default: 4
  },
  modelValue: {
    type: String
  },
  id: {
    type: String
  },
  placeholder: {
    type: String
  },
  helperText: {
    type: String
  },
  invalidMessage: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])

// add fontawesome icons
library.add(fasCircleExclamation)

const textAreaBaseStyle =
  'block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 bg-white placeholder:text-gray-400 transition-colors duration-200 dark:text-gray-50 dark:bg-gray-950 dark:placeholder:text-gray-500'
const textAreaValidStyle =
  'ring-gray-300 focus:ring-primary-600 dark:ring-gray-600 dark:focus:ring-primary-300'
const textAreaInvalidStyle =
  'pr-10 ring-rose-300 focus:ring-rose-500 ring-rose-700 focus:ring-rose-500'

const descriptionBaseStyle = 'mt-2 text-sm'

const componentId = computed(() => (props.id ? props.id : uid()))

const textAreaStyles = computed(() =>
  [textAreaBaseStyle, props.invalidMessage ? textAreaInvalidStyle : textAreaValidStyle].join(' ')
)

function emitModelValue(ev) {
  emit('update:modelValue', ev.target.value)
}
</script>

<template>
  <div>
    <label
      :for="componentId"
      class="block text-sm font-medium leading-6 text-gray-700 dark:text-gray-200"
      >{{ label }}</label
    >
    <div class="relative mt-2 rounded-md shadow-sm">
      <textarea
        :value="modelValue"
        @input="($event) => emitModelValue($event)"
        :rows="rows"
        :id="componentId"
        :placeholder="placeholder"
        :aria-describedby="componentId + '-description'"
        v-bind="$attrs"
        :class="textAreaStyles"
      />
      <!-- invalid icon -->
      <div v-if="invalidMessage" class="pointer-events-none absolute inset-y-0 right-0 pt-2 pr-3">
        <font-awesome-icon
          :icon="['fas', 'circle-exclamation']"
          class="h-4 w-4 text-rose-700 dark:text-rose-400"
          aria-hidden="true"
        />
      </div>
    </div>
    <!-- invalid message -->
    <p
      v-if="invalidMessage"
      :class="[descriptionBaseStyle, 'text-rose-700 dark:text-rose-400']"
      :id="componentId + '-description'"
    >
      {{ invalidMessage }}
    </p>
    <!-- helper text -->
    <p
      v-else-if="helperText"
      :class="[descriptionBaseStyle, 'text-gray-500 dark:text-gray-400']"
      :id="componentId + '-description'"
    >
      {{ helperText }}
    </p>
  </div>
</template>

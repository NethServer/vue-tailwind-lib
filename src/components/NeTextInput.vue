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

const inputBaseStyle =
  'block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 text-gray-900 placeholder:text-gray-400'
const inputValidStyle = 'ring-gray-300 focus:ring-primary-600'
const inputInvalidStyle = 'pr-10 ring-rose-300 focus:ring-rose-500'

const descriptionBaseStyle = 'mt-2 text-sm'

const componentId = computed(() => (props.id ? props.id : uid()))

const inputStyles = computed(() =>
  [inputBaseStyle, props.invalidMessage ? inputInvalidStyle : inputValidStyle].join(' ')
)

function emitModelValue(ev) {
  emit('update:modelValue', ev.target.value)
}
</script>

<template>
  <div>
    <label :for="componentId" class="block text-sm font-medium leading-6 text-gray-700">{{
      label
    }}</label>
    <div class="relative mt-2 rounded-md shadow-sm">
      <input
        type="text"
        :value="modelValue"
        @input="($event) => emitModelValue($event)"
        :id="componentId"
        :class="inputStyles"
        :placeholder="placeholder"
        :aria-describedby="componentId + '-description'"
      />
      <!-- invalid icon -->
      <div
        v-if="invalidMessage"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <font-awesome-icon
          :icon="['fas', 'circle-exclamation']"
          class="h-4 w-4 text-rose-500"
          aria-hidden="true"
        />
      </div>
    </div>
    <!-- invalid message -->
    <p
      v-if="invalidMessage"
      :class="[descriptionBaseStyle, 'text-rose-600']"
      :id="componentId + '-description'"
    >
      {{ invalidMessage }}
    </p>
    <!-- helper text -->
    <p
      v-else-if="helperText"
      :class="[descriptionBaseStyle, 'text-gray-500']"
      :id="componentId + '-description'"
    >
      {{ helperText }}
    </p>
  </div>
</template>

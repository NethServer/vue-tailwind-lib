<!--
  Copyright (C) 2023 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { uid } from 'uid/single'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleExclamation as fasCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faEye as fasEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash as fasEyeSlash } from '@fortawesome/free-solid-svg-icons'

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
  },
  optional: {
    type: Boolean
  },
  isPassword: {
    type: Boolean,
    default: false
  },
  showPasswordLabel: {
    type: String,
    default: 'Show password'
  },
  hidePasswordLabel: {
    type: String,
    default: 'Hide password'
  },
  optionalLabel: {
    type: String,
    default: 'Optional'
  }
})

const emit = defineEmits(['update:modelValue'])

// expose focus function
defineExpose({
  focus
})

defineOptions({
  inheritAttrs: false
})

// add fontawesome icons
library.add(fasCircleExclamation)
library.add(fasEye)
library.add(fasEyeSlash)

const inputBaseStyle =
  'block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mt-0 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 bg-white placeholder:text-gray-400 transition-colors duration-200 dark:text-gray-50 dark:bg-gray-950 dark:placeholder:text-gray-500'
const inputValidStyle =
  'ring-gray-300 focus:ring-primary-500 dark:ring-gray-600 dark:focus:ring-primary-300'
const inputInvalidStyle =
  'pr-10 ring-rose-300 focus:ring-rose-500 ring-rose-700 focus:ring-rose-500'

const descriptionBaseStyle = 'mt-2 text-sm'

let isPasswordVisible = ref(false)

const componentId = computed(() => (props.id ? props.id : uid()))

const inputStyles = computed(() =>
  [inputBaseStyle, props.invalidMessage ? inputInvalidStyle : inputValidStyle].join(' ')
)

const inputRef = ref()

const attrs = useAttrs()

const rootAttrs = computed(() => {
  const allowed = ['class']
  return Object.keys(attrs)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = attrs[key]
      return obj
    }, {})
})

const inputAttrs = computed(() => {
  const notAllowed = ['class']
  return Object.keys(attrs)
    .filter((key) => !notAllowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = attrs[key]
      return obj
    }, {})
})

function emitModelValue(ev) {
  emit('update:modelValue', ev.target.value)
}

function togglePasswordVisible() {
  isPasswordVisible.value = !isPasswordVisible.value
}

function focus() {
  inputRef.value.focus()
}
</script>

<template>
  <div v-bind="rootAttrs">
    <label
      v-if="label"
      :for="componentId"
      class="text-sm font-medium leading-6 mb-2 flex justify-between items-end text-gray-700 dark:text-gray-200"
    >
      <span>{{ label }}</span>
      <span v-if="optional">{{ optionalLabel }}</span>
    </label>
    <div class="relative rounded-md shadow-sm">
      <input
        :type="isPassword && !isPasswordVisible ? 'password' : 'text'"
        :value="modelValue"
        @input="($event) => emitModelValue($event)"
        :id="componentId"
        :class="inputStyles"
        :placeholder="placeholder"
        :aria-describedby="componentId + '-description'"
        v-bind="inputAttrs"
        ref="inputRef"
      />
      <!-- show/hide password toggle -->
      <div v-if="isPassword" class="absolute inset-y-0 right-0 flex items-center">
        <button type="button" @click="togglePasswordVisible" class="px-3 cursor-pointer">
          <span class="sr-only">{{
            isPasswordVisible ? hidePasswordLabel : showPasswordLabel
          }}</span>
          <font-awesome-icon
            :icon="['fas', isPasswordVisible ? 'eye-slash' : 'eye']"
            class="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
      <!-- invalid icon -->
      <div
        v-else-if="invalidMessage"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
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

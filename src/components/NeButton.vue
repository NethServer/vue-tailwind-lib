<!--
  Copyright (C) 2023 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import NeSpinner, { SpinnerColor, SpinnerSize } from './NeSpinner.vue'

export type ButtonKind = 'primary' | 'secondary' | 'tertiary' | 'danger'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const props = defineProps({
  kind: {
    type: String as PropType<ButtonKind>,
    default: 'secondary'
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'md'
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingPosition: {
    type: String as PropType<'prefix' | 'suffix'>,
    default: 'prefix'
  }
})

const baseStyle =
  'font-semibold disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 focus:ring-2 focus:outline-none focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-300'

const sizeStyle: { [index: string]: string } = {
  xs: 'rounded px-2 py-1 text-xs',
  sm: 'rounded px-2 py-1 text-sm',
  md: 'rounded-md px-2.5 py-1.5 text-sm',
  lg: 'rounded-md px-3 py-2 text-sm',
  xl: 'rounded-md px-3.5 py-2.5 text-sm'
}
const kindStyle: { [index: string]: string } = {
  primary:
    'shadow-sm bg-primary-700 text-white hover:bg-primary-800 focus:ring-offset-white dark:bg-primary-500 dark:text-gray-950 dark:hover:bg-primary-300 dark:focus:ring-offset-primary-950',
  secondary:
    'shadow-sm ring-1 text-primary-700 ring-gray-300 hover:bg-gray-200/70 hover:text-primary-800 focus:ring-offset-white dark:text-primary-500 dark:ring-gray-500 dark:hover:bg-gray-600/30 dark:hover:text-primary-500 dark:focus:ring-offset-primary-950',
  tertiary:
    'text-primary-700 hover:text-primary-800 hover:bg-gray-200/70 focus:ring-offset-white dark:text-primary-500 dark:hover:text-primary-500 dark:hover:bg-gray-600/30 dark:focus:ring-offset-primary-950',
  danger:
    'shadow-sm bg-rose-700 text-white hover:bg-rose-800 focus:ring-offset-white dark:bg-rose-600 dark:text-white dark:hover:bg-rose-500 dark:focus:ring-offset-primary-950'
}

const spinnerColorStyle: { [index: string]: SpinnerColor } = {
  primary: 'white',
  secondary: 'primary',
  tertiary: 'primary',
  danger: 'white'
}

const spinnerSizeStyle: { [index: string]: SpinnerSize } = {
  xs: '2.5',
  sm: '3',
  md: '4',
  lg: '4',
  xl: '5'
}

const allStyles = computed(() =>
  [baseStyle, kindStyle[props.kind], sizeStyle[props.size]].join(' ')
)

const loadingPrefix = computed(() => props.loading && props.loadingPosition === 'prefix')
const loadingSuffix = computed(() => props.loading && props.loadingPosition === 'suffix')
</script>

<template>
  <button :class="allStyles">
    <div class="flex items-center justify-center">
      <!-- prefix -->
      <div v-if="$slots.prefix || loadingPrefix" class="mr-2">
        <NeSpinner
          :color="spinnerColorStyle[kind]"
          :size="spinnerSizeStyle[size]"
          v-if="loadingPrefix"
        />
        <slot name="prefix" v-else />
      </div>
      <slot />
      <!-- suffix -->
      <div v-if="$slots.suffix || loadingSuffix" class="ml-2">
        <NeSpinner
          :color="spinnerColorStyle[kind]"
          :size="spinnerSizeStyle[size]"
          v-if="loadingSuffix"
        />
        <slot name="suffix" v-else />
      </div>
    </div>
  </button>
</template>

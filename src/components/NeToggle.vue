<script lang="ts" setup>
import { computed } from 'vue'

interface ToggleProps {
  modelValue?: boolean
  label?: string
  size?: ToggleSize
  disabled?: boolean
}

const props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: false,
  label: '',
  size: 'md',
  disabled: false
})

const emit = defineEmits(['update:modelValue'])
const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

type ToggleSize = 'sm' | 'md' | 'lg'

const defaultLabelClasses = 'w-fit relative flex items-center'
const defaultToggleBackgroundClasses =
  'bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary-500 dark:peer-focus:ring-primary-300 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-primary-600 dark:peer-checked:bg-primary-500'
const defaultToggleBallClasses = 'ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'
const toggleSizeClasses: Record<ToggleSize, string> = {
  lg: 'w-14 h-7 after:top-0.5 after:left-[4px] after:h-6 after:w-6',
  md: 'w-11 h-6 after:top-[2px] after:left-[2px] after:h-5 after:w-5',
  sm: 'w-9 h-5 after:top-[2px] after:left-[2px] after:h-4 after:w-4'
}

const labelClasses = computed(() => {
  return (
    defaultLabelClasses +
    ' ' +
    (props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')
  )
})

const toggleClasses = computed(() => {
  return defaultToggleBackgroundClasses
})

const toggleSize = computed(() => {
  return toggleSizeClasses[props.size]
})

const toggleBallClasses = computed(() => {
  return defaultToggleBallClasses
})
</script>

<template>
  <label :class="labelClasses">
    <input :disabled="disabled" v-model="model" type="checkbox" class="sr-only peer" />
    <span :class="[toggleClasses, toggleSize]"></span>
    <span :class="toggleBallClasses">{{ label }}</span>
  </label>
</template>

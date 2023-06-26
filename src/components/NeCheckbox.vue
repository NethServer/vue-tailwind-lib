<script setup lang="ts">
import { computed } from 'vue'
import { uid } from 'uid/single'

const props = defineProps({
  modelValue: Boolean,
  id: String,
  label: String,
  disableSelectOnLabel: Boolean
})

const emit = defineEmits(['update:modelValue'])

const componentId = computed(() => (props.id ? props.id : uid()))

const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>
<template>
  <div class="relative flex items-start">
    <div class="flex h-6 items-center">
      <input
        class="rounded h-5 w-5 sm:h-4 sm:w-4 text-primary-700 border-gray-300 focus:ring-primary-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-primary-500 dark:border-gray-500 dark:focus:ring-primary-500"
        type="checkbox"
        :id="componentId"
        :aria-describedby="componentId + '-description'"
        v-model="model"
        v-bind="$attrs"
      />
    </div>
    <div class="ml-3 text-sm leading-6">
      <!-- show label prop or default slot -->
      <label
        :for="disableSelectOnLabel ? '' : componentId"
        class="font-medium text-gray-700 dark:text-gray-50"
      >
        <slot>{{ label }}</slot>
      </label>
      <div
        v-if="$slots.description"
        :id="componentId + '-description'"
        class="text-gray-500 dark:text-gray-400"
      >
        <slot name="description" />
      </div>
    </div>
  </div>
</template>

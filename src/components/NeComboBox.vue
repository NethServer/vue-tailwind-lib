<!--
  Copyright (C) 2023 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions
} from '@headlessui/vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown as fasChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faCheck as fasCheck } from '@fortawesome/free-solid-svg-icons'
import { faXmark as fasXmark } from '@fortawesome/free-solid-svg-icons'

export interface Option {
  id: string
  label: string
  disabled?: boolean
}

export interface Props {
  modelValue: string
  options: Option[]
  label?: string
  placeholder?: string
  clearable?: boolean
  // limit the number of options displayed for performance
  maxOptionsShown?: number
  noResultsLabel?: string
  limitedOptionsLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  label: '',
  placeholder: '',
  clearable: true,
  maxOptionsShown: 30,
  noResultsLabel: 'No results',
  limitedOptionsLabel: 'Continue typing to show more options'
})

const emit = defineEmits(['update:modelValue'])

// add fontawesome icons
library.add(fasCheck)
library.add(fasChevronDown)
library.add(fasXmark)

const query = ref('')
const selectedOption = ref(null) as any
const filteredOptions = computed(() => {
  if (!query.value) {
    return getLimitedNumberOfOptions(props.options)
  }

  let results = props.options.filter((option: any) => {
    return option.label.trim().toLowerCase().includes(query.value.trim().toLowerCase())
  })

  if (results.length) {
    results = getLimitedNumberOfOptions(results)
    return results
  } else {
    return [{ id: 'no_results', label: props.noResultsLabel, disabled: true }]
  }
})

watch(selectedOption, () => {
  if (selectedOption.value) {
    emit('update:modelValue', selectedOption.value.id)
  } else {
    emit('update:modelValue', '')
  }
})

onMounted(() => {
  selectOptionFromModelValue()
})

watch(
  () => [props.modelValue],
  () => {
    selectOptionFromModelValue()
  }
)

function getLimitedNumberOfOptions(options: any[]) {
  if (options.length <= props.maxOptionsShown) {
    return options
  }

  // limit number of options
  options = options.slice(0, props.maxOptionsShown)

  // add hint
  options.push({ id: 'limited_options_hint', label: props.limitedOptionsLabel, disabled: true })
  return options
}

function clearSelection() {
  selectedOption.value = null
}

function selectOptionFromModelValue() {
  const optionFound: any = props.options.find((option) => option.id === props.modelValue)

  if (optionFound) {
    selectedOption.value = optionFound
  }
}
</script>

<template>
  <Combobox as="div" v-model="selectedOption" :nullable="props.clearable">
    <ComboboxLabel
      v-if="props.label"
      class="block text-sm font-medium leading-6 text-gray-700 dark:text-gray-200"
      >{{ props.label }}</ComboboxLabel
    >
    <div class="relative mt-2">
      <ComboboxInput
        class="w-full rounded-md border-0 py-1.5 pl-3 pr-10 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 ring-gray-300 dark:ring-gray-600 focus:ring-primary-600 dark:focus:ring-primary-300"
        @change="query = $event.target.value"
        :display-value="(option: any) => option?.label"
        :placeholder="props.placeholder"
        @blur="query = ''"
      />
      <button
        v-if="props.clearable && selectedOption?.id"
        @click="clearSelection"
        class="absolute inset-y-0 right-10 px-1 flex items-center"
      >
        <font-awesome-icon
          :icon="['fas', 'xmark']"
          class="h-4 w-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
        />
      </button>
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md pl-4 pr-3 focus:outline-none text-gray-500 dark:text-gray-400"
      >
        <font-awesome-icon
          :icon="['fas', 'chevron-down']"
          class="h-3 w-3 shrink-0"
          aria-hidden="true"
        />
      </ComboboxButton>

      <ComboboxOptions
        v-if="filteredOptions.length > 0"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm bg-white ring-gray-900/5 dark:bg-gray-950 dark:ring-gray-100/5"
      >
        <ComboboxOption
          v-for="option in filteredOptions"
          :key="option.id"
          :value="option"
          as="template"
          v-slot="{ active, selected }"
          :disabled="option.disabled"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active
                ? 'cursor-pointer bg-primary-600 text-white dark:bg-primary-500 dark:text-gray-950'
                : option.disabled
                ? 'cursor-not-allowed text-gray-500 dark:text-gray-500'
                : 'text-gray-900 dark:text-gray-100'
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ option.label }}
            </span>

            <span
              v-if="selected"
              :class="[
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white dark:text-gray-950' : 'text-primary-600 dark:text-primary-500'
              ]"
            >
              <font-awesome-icon
                :icon="['fas', 'check']"
                class="h-4 w-4 shrink-0"
                aria-hidden="true"
              />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

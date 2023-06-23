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
  helperText?: string
  invalidMessage?: string
  // limit the number of options displayed for performance
  maxOptionsShown?: number
  noResultsLabel?: string
  limitedOptionsLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  label: '',
  placeholder: '',
  helperText: '',
  invalidMessage: '',
  maxOptionsShown: 50,
  noResultsLabel: 'No results',
  limitedOptionsLabel: 'Continue typing to show more options'
})

const emit = defineEmits(['update:modelValue'])

// expose focus function
defineExpose({
  focus
})

// add fontawesome icons
library.add(fasCheck)
library.add(fasChevronDown)

const query = ref('')
const selectedOption = ref(null) as any
const textInputRef = ref()

const inputValidStyle =
  'ring-gray-300 dark:ring-gray-600 focus:ring-primary-600 dark:focus:ring-primary-300'

const inputInvalidStyle = 'ring-rose-300 focus:ring-rose-500 ring-rose-700 focus:ring-rose-500'

const descriptionBaseStyle = 'mt-2 text-sm'

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
  () => props.modelValue,
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

  // add selected item if needed
  if (selectedOption.value) {
    const selectedOptionFound = options.find(
      (option: Option) => option.id === selectedOption.value?.id
    )

    if (!selectedOptionFound) {
      options.unshift(selectedOption.value)
    }
  }
  return options
}

function onBlur() {
  setTimeout(() => {
    query.value = ''
  }, 1000)
}

function selectOptionFromModelValue() {
  const optionFound: any = props.options.find((option) => option.id === props.modelValue)

  if (optionFound) {
    selectedOption.value = optionFound
  }
}

function focus() {
  textInputRef.value.focus()
}
</script>

<template>
  <Combobox as="div" v-model="selectedOption">
    <ComboboxLabel
      v-if="props.label"
      class="block text-sm font-medium leading-6 mb-2 text-gray-700 dark:text-gray-200"
      >{{ props.label }}</ComboboxLabel
    >
    <div class="relative">
      <ComboboxInput
        :class="`${
          props.invalidMessage ? inputInvalidStyle : inputValidStyle
        } w-full rounded-md border-0 py-1.5 pl-3 pr-10 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:opacity-50 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50`"
        @change="query = $event.target.value"
        :display-value="(option: any) => option?.label"
        :placeholder="props.placeholder"
        @blur="onBlur"
        ref="textInputRef"
      />
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
    <!-- invalid message -->
    <p v-if="invalidMessage" :class="[descriptionBaseStyle, 'text-rose-700 dark:text-rose-400']">
      {{ invalidMessage }}
    </p>
    <!-- helper text -->
    <p v-else-if="helperText" :class="[descriptionBaseStyle, 'text-gray-500 dark:text-gray-400']">
      {{ helperText }}
    </p>
  </Combobox>
</template>

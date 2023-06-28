<!--
  Copyright (C) 2023 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

export interface Tab {
  name: string
  label: string
}

export interface Props {
  tabs: Tab[]
  selected?: string
  srSelectTabLabel?: string
  srTabsLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  tabs: () => [],
  selected: '',
  srSelectTabLabel: 'Select a tab',
  srTabsLabel: 'Tabs'
})

let currentTab = ref('')

onMounted(() => {
  selectTabFromSelectedProp()
})

watch(currentTab, () => {
  emit('selectTab', currentTab.value)
})

watch(
  () => [props.selected],
  () => {
    selectTabFromSelectedProp()
  }
)

function selectTabFromSelectedProp() {
  let selectedTab: any

  if (props.selected) {
    selectedTab = props.tabs.find((tab: any) => tab.name === props.selected)
  } else {
    // select first tab
    selectedTab = props.tabs[0]
  }
  currentTab.value = selectedTab.name
}

function selectTab(tabName: any) {
  currentTab.value = tabName
}

const emit = defineEmits(['selectTab'])
</script>

<template>
  <!-- mobile tabs -->
  <div class="sm:hidden">
    <label for="tabs" class="sr-only">{{ srSelectTabLabel }}</label>
    <!-- //// use component for select? -->
    <select
      id="tabs"
      name="tabs"
      v-model="currentTab"
      class="block w-full rounded-md py-2 pl-3 pr-10 text-base sm:text-sm focus:outline-none text-gray-700 bg-white border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:text-gray-50 dark:bg-gray-950 dark:border-gray-700 dark:focus:border-primary-500 dark:focus:ring-primary-500"
    >
      <option
        v-for="tab in props.tabs"
        :key="tab.name"
        :selected="currentTab === tab.name"
        :value="tab.name"
      >
        {{ tab.label }}
      </option>
    </select>
  </div>
  <!-- desktop tabs -->
  <div class="hidden sm:block">
    <div class="border-b border-gray-200 dark:border-gray-700">
      <nav class="-mb-px flex space-x-8" :aria-label="srTabsLabel">
        <a
          v-for="tab in props.tabs"
          :key="tab.name"
          @click="selectTab(tab.name)"
          :class="[
            currentTab === tab.name
              ? 'border-primary-600 text-primary-700 dark:border-primary-400 dark:text-primary-500'
              : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-100',
            'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer'
          ]"
          :aria-current="currentTab === tab.name ? 'page' : undefined"
          >{{ tab.label }}</a
        >
      </nav>
    </div>
  </div>
</template>

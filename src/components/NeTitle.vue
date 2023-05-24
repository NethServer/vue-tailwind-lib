<!--
  Copyright (C) 2023 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, type PropType } from 'vue'

type TitleLevel = 'h1' | 'h2' | 'h3'

const props = defineProps({
  level: {
    type: String as PropType<TitleLevel>,
    default: 'h1'
  }
})

const baseStyle = 'font-medium leading-normal text-gray-900 dark:text-gray-100'

const levelStyle: { [index: string]: string } = {
  h1: 'text-2xl mb-4',
  h2: 'text-lg mb-2',
  h3: 'text-base mb-1.5'
}

const allStyles = computed(() => [baseStyle, levelStyle[props.level]].join(' '))
</script>

<template>
  <div :class="allStyles"><slot></slot></div>
</template>

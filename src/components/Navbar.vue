<script setup lang="ts">
import Logo from './Logo.vue'

import Moon from '/icons/moon.svg?component'
import Sun from '/icons/sun.svg?component'

import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <Logo/>
  <button class="theme" @click="toggleDark()">
    <Moon/>

    <span>{{ isDark ? 'Dark' : 'Light' }}</span>
  </button>
</template>

<style lang="scss">
.theme {
  background: var(--color-text-primary);
}
</style>

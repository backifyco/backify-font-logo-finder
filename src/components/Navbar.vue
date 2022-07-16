<script setup lang="ts">
import Logo from './Logo.vue'

import remixicon from "remixicon/fonts/remixicon.symbol.svg"

import {useDark, useToggle} from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <nav class="container">
    <div class="navbar">
      <Logo class="logo"/>
      <div class="theme" @click="toggleDark()">
        <svg v-if="isDark">
          <use :xlink:href="`${remixicon}#ri-moon-line`"></use>
        </svg>
        <svg v-else>
          <use :xlink:href="`${remixicon}#ri-sun-line`"></use>
        </svg>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

.container {
  @include border(rgba($color-gray-200, $color-fade-2), bottom);

  .navbar {
    @include flex(space-between);
    padding-top: 1rem;
    padding-bottom: 1rem;

    .logo {
      height: 1.5rem;
      width: auto;
    }

    .theme {
      cursor: pointer;

      svg {
        @include size(1.5rem);
        fill: var(--color-text-primary);
      }
    }
  }
}
</style>

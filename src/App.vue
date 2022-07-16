<script setup lang="ts">
import {onMounted, computed, ref} from 'vue'

import Navbar from './components/Navbar.vue'

const logo = ref()
const logoIcon = ref()

const logoSpacing = ref(12)
const spacing = computed(() => logoSpacing.value);

const logoName = ref('Backify')
const name = computed(() => logoName.value);

const fonts = import.meta.glob('@fonts/*.otf')

const filterPath = /[^/]+(?=-)/g
let fontNames: Array<String> = []

for (const path in fonts) {
  const fontName: string = path.match(filterPath)![0]
  fontNames.push(fontName)

  const font = new FontFace(fontName, `url('${path}')`)
  font.load()
  document.fonts.add(font)
}

onMounted(() => {
  logoIcon.value.forEach((l: any) => {
    l.src = "/favicon.svg"
  })
})

function submitLogo() {
  const file = logo.value.files[0]
  const reader = new FileReader()

  reader.onloadend = () => {
    logoIcon.value.forEach((l: any) => {
      l.src = reader.result
    })
  }

  reader.readAsDataURL(file)
}
</script>

<template>
  <Navbar/>

  <div class="container">
    <form>
      <div>
        <input ref="logo" id="logo" type="file" accept=".png,.svg" @change="submitLogo">
        <label for="logo">Upload Logo</label>
      </div>

      <label for="name" class="form-label">Name
        <input id="name" type="text" v-model="logoName">
      </label>

      <label for="spacing" class="form-label">Spacing (px)
        <input id="spacing" type="number" min="0" max="36" v-model="logoSpacing">
      </label>
    </form>

    <div class="logos">
      <div v-for="font in fontNames" class="text-block">
        <p class="headline">{{ font }}</p>
        <div class="logo">
          <img class="icon" ref="logoIcon" alt :style="`margin-right: ${spacing}px`">
          <p class="name" :style="`font-family: ${font}`">{{ name }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixins' as *;

form {
  @include flex(center, end, $wrap: wrap);
  gap: 1.5rem;
  padding-top: 2.5rem;

  > * {
    width: 100%;

    @include breakpoint('sm') {
      width: fit-content;
    }

    * {
      width: inherit !important;
    }
  }

  .form-label {
    color: var(--color-text-secondary);
    font-size: $font-size-100;

    input {
      margin-top: 0.5rem;
    }
  }
}

.logos {
  @include flex(start, $wrap: wrap);
  row-gap: 2rem;
  margin: 2.5rem auto;

  .text-block {
    flex-basis: 100%;

    @include breakpoint('sm') {
      flex-basis: 50%;
    }

    @include breakpoint('lg') {
      flex-basis: 33%;
    }

    @include breakpoint('2xl') {
      flex-basis: 25%;
    }

    .headline {
      @include typo(.875rem, $family: $font-family-code, $height: 1.25rem, $align: center);
      color: var(--color-text-secondary);
      margin-bottom: 0.25rem;

      @include breakpoint('sm') {
        text-align: left;
      }
    }

    .logo {
      @include flex(center);

      @include breakpoint('sm') {
        justify-content: start;
      }

      .icon {
        @include size(2rem);
        @include img;
      }

      .name {
        @include typo(1.875rem, $weight: unset, $height: 2.25rem);
        user-select: none;
        color: var(--color-text-primary);
      }
    }
  }
}
</style>

<template>
  <router-link :to="'/show/' + show.slug"
    class="flex bg-white overflow-hidden shadow dark:bg-gray-800 dark:text-white rounded"
  >
    <!-- TODO: simplify this code -->
    <div class="relative w-1/3">
      <div class="aspect-ratio-9-14"></div>
      <img class="absolute left-0 top-0 w-full h-full object-cover" :src="imageUrl">
    </div>

    <div class="w-2/3 px-3 pt-2">
      <h1 class="font-bold text-lg"
        :class="[
          show.metadata.title.length > 35 && 'leading-tight'
        ]"
      >{{ show.metadata.title }}</h1>
      <p class="mt-2 text-sm">
        <i18n-t keypath="full-season">
          <template #season>{{ t(`seasons.${show.metadata.season}`) }}</template>
          <template #seasonYear>{{ show.metadata.seasonYear }}</template>
        </i18n-t>
      </p>
    </div>
  </router-link>
</template>

<script setup="props" lang='ts'>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

export default { props: ['show'] }

import placeholderUrl from '../assets/placeholder.jpg'
const imageUrl = ref(props.show.metadata.coverImage || placeholderUrl)
export { imageUrl }

const showName = ref('[Show name]')
export { showName }

const groups = ref(['[Group name]'])
export { groups }

const { t } = useI18n()
export { t }
</script>

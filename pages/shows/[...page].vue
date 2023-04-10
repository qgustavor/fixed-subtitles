<template>
  <div class="container px-6 mx-auto">
    <div class="flex flex-wrap justify-between py-4">
      <h1 class="leading-8 font-bold text-3xl">{{ t('show_list') }}</h1>
      <div class="height-full">
        {{ t('pagination-text', {current: pageNumber + 1, total: pageCount}) }}
        <NuxtLink
          :to="pageNumber > 0 ? localePath('/shows/' + (pageNumber - 1 || '')) : null"
          class="ml-2 p-2"
          :class="[pageNumber < 0 ? 'text-gray-500 dark:text-gray-700' : 'icon-btn']"
        ><Icon name="carbon:arrow-left" class="inline-block" /></NuxtLink>
        <NuxtLink
          :to="pageCount - 1 > pageNumber ? localePath('/shows/' + (pageNumber + 1)) : null"
          class="ml-2 p-2"
          :class="[pageCount - 1 <= pageNumber ? 'text-gray-500 dark:text-gray-700' : 'icon-btn']"
        ><Icon name="carbon:arrow-right" class="inline-block" /></NuxtLink>
      </div>
    </div>

    <div class="flex flex-wrap">
      <div
        v-for="show of shows.slice(pageNumber * showsPerPage, (pageNumber + 1) * showsPerPage)"
        :key="show.slug"
        class="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
      ><Show :show="show" /></div>
    </div>


    <div class="height-full text-center pt-4">
      {{ t('pagination-text', {current: pageNumber + 1, total: pageCount}) }}
      <NuxtLink
        :to="pageNumber > 0 ? localePath('/shows/' + (pageNumber - 1 || '')) : null"
        class="ml-2 p-2"
        :class="[pageNumber < 0 ? 'text-gray-500 dark:text-gray-700' : 'icon-btn']"
      ><Icon name="carbon:arrow-left" class="inline-block" /></NuxtLink>
      <NuxtLink
        :to="pageCount - 1 > pageNumber ? localePath('/shows/' + (pageNumber + 1)) : null"
        class="ml-2 p-2"
        :class="[pageCount - 1 <= pageNumber ? 'text-gray-500 dark:text-gray-700' : 'icon-btn']"
      ><Icon name="carbon:arrow-right" class="inline-block" /></NuxtLink>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const localePath = useLocalePath()

defineProps(['page'])

import { shows } from '~/utils/data-handler.ts'
const showsPerPage = 12

const route = useRoute()
const pageNumber = computed(() => Number(route.params.page || 0))
const pageCount = computed(() => Math.ceil(shows.length / showsPerPage))

const { t } = useI18n()
useHead({ title: t('show_list') })
</script>

<template>
  <Title :page="t('show_list')"></Title>

  <div class="container px-6 mx-auto">
    <div class="flex flex-wrap justify-between py-4">
      <h1 class="leading-8 font-bold text-3xl">{{ t('show_list') }}</h1>
      <div class="height-full">
        {{ t('pagination-text', {current: pageNumber + 1, total: pageCount}) }}
        <component
          :is="pageNumber <= 0 ? 'span' : Link"
          :to="'/shows/' + (pageNumber - 1 || '')"
          class="ml-2 p-2"
          :class="[pageNumber <= 0 ? 'text-gray-500 dark:text-gray-700' : 'icon-btn']"
        ><i-carbon-arrow-left class="inline-block" /></component>
        <component
          :is="pageCount - 1 <= pageNumber ? 'span' : Link"
          :to="'/shows/' + (pageNumber + 1)"
          class="ml-2 p-2"
          :class="[pageCount - 1 <= pageNumber ? 'text-gray-500 dark:text-gray-700' : 'icon-btn']"
        ><i-carbon-arrow-right class="inline-block" /></component>
      </div>
    </div>

    <div class="flex flex-wrap">
      <div
        v-for="show of shows.slice(pageNumber * 24, (pageNumber + 1) * 24)"
        :key="show.slug"
        class="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
      ><Show :show="show" /></div>
    </div>


    <div class="height-full text-center pt-4">
      {{ t('pagination-text', {current: pageNumber + 1, total: pageCount}) }}
      <component
        :is="pageNumber <= 0 ? 'span' : Link"
        :to="'/shows/' + (pageNumber - 1 || '')"
        class="ml-2 p-2"
        :class="[pageNumber <= 0 ? 'text-gray-500 dark:text-gray-700' : 'icon-btn']"
      ><i-carbon-arrow-left class="inline-block" /></component>
      <component
        :is="pageCount - 1 <= pageNumber ? 'span' : Link"
        :to="'/shows/' + (pageNumber + 1)"
        class="ml-2 p-2"
        :class="[pageCount - 1 <= pageNumber ? 'text-gray-500 dark:text-gray-700' : 'icon-btn']"
      ><i-carbon-arrow-right class="inline-block" /></component>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { usePageContext } from '../usePageContext.ts'
const pageContext = usePageContext()
import Link from '../../components/Link.vue'

defineProps(['page'])

import { shows } from '/~/utils/data-handler.ts'

const pageNumber = computed(() => Number(pageContext.routeParams['*'] || 0))
const pageCount = computed(() => Math.ceil(shows.length / 24))

const { t } = useI18n()
</script>

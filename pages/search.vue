<template>
  <div class="container py-5 px-6 mx-auto">    
    <h2 class="text-2xl">{{ title }}</h2>
  
    <ShowTable :shows="filteredShows" />

    <NuxtLink :to="localePath('/shows/')" class="
      block mt-4 px-6 py-4 text-xl text-center font-bold rounded
      border border-neutral-500
      bg-neutral-900 dark:bg-neutral-500 text-neutral-100 dark:text-neural-900
    ">
      {{ $t('index.actions.browse.action', shows.length) }}
    </NuxtLink>
  </div>
</template>

<script setup lang='ts'>
import { shows } from '~/utils/data-handler.ts'
import Fuse from 'fuse.js'
const fuse = new Fuse(shows, {
  keys: ['metadata.title', 'folder']
})

const route = useRoute()
const filteredShows = computed(() => 
  fuse.search(route.query.q, {
    limit: 10
  }).map(e => e.item)
)

const localePath = useLocalePath()

const { t } = useI18n()
const title = computed(() =>
  t('search.title', { query: route.query.q })
)
useHead({ title })
</script>

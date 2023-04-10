<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8" v-if="shows.length">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <div class="min-w-full text-left text-sm font-light border border-neutral-500 flex flex-col">
            <div class="grid grid-cols-2 md:grid-cols-3 bg-neutral-900 dark:bg-neutral-500 text-neutral-100 dark:text-neural-900 uppercase">
              <div class="px-6 py-4">{{ t('show') }}</div>
              <div class="px-6 py-4 hidden md:block text-center">{{ t('season') }}</div>
              <div class="px-6 py-4 text-right">{{ t('last_update') }}</div>
            </div>
            <NuxtLink
              v-for="show of shows"
              class="
                grid grid-cols-2 md:grid-cols-3 border-b border-neutral-500 last-of-type:border-0
                bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-900
                focus:bg-neutral-300 dark:focus:bg-neutral-900
                focus:outline-0
              "
              :to="localePath('/show/' + show.slug)"
              :key="show.slug"
            >
              <div class="whitespace-nowrap px-6 py-4 font-medium">
                {{ show.metadata.title }}
              </div>
              <div class="whitespace-nowrap px-6 py-4 hidden md:block text-center">
                <i18n-t keypath="full-season" scope="global">
                  <template #season>{{ t(`seasons.${show.metadata.season}`) }}</template>
                  <template #seasonYear>{{ show.metadata.seasonYear }}</template>
                </i18n-t>
              </div>
              <div class="whitespace-nowrap px-6 py-4 text-right">{{ d(new Date(show.lastModified * 1000)) }}</div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="dark:text-white text-center text-2xl py-20">
      {{ t('search.not_found') }}
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps(['shows'])
const { t, d } = useI18n()
const localePath = useLocalePath()
</script>

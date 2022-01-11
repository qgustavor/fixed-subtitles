<template>
  <Title />

  <div class="lg:text-center px-6">
    <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-5xl sm:leading-10">
      {{ t('index.headline') }}
    </h3>
    <p class="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
      {{ t('index.description', { totalChangedLines, totalFixedFiles }) }}
    </p>
  </div>

  <div class="container pt-12 pb-6 px-6 mx-auto flex items-center justify-evenly flex-wrap">
    <div class="w-full sm:w-auto lg:w-1/3 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:text-white text-center mb-2">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ t('index.actions.browse.title') }}</div>
        <p class="text-base">
          {{ t('index.actions.browse.description') }}
        </p>
      </div>
      <div class="px-6 pb-5">
        <Link to="/shows/" class="px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded">
          {{ t('index.actions.browse.action') }}
        </Link>
      </div>
    </div>
    <div class="w-full sm:w-auto lg:w-1/3 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:text-white text-center mb-2">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ t('index.actions.report.title') }}</div>
        <p class="text-base">
          {{ t('index.actions.report.description') }}
        </p>
      </div>
      <div class="px-6 pb-5">
        <Link to="/contact" class="px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded">
          {{ t('index.actions.report.action') }}
        </Link>
      </div>
    </div>
  </div>

  <div class="container py-5 px-6 mx-auto">
    <h1 class="py-4 mx-2 leading-8 font-bold text-xl">{{ t('index.latest_updates') }}</h1>
    <div class="flex flex-wrap">
      <div
        v-for="show of lastUpdatedShows"
        :key="show.slug"
        class="p-2 w-full sm:w-1/2 lg:w-1/4"
      ><Show :show="show" /></div>
    </div>
  </div>

  <div class="container py-5 px-6 mx-auto lg:w-2/3">
    <h1 class="py-4 mx-2 leading-8 font-bold text-xl">
      {{ t('index.explainer.title') }}
    </h1>

    <div class="flex items-center border-b pb-10 mb-10 border-gray-400 dark:border-gray-800 sm:flex-row flex-col">
      <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full  bg-gray-800 flex-shrink-0">
        <i-carbon-alarm class="iconify text-4xl sm:text-6xl text-white" />
      </div>
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="dark:text-white text-lg title-font font-medium mb-2">
          {{ t('index.explainer.time') }}
        </h2>
        <p class="leading-relaxed text-base">
          {{ t('index.explainer.time2') }}
        </p>
      </div>
    </div>
    <div class="flex items-center sm:flex-row flex-col">
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="dark:text-white text-lg title-font font-medium mb-2">
          {{ t('index.explainer.opensource') }}
        </h2>
        <p class="leading-relaxed text-base">
          {{ t('index.explainer.opensource2') }}
        </p>
      </div>
      <div class="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-gray-800 flex-shrink-0">
        <i-carbon-group class="iconify text-4xl sm:text-6xl text-white" />
      </div>
    </div>
  </div>

  <div class="container my-5 px-6 mx-auto lg:w-2/3">
    <p class="py-5 border-t pb-10 border-gray-400 dark:border-gray-800">
      <i18n-t keypath="data-source" scope="global">
        <template #totalChangedLines>{{ totalChangedLines }}</template>
        <template #anilist><a class="external-link" href="https://anilist.co/">AniList</a></template>
      </i18n-t>
    </p>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

import { lastUpdatedShows, totalChangedLines, totalFixedFiles } from '/~/utils/data-handler.ts'

const { t } = useI18n()
</script>

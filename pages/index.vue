<template>
  <div class="px-6 text-left flex items-center justify-evenly">
    <div class="py-10 md:py-20">
      <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-5xl sm:leading-10">
        {{ $t('index.headline') }}
      </h3>
      <p class="mt-4 max-w-2xl text-xl leading-7 text-gray-500">
        {{ $t('index.description', { totalChangedLines, totalFixedFiles }) }}
      </p>
    </div>
    <Icon
      name="carbon:text-annotation-toggle"
      class="iconify inline-block text-6xl sm:text-8xl text-green-600 dark:text-green-400 homepage-icon"
    />
  </div>

  <div class="container py-5 px-6 mx-auto">
    <h4 class="mt-2 text-2xl">
      {{ $t('index.latest_updates') }}
    </h4>

    <ShowTable :shows="lastUpdatedShows" />

    <NuxtLink :to="localePath('/shows/')" class="
      block mt-4 px-6 py-4 text-xl text-center font-bold rounded
      border border-neutral-500
      bg-neutral-900 dark:bg-neutral-500 text-neutral-100 dark:text-neural-900
    ">
      {{ $t('index.actions.browse.action', shows.length) }}
    </NuxtLink>
  </div>

  <div class="container my-5 px-6 mx-auto lg:w-2/3">
    <p class="py-5 pb-10">
      <i18n-t keypath="data-source" scope="global">
        <template #totalChangedLines>{{ totalChangedLines }}</template>
        <template #anilist><a class="external-link" href="https://anilist.co/">AniList</a></template>
        <template #github><a class="external-link" href="https://github.com/qgustavor/fixed-subtitles">GitHub</a></template>
      </i18n-t>
    </p>
  </div>
</template>

<script setup lang='ts'>
import { lastUpdatedShows, totalChangedLines, totalFixedFiles, shows } from '~/utils/data-handler.ts'
const localePath = useLocalePath()
</script>

<style>
.homepage-icon {
  filter: drop-shadow(0 0 0.2em currentColor) drop-shadow(0 0 0.6em currentColor);
  min-width: 2em;
}
</style>

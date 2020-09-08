<template>
  <div class="dark:text-white text-center text-2xl py-20" v-if="!show">
    {{ t('not-found') }}
    <div class="text-8xl mt-2">
      <Icon class="iconify inline-block" icon="carbon:document-unknown" />
    </div>
  </div>

  <div class="container px-6 mx-auto flex flex-col md:flex-row" v-if="show">
    <div class="w-full md:w-1/3 lg:w-1/5 mr-6">
      <div class="flex md:flex-col">
        <div class="relative mb-3 w-2/5 md:w-full">
          <div class="aspect-ratio-9-14"></div>
          <img class="absolute left-0 top-0 w-full h-full object-cover" :src="show.metadata.coverImage">
        </div>
        <div class="w-full ml-3 md:ml-0 lg:text-lg">
          <h1 class="leading-8 font-bold text-xl md:hidden">{{ show.metadata.title }}</h1>
          <ol>
            <li>
              <i18n-t keypath="full-season">
                <template #season>{{ t('seasons.' + show.metadata.season) }}</template>
                <template #seasonYear>{{ show.metadata.seasonYear }}</template>
              </i18n-t>
            </li>
            <li>{{ t('episodes', show.metadata.episodes) }}</li>
            <li>{{ t('formats.' + show.metadata.format) }}</li>
          </ol>
        </div>
      </div>
    </div>

    <div class="w-full">
      <h1 class="pb-4 font-bold text-2xl lg:text-3xl hidden md:block">{{ show.metadata.title }}</h1>

      <!-- TODO: show content from README.md if existent -->

      <div v-if="show.groups.length > 1">
        <button
          v-for="group of show.groups"
          class="dark:text-white border-2 py-2 px-4 focus:outline-none rounded text-center mr-2 mb-2"
          :class="[
            selectedGroup && selectedGroup.name === group.name
              ? 'bg-indigo-200 border-indigo-300 dark:bg-indigo-500 dark:border-indigo-400'
              : 'bg-gray-100 hover:bg-gray-200 border-gray-300 dark:bg-gray-900 dark-hover:bg-gray-800 dark:border-gray-700'
          ]"
          @click="selectedGroup = group"
        >{{ group.name }}</button>
      </div>

      <div v-if="!selectedGroup">{{ t('select-group')}}</div>
      <div v-if="selectedGroup">
        <!-- TODO: show group README.md -->
        <div class="pb-2 lg:text-lg">
          <Icon class="iconify group-stat-icon mr-1" icon="carbon:language" />
          {{ t('languages.' + selectedGroup.metadata.language, '?') }}
          <Icon class="iconify group-stat-icon mx-1" icon="carbon:categories" />
          {{ t('file-count', selectedGroup.files.length) }}
          <Icon class="iconify group-stat-icon mx-1" icon="carbon:clean" />
          {{ t('changed-lines-count', selectedGroup.changedLines) }}
          <a :href="downloadUrlAll">
            <Icon class="iconify group-stat-icon mx-1" icon="carbon:download" />
            <span class="external-link">{{ t('download-all') }}</span>
          </a>
        </div>

        <div v-if="selectedGroup.metadata.content" v-html="selectedGroup.metadata.content"></div>

        <table class="text-left w-full border-collapse">
          <thead>
            <tr>
              <th class="p-2 font-bold text-sm">{{ t('group-list.filename') }}</th>
              <th class="p-2 font-bold text-sm text-center">{{ t('group-list.modified') }}</th>
              <th class="p-2 font-bold text-sm text-right">{{ t('group-list.changedLines') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-grey-lighter" v-for="file of selectedGroup.files">
              <td class="p-2"><a :href="getDownloadUrl(file)" class="external-link">{{ file.name }}</a></td>
              <td class="p-2 text-center">{{ d(new Date(file.lastModified * 1000)) }}</td>
              <td class="p-2 text-right">{{ file.changedLines }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

export { shows } from '/~/utils/data-handler.ts'

const route = useRoute()
const show = computed(() => shows.find(e => e.slug === route.params.slug))
export { show }

const defaultGroup = show.value.groups.length === 1 ? show.value.groups[0] : null
const selectedGroup = ref(defaultGroup)
export { selectedGroup }

// TODO: use GitHub Pages instead
export function getDownloadUrl (file) {
  const gitHubUrl = 'https://github.com/qgustavor/fixed-subtitles/blob/master/subtitles/' +
    window.encodeURIComponent(show.value.folder) + '/' +
    window.encodeURIComponent(selectedGroup.value.name) + '/' +
    window.encodeURIComponent(file.name)
  return 'https://minhaskamal.github.io/DownGit/#/home?url=' + window.encodeURIComponent(gitHubUrl)
}

const downloadUrlAll = computed(() => {
  const gitHubUrl = 'https://github.com/qgustavor/fixed-subtitles/blob/master/subtitles/' +
    window.encodeURIComponent(show.value.folder) + '/' +
    window.encodeURIComponent(selectedGroup.value.name)
  return 'https://minhaskamal.github.io/DownGit/#/home?url=' + window.encodeURIComponent(gitHubUrl)
})
export { downloadUrlAll }

const { t, d } = useI18n()
export { t, d }
</script>

<template>
  <Title :page="show && show.metadata.title" />

  <div class="dark:text-white text-center text-2xl py-20" v-if="!show">
    {{ t('not-found') }}
    <div class="text-8xl mt-2">
      <i-carbon-document-unknown class="iconify inline-block" />
    </div>
  </div>

  <div class="container px-6 mx-auto flex flex-col md:flex-row" v-if="show">
    <div class="w-full md:w-1/3 lg:w-1/5 mr-6">
      <div class="flex md:flex-col">
        <div class="relative mb-3 w-2/5 md:w-full">
          <div class="aspect-ratio-9-14" />
          <img class="absolute left-0 top-0 w-full h-full object-cover" :src="show.metadata.coverImage">
        </div>
        <div class="w-full ml-3 md:ml-0 lg:text-lg">
          <h1 class="leading-8 font-bold text-xl md:hidden">{{ show.metadata.title }}</h1>
          <ul>
            <li>
              <i18n-t keypath="full-season" scope="global">
                <template #season>{{ t('seasons.' + show.metadata.season) }}</template>
                <template #seasonYear>{{ show.metadata.seasonYear }}</template>
              </i18n-t>
            </li>
            <li>{{ t('episodes', show.metadata.episodes) }}</li>
            <li>{{ t('formats.' + show.metadata.format) }}</li>
            <li
              v-for="link of show.metadata.externalLinks"
              :key="link.url"
              class="lg:text-md"
            >
              <a
                :href="link.url"
                class="external-link"
                @click="trackExternalLink(link.url)"
              >{{ link.site }}</a>
            </li>
            <li>
              <Link
                to="/contact"
                class="external-link"
              >{{ t('report-error') }}</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="w-full">
      <h1 class="pb-4 font-bold text-2xl lg:text-3xl hidden md:block">{{ show.metadata.title }}</h1>

      <div v-if="show.groups.length > 1">
        <button
          v-for="group of show.groups"
          :key="group.name"
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
        <div class="pb-2 lg:text-lg">
          <i-carbon-language class="iconify group-stat-icon mr-1" />
          {{ t('languages.' + selectedGroup.metadata.language, '?') }}
          <i-carbon-categories class="iconify group-stat-icon mx-1" />
          {{ t('file-count', selectedGroup.files.length) }}
          <i-carbon-clean class="iconify group-stat-icon mx-1" />
          {{ t('changed-lines-count', selectedGroup.changedLines) }}
          <a
            v-if="selectedGroup.commits.length === 1"
            :href="'https://github.com/qgustavor/fixed-subtitles/commit/' + selectedGroup.commits[0][0]"
            target="_blank"
          >
            <i-carbon-edit class="iconify group-stat-icon mx-1" />
            <span class="external-link">{{ t('commit-count', selectedGroup.commits.length) }}</span>
          </a>
          <button
            v-if="selectedGroup.commits.length > 1"
            @click="openedCommits = selectedGroup.commits"
          >
            <i-carbon-edit class="iconify group-stat-icon mx-1" />
            <span class="external-link">{{ t('commit-count', selectedGroup.commits.length) }}</span>
          </button>
          <button @click="downloadFile()" v-if="selectedGroup.files.length > 1">
            <i-carbon-download class="iconify group-stat-icon mx-1" />
            <span class="external-link">{{ t('download-all') }}</span>
          </button>
        </div>

        <div
          v-if="selectedGroup.metadata.content"
          v-html="selectedGroup.metadata.content"
          class="group-info"
        />

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
              <td class="p-2">
                <button @click="downloadFile(file)" class="external-link text-left">{{ file.name }}</button>
              </td>
              <td class="p-2 text-center">{{ d(new Date(file.lastModified * 1000)) }}</td>
              <td class="p-2 text-right">{{ file.changedLines }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <DownloadHandler
    v-if="downloadFiles"
    :files="downloadFiles"
    :folder="show.metadata.title"
    @close="downloadFiles = null"
  />

  <CommitList
    v-if="openedCommits"
    :commits="openedCommits"
    @close="openedCommits = null"
  />
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { usePageContext } from '../usePageContext.ts'
const pageContext = usePageContext()

defineProps(['slug'])

import { shows } from '/~/utils/data-handler'
import { track } from '/~/utils/user-stats'

const show = computed(() => shows.find(e => e.slug === pageContext.routeParams.id))

const defaultGroup = show.value && show.value.groups.length === 1 ? show.value.groups[0] : null
const selectedGroup = ref(defaultGroup)

const downloadFiles = ref(null)

function downloadFile (file) {
  const files = file ? [file] : selectedGroup.value.files
  const pathPrefix = window.encodeURIComponent(show.value.folder) +
    '/' + window.encodeURIComponent(selectedGroup.value.name) + '/'
  for (const file of files) file.path = pathPrefix + file.name
  downloadFiles.value = files
}

const openedCommits = ref(null)

function trackExternalLink (key) {
  track({
    id: 'external-link',
    parameters: { key }
  })
}

const { t, d } = useI18n()
</script>

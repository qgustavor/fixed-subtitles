<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
      <div class="fixed inset-0">
        <div class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75" @click.self="$emit('close')"></div>
      </div>

      <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium" id="modal-headline">
                {{ $t('commit-modal.title', commits.length) }}
              </h3>
              <div class="mt-2">
                <p class="text-sm leading-5">
                  {{ $t('commit-modal.explainer', commits.length) }}
                </p>
                <ul class="list-disc list-inside pt-2 text-left">
                  <li v-for="commit of commits" class="text-sm leading-5">
                    <a
                      class="external-link"
                      :href="'https://github.com/qgustavor/fixed-subtitles/commit/' + commit[0]"
                      target="_blank"
                    >
                      {{ commit[0] }}
                    </a> ({{ $t('commit-modal.date', {date: $d(new Date(commit[1] * 1000)) }) }})
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="$emit('close')">
              {{ $t('commit-modal.close') }}
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps([
  'commits'
])
const emit = defineEmits(['close'])
</script>

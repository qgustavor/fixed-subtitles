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
                {{ t('download-modal.title', files.length) }}
              </h3>
              <div class="mt-2" v-if="downloadData.length !== files.length">
                <p class="text-sm leading-5">
                  {{ t('download-modal.in-progress') }}
                </p>
              </div>
              <div class="mt-2" v-else>
                <p class="text-sm leading-5">
                  {{ t('download-modal.fonts', fonts.size) }}
                </p>
                <ul class="list-disc list-inside pt-2 text-left">
                  <li v-for="font of fonts" class="text-sm leading-5">
                    {{ font.name }} ({{ formatVariants(font.variants) }})
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="$emit('close')">
              {{ downloadData.length === files.length ? t('download-modal.close') : t('download-modal.cancel') }}
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'
import { track } from '/~/utils/user-stats'
import { downloadRepoFiles, zipAndDownload } from '/~/utils/download-github.ts'
import { getFontsFromSubtitle } from '/~/utils/subtitle-fonts.ts'

const props = defineProps([
  'files',
  'folder'
])
const emit = defineEmits(['close'])

const downloadData = ref([])
const fonts = ref(new Set())

async function downloadFile (files) {
  if (import.meta.env.MODE !== 'development') {
    track({
      id: 'download',
      parameters: {
        files: files.map(e => e.path)
      }
    })
  }

  for await (const file of downloadRepoFiles(files)) {
    const fileFonts = getFontsFromSubtitle(file.data)
    for (const font of fileFonts) {
      fonts.value.add(font)
    }
    downloadData.value.push(file)
  }
  
  zipAndDownload(downloadData.value, props.folder)
}

onMounted(() => {
  downloadFile(props.files)
})

const { t } = useI18n()

function formatVariants (variants) {
  return variants.reduce((result, variant, index) => {
    return result + t('download-modal.font-variant-' + variant) + (
      index === variants.length - 2
        ? t('download-modal.font-variant-and')
        : index !== variants.length - 1
          ? t('download-modal.font-variant-comma')
          : ''
    )
  }, '')
}
</script>

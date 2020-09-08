<template>
  <nav class="flex items-center justify-between flex-wrap p-6 dark:text-white">
    <router-link to="/" class="flex items-center flex-shrink-0 mr-6">
      <Icon class="iconify inline-block mt-1" icon="carbon:text-annotation-toggle" />
      <span class="font-semibold text-xl tracking-tight mx-2">{{ t('website-name') }}</span>
    </router-link>

    <div class="flex items-center w-auto">
      <div class="icon-btn mx-2" @click="isDark = !isDark">
        <Icon :icon="isDark ? 'carbon:moon' : 'carbon:sun'" class="inline-block" />
      </div>

      <div class="icon-btn mx-2" @click="toggleLocales">
        <Icon icon="carbon:language" class="inline-block" />
      </div>

      <a class="icon-btn mx-2" href="https://github.com/qgustavor/fixed-subtitles" target="_blank">
        <Icon icon="carbon:code" class="inline-block" />
      </a>
    </div>
  </nav>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { locales } from '/~/messages'
export { isDark } from '/~/utils'

const i18n = useI18n()
const { t } = i18n
export { t }

export const toggleLocales = () => {
  // change to some real logic
  i18n.locale.value = locales[(locales.indexOf(i18n.locale.value) + 1) % locales.length]
}
</script>

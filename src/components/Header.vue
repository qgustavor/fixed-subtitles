<template>
  <nav class="flex items-center justify-between flex-wrap p-6 dark:text-white">
    <Link to="/" class="flex items-center flex-shrink-0 mr-6">
      <i-carbon-text-annotation-toggle class="iconify inline-block mt-1" />
      <span class="font-semibold text-xl tracking-tight mx-2">{{ t('website-name') }}</span>
    </Link>

    <div class="flex items-center w-auto">
      <div
        class="icon-btn mx-2"
        @click="isDark = !isDark"
        :aria-label="t('darkmode-tooltip')"
        data-balloon-pos="down-right"
        data-balloon-blunt
      >
        <i-carbon-moon v-if="isDark" class="inline-block" />
        <i-carbon-sun v-else class="inline-block" />
      </div>

      <div
        class="icon-btn mx-2"
        @click="toggleLocales"
        :aria-label="t('locale-tooltip')"
        data-balloon-pos="down-right"
        data-balloon-blunt
      ><i-carbon-language class="inline-block" /></div>

      <a
        class="icon-btn mx-2"
        href="https://github.com/qgustavor/fixed-subtitles"
        target="_blank"
        :aria-label="t('code-tooltip')"
        data-balloon-pos="down-right"
        data-balloon-length="large"
        data-balloon-blunt
        data-balloon-break
      ><i-carbon-code class="inline-block" /></a>
    </div>
  </nav>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { locales } from '/~/messages'
import { isDark } from '/~/utils'

const i18n = useI18n()
const { t } = i18n

function toggleLocales () {
  // change to some real logic
  i18n.locale.value = locales[(locales.indexOf(i18n.locale.value) + 1) % locales.length]
}
</script>

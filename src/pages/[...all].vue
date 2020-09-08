<template>
  <div class="dark:text-white text-center text-2xl py-20">
    {{ t('not-found') }}
    <div class="text-8xl mt-2">
      <Icon class="iconify inline-block" icon="carbon:document-unknown" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
export { t }
</script>

<template>
  <Title :page="t('not-found-title')"></Title>

  <div class="dark:text-white text-center text-2xl py-20">
    {{ t('not-found') }}
    <div class="text-8xl mt-2">
      <i-carbon-document-unknown class="iconify inline-block" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <Head>
    <title>{{ page ? page + ' - ' : '' }}{{ t('website-name') }}</title>
  </Head>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { Head } from '@egoist/vue-head'

defineProps(['page'])

const { t } = useI18n()
</script>

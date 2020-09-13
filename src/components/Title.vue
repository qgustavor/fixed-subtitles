<template>
  <Head>
    <title>{{ page ? page + ' - ' : '' }}{{ t('website-name') }}</title>
  </Head>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { Head } from '@egoist/vue-head'

export default {
  props: ['page'],
  components: { Head }
}

const { t } = useI18n()
export { t }
</script>

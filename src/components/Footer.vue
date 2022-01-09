<template>
  <footer class="body-font dark:text-white">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a class="flex title-font font-medium items-center md:justify-start justify-center">
        <span class="ml-3 text-xl">{{ t('website-name') }}</span>
      </a>
      <p class="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-red-500 sm:py-2 sm:mt-0 mt-4">
        {{ t('index.headline') }}
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <router-link to="/contact" class="text-gray-600">
          {{ t('contact-link') }}
        </router-link>
      </span>
    </div>
  </footer>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

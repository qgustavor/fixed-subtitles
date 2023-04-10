<template>
  <footer class="body-font dark:text-white">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a class="flex title-font font-medium items-center md:justify-start justify-center">
        <span class="ml-3 text-xl">{{ $t('website-name') }}</span>
      </a>
      <p class="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-green-800 sm:dark:border-green-300 sm:py-2 sm:mt-0 mt-4">
        {{ $t('index.headline') }}
      </p>
      <div class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <NuxtLink
          class="icon-btn mx-2"
          :to="switchLocalePath(locale === 'pt' ? 'en' : 'pt')"
        >
          <Icon name="carbon:ibm-watson-language-translator" class="inline-block" />
        </NuxtLink>

        <div
          class="icon-btn mx-2"
          @click="switchColorScheme"
        >
          <Icon name="carbon:moon" v-if="$colorMode.value === 'dark'" class="inline-block" />
          <Icon name="carbon:sun" v-else class="inline-block" />
        </div>

        <a
          class="icon-btn mx-2"
          href="https://github.com/qgustavor/fixed-subtitles"
          target="_blank"
        ><Icon name="carbon:code" class="inline-block" /></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { locale } = useI18n()
const colorMode = useColorMode()

function switchColorScheme () {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

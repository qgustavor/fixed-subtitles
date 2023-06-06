// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/fixed-subtitles/'
  },
  pages: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/color-mode',
    'nuxt-icon'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'dark'
  },
  i18n: {
    locales: [
      { code: 'en', file: 'en.yaml' },
      { code: 'pt', file: 'pt.yaml' }
    ],
    lazy: true,
    langDir: 'lang',
    fallbackLocale: 'en',
    defaultLocale: 'en'
  },
  nuxtIcon: {
    class: 'iconify'
  }
})

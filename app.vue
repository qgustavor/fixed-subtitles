<template>
  <div class="container mx-auto flex flex-col justify-between min-h-screen">
    <Header />
    <div class="dark:text-white mb-auto router-main">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>

<style>
html, body {
  min-height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

html {
  background: #EEE url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%23DDD' fill-opacity='0.4'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") 50% 50%;
  overflow-y: scroll;
}

.dark {
  background: #222 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%23333' fill-opacity='0.4'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") 50% 50%;
}

.icon-btn {
  @apply opacity-75 transition duration-200 ease-in-out cursor-pointer inline-block select-none hover:opacity-100;
}

.external-link, .group-info a {
  @apply underline text-green-800;
}

.dark .external-link, .dark .group-info a {
  @apply text-green-300;
}

.group-stat-icon {
  @apply inline-block text-green-800 dark:text-green-300 pt-2 text-2xl;
}

.iconify {
  display: inline-block;
  vertical-align: top!important;
}
</style>

<script setup lang='ts'>
const { t } = useI18n()

useHead({
  titleTemplate: page => (page ? page + ' - ' : '') + t('website-name'),
  link: [{
    rel: 'icon',
    href: '/fixed-subtitles/favicon.svg'
  }]
})
</script>

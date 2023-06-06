<template>
  <nav class="flex items-center justify-between flex-wrap p-6 dark:text-white">
    <NuxtLink :to="localePath('/')" class="flex items-center flex-shrink-0 mx-auto sm:mr-6 sm:ml-0">
      <Icon name="carbon:text-annotation-toggle" class="iconify inline-block mt-1" />
      <span class="font-semibold text-xl tracking-tight mx-2">{{ $t('website-name') }}</span>
    </NuxtLink>

    <form
      class="mt-4 sm:mt-0 w-full sm:w-2/3 lg:w-1/2"
      :action="localePath('/search')"
      @submit.prevent="handleSearch"
    >
      <label
        for="search"
        class="mb-2 text-sm font-medium text-neutral-900 sr-only dark:text-white"
      >$t('search.label')</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-1 flex items-center pl-4 pointer-events-none">
          <Icon name="carbon:search" />
        </div>
        <input
          type="search"
          id="search"
          class="block w-full p-4 pl-12 text-sm text-neutral-900 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-green-500 focus:border-green-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 outline-0"
          :placeholder="$t('search.placeholder')"
          v-model="searchRef"
          required
        >
        <button
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >{{ $t('search.button') }}</button>
      </div>
    </form>
  </nav>
</template>

<script setup>
const localePath = useLocalePath()

const searchRef = ref('')
const router = useRouter()
function handleSearch () {
  router.push({
    path: localePath('/search'),
    query: { q: searchRef.value }
  })
}
</script>

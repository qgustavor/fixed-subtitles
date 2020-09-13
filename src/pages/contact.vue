<template>
  <Title :page="t('contact.title')" />

  <div class="flex flex-col text-center w-full mb-10">
    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4">{{ t('contact.title') }}</h1>
    <p class="px-2 lg:w-1/2 md:w-2/3 mx-auto leading-relaxed text-base">{{ t('contact.headline') }}</p>
  </div>

  <form class="lg:w-1/2 md:w-2/3 mx-auto" @submit.prevent="onSubmit">
    <div class="flex flex-wrap">
      <div class="p-2 w-1/2">
        <input class="w-full dark:bg-gray-800 rounded border border-gray-700 dark:text-white focus:outline-none focus:border-indigo-500 text-base px-4 py-2" :placeholder="t('contact.name')" type="text" v-model="name" :disabled="state === 'submitting' || state === 'submitted'">
      </div>
      <div class="p-2 w-1/2">
        <input class="w-full dark:bg-gray-800 rounded border border-gray-700 dark:text-white focus:outline-none focus:border-indigo-500 text-base px-4 py-2" :placeholder="t('contact.email')" type="email" v-model="email" :disabled="state === 'submitting' || state === 'submitted'">
      </div>
      <div class="p-2 w-full">
        <textarea class="w-full dark:bg-gray-800 rounded border border-gray-700 dark:text-white focus:outline-none h-48 focus:border-indigo-500 text-base px-4 py-2 resize-none block" :placeholder="t('contact.message')" v-model="message" :disabled="state === 'submitting' || state === 'submitted'"></textarea>
      </div>
      <div class="p-2 w-full flex">
        <div class="md:w-2/5"></div>
        <button class="w-auto flex text-white border-0 py-2 px-8 focus:outline-none rounded text-lg text-center mx-5"
          :class="[
            state === 'idle' && 'bg-indigo-500 hover:bg-indigo-600',
            state === 'submitted' && 'bg-green-500',
            state === 'submitting' && 'bg-gray-500',
            state === 'missing-data' && 'bg-red-500 hover:bg-red-600',
            state === 'invalid-email' && 'bg-red-500 hover:bg-red-600',
            state === 'error' && 'bg-red-500 hover:bg-red-600'
          ]"
          :disabled="state === 'submitting' || state === 'submitted'"
        >{{ t('contact.submit') }}</button>
        <div class="w-full md:w-2/5 my-auto">
          <div v-if="state === 'missing-data'">{{ t('contact.messages.missing-data') }}</div>
          <div v-if="state === 'invalid-email'">{{ t('contact.messages.invalid-email') }}</div>
          <div v-if="state === 'submitting'">{{ t('contact.messages.submitting') }}</div>
          <div v-if="state === 'submitted'">{{ t('contact.messages.submitted') }}</div>
          <div v-if="state === 'error'">{{ t('contact.messages.error') }}</div>
        </div>
      </div>
      <div class="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center">
        <i18n-t keypath="contact.extra">
          <template #project>
            <a class="external-link" href="https://github.com/qgustavor/fixed-subtitles">{{ t('contact.extra-project') }}</a>
          </template>
        </i18n-t>
      </div>
    </div>
  </form>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const name = ref('')
const email = ref('')
const message = ref('')
const state = ref('idle')
export {name, email, message, state}

export async function onSubmit () {
  if (state.value === 'submitting' || state.value === 'submitted') return
  if (!name.value || !email.value || !message.value) {
    state.value = 'missing-data'
    return
  }
  if (!email.value.match(/.+@.+\..+/)) {
    state.value = 'invalid-email'
    return
  }

  const form = new URLSearchParams()
  form.append('name', name.value)
  form.append('email', email.value)
  form.append('message', message.value)
  form.append('slug', 'contact-form')

  state.value = 'submitting'

  const response = await fetch('https://us-central1-comments-api-888d3.cloudfunctions.net/comment/qgustavor/fixed-subtitles', {
    method: 'post',
    body: form,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })

  state.value = response.ok ? 'submitted' : 'error'
}

const { t } = useI18n()
export { t }
</script>

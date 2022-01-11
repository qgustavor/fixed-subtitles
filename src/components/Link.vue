<template>
  <a :href="'/fixed-subtitles' + to"><slot /></a>
</template>

<script setup>
defineProps(['to'])
</script>

<script setup lang="ts">
import { useLogStore } from '@/stores/LogStore'

const logStore = useLogStore()
</script>
<template>
  <h2>Journal</h2>
  <section v-for="entry in logStore.log" :key="entry.timestamp">
    <p class="text-entry move-setup">{{ entry.setupText }}</p>
    <p class="move-info"><strong>{{ entry.move }}</strong><span v-if="entry.stat"> + {{ entry.stat }}</span>: {{ entry.outcome }}<span v-if="entry.match"> {{ entry.match }}</span></p>
  </section>
</template>
<style scoped>
  .text-entry {
    white-space: pre-line;
  }
  .move-setup {
    margin-bottom: 0.2em;
  }
  .move-info {
    margin-top: 0.2em;
  }
</style>
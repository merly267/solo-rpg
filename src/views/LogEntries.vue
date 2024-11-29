<script setup lang="ts">
import { useLogStore } from '@/stores/LogStore'

const logStore = useLogStore()
</script>
<template>
  <h2>Journal</h2>
  <section v-for="entry in logStore.log" :key="entry.timestamp">
    <p><strong>{{ entry.move }}</strong><span v-if="entry.stat"> + {{ entry.stat }}</span>: {{ entry.outcome }}<span v-if="entry.match"> {{ entry.match }}</span></p>
  </section>
</template>
<script setup lang="ts">
import { useLogStore } from '@/stores/LogStore'

const logStore = useLogStore()
</script>
<template>
  <h2>Journal</h2>
  logStore.log: <pre>{{ logStore.log }}</pre>
</template>
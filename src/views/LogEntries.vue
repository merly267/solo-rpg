<script setup lang="ts">
import { ref } from 'vue'
import MakeLogEntry from '@/components/MakeLogEntry.vue'
import { useLogStore } from '@/stores/LogStore'

import CheckGear from '@/views/moves/CheckGear.vue'
import FaceDanger from '@/views/moves/FaceDanger.vue'

const logStore = useLogStore()
const visibleMove = ref(false)
const showMove = () => {
  visibleMove.value = true
}

const currentMove = FaceDanger

</script>
<template>
  <h2>Journal</h2>
  <section v-for="entry in logStore.log" :key="entry.timestamp">
    <p class="text-entry move-setup">{{ entry.entryText }}</p>
    <p v-if="entry.move" class="move-info"><strong>{{ entry.move }}</strong><span v-if="entry.stat"> + {{ entry.stat }}</span>: {{ entry.outcome }}<span v-if="entry.match"> {{ entry.match }}</span></p>
  </section>
  <MakeLogEntry />
  <button @click="showMove">Make a move</button>
  <component v-if="visibleMove" :is=currentMove></component>
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
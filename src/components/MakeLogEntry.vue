<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLogStore } from '@/stores/LogStore'

const { move, cleared } = defineProps<{
  move?: boolean
  cleared?: boolean
}>()
const logStore = useLogStore()

const label = move ? 'Envision your action' : 'Add to journal'

const logText = ref('')

const saveEntry = () => {
  logStore.addEntry(logText.value)
  clearEntry()
}

const clearEntry = () => {
  logText.value = ''
}

const logEntry = () => {
  emit('logEntry', logText.value)
}

const emit = defineEmits<{
  (e: 'logEntry', value: string): void
}>()

watch(
  () => cleared,
  () => {
    clearEntry()
  }
)
</script>

<template>
  <div class="log-entry">
    <textarea
      @input="logEntry()"
      v-model="logText"
      id="logText"
      placeholder="Add a journal entry"
    ></textarea>
    <button v-if="!move" @click="saveEntry">Add</button>
  </div>
</template>

<style scoped>
textarea {
  position: relative;
  width: calc(100% - 0.5rem);
  padding: 0.25em;
  z-index: 1;
}
.log-entry {
  label,
  button {
    display: block;
  }
}
</style>

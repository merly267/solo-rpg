<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLogStore } from '@/stores/LogStore'

type PropTypes = {
  move?: boolean
  cleared?: boolean
}

const props = defineProps<PropTypes>()
const logStore = useLogStore()

const label = props.move ? 'Envision your action' : 'Add to journal'

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

watch(() => props.cleared, () => {
  clearEntry()
})

</script>

<template>
  <div class="log-entry">
    <label for="logText">{{ label }}:</label>
    <textarea @input="logEntry()" v-model="logText" id="logText"></textarea>
    <button v-if="!move" @click="saveEntry">Add</button>
  </div>
</template>

<style scoped>
.log-entry {
  label, button {
    display: block;
  }
}
</style>
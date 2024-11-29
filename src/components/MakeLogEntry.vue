<script setup lang="ts">
import { ref, watch } from 'vue'

type PropTypes = {
  cleared?: boolean
}

const props = defineProps<PropTypes>()

const logText = ref('')

const emit = defineEmits<{
  (e: 'logEntry', value: string): void
}>()

const logEntry = () => {
  emit('logEntry', logText.value)
}

watch(() => props.cleared, () => {
  logText.value = ''
})

</script>

<template>
  <div class="log-entry">
    <label for="logText">Envision your action:</label>
    <textarea @input="logEntry()" v-model="logText" id="logText"></textarea>
  </div>
</template>

<style scoped>
.log-entry label {
  display: block;
}
</style>
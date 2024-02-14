<script setup>
import { momentum, addMomentum, loseMomentum } from '../composables/momentumStore.js'

const props = defineProps({
  numberCancellable: {
    type: Number,
    default: 0
  }
})

defineEmits(['burnMomentum'])
</script>

<template>
  <p>Current momentum: {{ momentum }}</p>
  <button type="button" @click="addMomentum(1)">Add momentum</button>
  <button type="button" @click="loseMomentum(1)">Lose momentum</button>
  <button type="button" :disabled="props.numberCancellable < 1" @click="$emit('burnMomentum')">
    Burn momentum
  </button>
</template>

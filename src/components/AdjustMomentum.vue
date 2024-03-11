<script setup>
import { useMomentumStore } from '@/stores/MomentumStore'

const momentumStore = useMomentumStore()

const props = defineProps({
  numberCancellable: {
    type: Number,
    default: 0
  }
})

defineEmits(['burnMomentum'])
</script>

<template>
  <p>Current momentum: {{ momentumStore.momentum }}</p>
  <button
    type="button"
    :disabled="momentumStore.momentum == momentumStore.maxMomentum"
    @click="momentumStore.addMomentum(1)"
  >
    Add momentum
  </button>
  <button type="button" @click="momentumStore.loseMomentum(1)">Lose momentum</button>
  <button type="button" :disabled="props.numberCancellable < 1" @click="$emit('burnMomentum')">
    Burn momentum
  </button>
  <p>{{ momentumStore.momentumOutcome }}</p>
</template>

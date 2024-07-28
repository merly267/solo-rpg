<script setup lang="ts">
import { useMomentumStore } from '@/stores/MomentumStore'

type PropTypes = {
  numberCancellable: number
  manual?: boolean
}

const props = defineProps<PropTypes>()

const momentumStore = useMomentumStore()

defineEmits<{
  (e: 'burnMomentum'): void
}>()
</script>

<template>
  <p>Current momentum: {{ momentumStore.momentum }}</p>
  <span v-if="manual">
    <button
      type="button"
      :disabled="momentumStore.momentum == momentumStore.maxMomentum"
      @click="momentumStore.addMomentum(1)"
    >
      Add momentum
    </button>
    <button type="button" @click="momentumStore.loseMomentum(1)">Lose momentum</button></span
  >
  <button type="button" :disabled="props.numberCancellable < 1" @click="$emit('burnMomentum')">
    Burn momentum
  </button>
  <p>{{ momentumStore.momentumOutcome }}</p>
</template>

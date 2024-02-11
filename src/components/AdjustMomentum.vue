<script setup>
import { actionDie, challengeDice, clear } from '../composables/diceStore.js'
import { momentum, addMomentum, loseMomentum, resetMomentum } from '../composables/momentumStore.js'

const props = defineProps({
  numberCancellable: {
    type: Number,
    default: 0
  }
})

// emit this instead and handle cancelling dice in actionMove
const burnMomentum = () => {
  resetMomentum()
}
</script>

<template>
  <p>Current momentum: {{ momentum }}</p>
  <button type="button" @click="addMomentum(1)">Add momentum</button>
  <button type="button" @click="loseMomentum(1)">Lose momentum</button>
  <button type="button" :disabled="props.numberCancellable < 1" @click="burnMomentum()">
    Burn momentum
  </button>
</template>

<script setup>
import { actionDie, challengeDice, clear } from '../composables/diceStore.js'
import { momentum, addMomentum, loseMomentum, resetMomentum } from '../composables/momentumStore.js'

// need to work out if it's cancellable during actionroll, and then let you cancel it here
const burnMomentum = () => {
  if (actionDie.value.result && momentum.value > 0) {
    challengeDice.value.forEach((die) => {
      if (momentum.value > die.result) {
        die.isCancellable = true
      } else {
        die.isCancellable = false
      }
    })
    console.log(challengeDice.value)
    // resetMomentum()
  }
}
</script>
<template>
  <p>Current momentum: {{ momentum }}</p>
  <button type="button" @click="addMomentum(1)">Add momentum</button>
  <button type="button" @click="loseMomentum(1)">Lose momentum</button>
  <button type="button" @click="burnMomentum()">Burn momentum</button>
</template>

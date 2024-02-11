<script setup>
import { momentum, addMomentum, loseMomentum, resetMomentum } from '../composables/momentumStore.js'

const burnMomentum = () => {
  resetMomentum()
}
</script>
<template>
  <p>Current momentum: {{ momentum }}</p>
  <button type="button" @click="addMomentum(1)">Add momentum</button>
  <button type="button" @click="loseMomentum(1)">Lose momentum</button>
  <button type="button" @click="burnMomentum()">Burn momentum</button>
</template>

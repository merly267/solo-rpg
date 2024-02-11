<script setup>
import { momentum, addMomentum, loseMomentum } from '../composables/momentumStore.js'
</script>
<template>
  <p>Current momentum: {{ momentum }}</p>
  <button type="button" @click="addMomentum(1)">Add momentum</button>
  <button type="button" @click="loseMomentum(1)">Lose momentum</button>
</template>

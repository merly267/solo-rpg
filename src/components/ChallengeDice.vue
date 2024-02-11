<script setup>
import { challengeDice } from '../composables/diceStore.js'
import BaseDie from './BaseDie.vue'
</script>
<template>
  <div class="challenge">
    <h3>Challenge dice</h3>
    <ul class="dice">
      <li v-for="die in challengeDice" :key="die.id">
        <BaseDie :die="die" />
      </li>
    </ul>
  </div>
</template>
<style>
.challenge .success {
  background-color: var(--success-bg);
}

.challenge .failure {
  background-color: var(--failure-bg);
}
</style>

<script setup>
import { challengeDice as newChallengeDice, roll } from '../composables/diceStore.js'
import BaseDie from './BaseDie.vue'
</script>
<template>
  <div class="challenge">
    <h2>Challenge dice</h2>
    <ul class="dice">
      <li v-for="die in newChallengeDice" :key="die.id">
        <BaseDie :die="die" />
      </li>
    </ul>
    <button
      type="button"
      @click="
        newChallengeDice.forEach((die) => {
          roll(die)
        })
      "
    >
      Roll
    </button>
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

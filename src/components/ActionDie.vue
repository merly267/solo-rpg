<script setup>
import { actionDie, clear, roll } from '../composables/diceStore.js'
import BaseDie from './BaseDie.vue'
</script>
<template>
  <div class="challenge">
    <h2>Action score</h2>
    <BaseDie :die="actionDie" />
    <button type="button" @click="roll(actionDie)">Roll</button>
    <button type="button" @click="clear(actionDie)">Clear</button>
  </div>
</template>

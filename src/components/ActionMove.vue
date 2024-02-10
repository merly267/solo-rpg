<script setup>
import { actionDie, challengeDice, clear, roll } from '../composables/diceStore.js'
import ActionDie from './ActionDie.vue'
import ChallengeDice from './ChallengeDice.vue'

const rollAllDice = () => {
  challengeDice.value.forEach((die) => roll(die))
  roll(actionDie.value)
}
const clearAllDice = () => {
  challengeDice.value.forEach((die) => clear(die))
  clear(actionDie.value)
}
</script>
<template>
  <h3>Action move</h3>
  <ActionDie />
  <ChallengeDice />
  <button type="button" @click="rollAllDice()">Roll</button>
  <button type="button" @click="clearAllDice()">Clear</button>
</template>

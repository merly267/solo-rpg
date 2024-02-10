<script setup>
import { ref } from 'vue'
import { actionDie, challengeDice, clear, roll } from '../composables/diceStore.js'
import ChallengeDice from './ChallengeDice.vue'
import ActionScore from './ActionScore.vue'
import StatSelector from './StatSelector.vue'

let selectedStat = ref({
  name: '',
  score: null
})
const setSelectedStat = (stat) => {
  selectedStat.value = stat
  clearAllDice()
}
const clearSelectedStat = () => {
  selectedStat.value = {
    name: '',
    score: null
  }
}

const rollAllDice = () => {
  challengeDice.value.forEach((die) => roll(die))
  roll(actionDie.value)
}
const clearAllDice = () => {
  challengeDice.value.forEach((die) => clear(die))
  clear(actionDie.value)
}

const clearAll = () => {
  clearSelectedStat()
  clearAllDice()
}
</script>
<template>
  <h3>Action move</h3>
  <StatSelector :selected="selectedStat" @setSelected="setSelectedStat" />
  <!-- <ActionScore :selectedStat="selectedStat" /> -->
  <ActionScore :selectedStat="selectedStat" />

  <ChallengeDice />
  <button type="button" @click="rollAllDice()">Roll</button>
  <button type="button" @click="clearAll()">Clear</button>
</template>

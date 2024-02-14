<script setup>
import { computed, ref } from 'vue'
import { actionDie, challengeDice, clear, roll } from '../composables/diceStore.js'
import { momentum, resetMomentum } from '../composables/momentumStore.js'
import MoveLayout from './MoveLayout.vue'
import ActionDie from './ActionDie.vue'
import AdjustMomentum from './AdjustMomentum.vue'
import ChallengeDice from './ChallengeDice.vue'
import StatSelector from './StatSelector.vue'
import MoveOutcome from './MoveOutcome.vue'

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

const actionScore = computed(() => {
  if (actionDie.value.result + momentum.value == 0) {
    return selectedStat.value.score
  } else if (actionDie.value.result) {
    return actionDie.value.result + selectedStat.value.score
  }
  return null
})

const rollAllDice = () => {
  challengeDice.value.forEach((die) => roll(die))
  roll(actionDie.value)
  checkSuccess()
  checkCancellable()
}

const checkSuccess = () => {
  challengeDice.value.forEach((die) => {
    if (actionScore.value > die.result) {
      die.isSuccess = true
    } else {
      die.isSuccess = false
    }
  })
}

const failures = computed(() => {
  return challengeDice.value.filter((die) => die.isSuccess === false)
})

const checkCancellable = () => {
  if (actionDie.value.result && momentum.value > 0) {
    challengeDice.value.forEach((die) => {
      if (!die.isSuccess && momentum.value > die.result) {
        die.isCancellable = true
      } else {
        die.isCancellable = false
      }
    })
  }
}

const anyCancellable = computed(() => {
  return challengeDice.value.filter((die) => die.isCancellable === true)
})

const burnMomentum = () => {
  anyCancellable.value.forEach((die) => {
    die.result = null
    die.isSuccess = null
    die.isCancellable = null
    die.cancelled = true
  })
  resetMomentum()
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
  <h2>Action move</h2>
  <MoveLayout>
    <template #stats>
      <StatSelector :selected="selectedStat" @setSelected="setSelectedStat" />
    </template>
    <template #playerScore>
      <h3>ActionScore</h3>
      <ActionDie />
      + <span v-if="selectedStat.score">{{ selectedStat.score }}</span>
      <span v-else>?</span>
      + <span class="add">?</span> = <span v-if="actionScore">{{ actionScore }}</span>
      <span v-else>?</span>
    </template>
    <template #challengeScore>
      <ChallengeDice />
    </template>
    <template #actions>
      <button type="button" @click="rollAllDice()">Roll</button>
      <button type="button" @click="clearAll()">Clear</button>
    </template>
    <template #momentum>
      <AdjustMomentum :numberCancellable="anyCancellable.length" @burnMomentum="burnMomentum" />
    </template>

    <template #outcome>
      <MoveOutcome v-if="actionDie.result" :failures="failures" />
    </template>
  </MoveLayout>
</template>

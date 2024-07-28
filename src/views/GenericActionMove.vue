<script setup lang="ts">
import { computed, ref } from 'vue'
import { actionDie, challengeDice, clear, roll } from '@/composables/useDiceStore'
import { useMomentumStore } from '@/stores/MomentumStore'
import MoveLayout from '@/components/MoveLayout.vue'
import ActionDie from '@/components/ActionDie.vue'
import AdjustMomentum from '@/components/AdjustMomentum.vue'
import ChallengeDice from '@/components/ChallengeDice.vue'
import StatSelector from '@/components/StatSelector.vue'
import MoveOutcome from '@/components/OldMoveOutcome.vue'
import type { Die, Stat } from '@/types'
import { outcomeList } from '@/constants'

const momentumStore = useMomentumStore()

let selectedStat = ref<Stat>({
  name: '',
  score: 0
})
const setSelectedStat = (stat: Stat) => {
  selectedStat.value = stat
  clearAllDice()
}
const clearSelectedStat = () => {
  selectedStat.value = {
    name: '',
    score: 0
  }
}

const actionScore = computed(() => {
  if (actionDie.value.result && selectedStat.value.score !== null) {
    if (actionDie.value.result + momentumStore.momentum == 0) {
      actionDie.value.cancelled = true
      return selectedStat.value.score
    }
    return actionDie.value.result + selectedStat.value.score
  }
  return null
})

const rollAllDice = () => {
  clearAllDice()
  challengeDice.value.forEach((die) => roll(die))
  roll(actionDie.value)
  checkSuccess()
  checkCancellable()
}

const checkSuccess = () => {
  challengeDice.value.forEach((die) => {
    if (actionScore.value && die.result) {
      if (actionScore.value > die.result) {
        die.isSuccess = true
      } else {
        die.isSuccess = false
      }
    }
  })
}

const failures = computed(() => {
  return challengeDice.value.filter((die) => die.isSuccess === false)
})

const checkCancellable = () => {
  if (actionDie.value.result && momentumStore.momentum > 0) {
    challengeDice.value.forEach((die: Die) => {
      if (!die.isSuccess && die.result && momentumStore.momentum > die.result) {
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
  momentumStore.resetMomentum()
}

const anyClearable = computed(() => {
  const challengeClearable = challengeDice.value.filter((die) => die.result)
  if (challengeClearable.length && actionDie.value.result) {
    return true
  }
  return false
})

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
      <h3>Action Score</h3>
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
      <button type="button" @click="clearAll()" :disabled="!anyClearable">Clear</button>
    </template>
    <template #momentum>
      <AdjustMomentum
        :manual="true"
        :numberCancellable="anyCancellable.length"
        @burnMomentum="burnMomentum"
      />
    </template>

    <template #outcome>
      <MoveOutcome v-if="actionDie.result" :failures="failures" :outcomes="outcomeList" />
    </template>
  </MoveLayout>
</template>

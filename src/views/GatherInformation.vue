<script setup>
import { computed, ref } from 'vue'
import { actionDie, challengeDice, clear, roll } from '@/composables/useDiceStore.js'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import { useMomentumStore } from '@/stores/MomentumStore'
import MoveLayout from '@/components/MoveLayout.vue'
import ActionDie from '@/components/ActionDie.vue'
import AdjustMomentum from '@/components/AdjustMomentum.vue'
import ChallengeDice from '@/components/ChallengeDice.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'

const momentumStore = useMomentumStore()

let selectedStat = statsList.value.find((stat) => stat.name === 'Wits')

const bondAadds = ref(false)

const moveAdds = computed(() => {
  if (bondAadds.value) {
    return 1
  }
  return 0
})

const actionScore = computed(() => {
  if (actionDie.value.result) {
    if (actionDie.value.result + momentumStore.momentum == 0) {
      actionDie.value.cancelled = true
      return selectedStat.score
    }
    return actionDie.value.result + selectedStat.score + moveAdds.value
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
  if (actionDie.value.result && momentumStore.momentum > 0) {
    challengeDice.value.forEach((die) => {
      if (!die.isSuccess && momentumStore.momentum > die.result) {
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
  clearAllDice()
}
</script>
<template>
  <h2>Gather information</h2>
  <MoveLayout>
    <template #text>
      <p>
        When you <strong>search an area</strong>, <strong>ask questions</strong>,
        <strong>conduct an investigation</strong>, or <strong>follow a track</strong>, roll +{{
          selectedStat.name
        }}
        ({{ selectedStat.score }}).
      </p>
      <input type="checkbox" id="bondAadds" name="adds" v-model="bondAadds" />
      <label for="bondAadds"
        >If you act within a community or ask questions of a person with whom you share a bond, add
        +1.</label
      >
    </template>
    <template #playerScore>
      <h3>ActionScore</h3>
      <ActionDie />
      + <span v-if="selectedStat.score">{{ selectedStat.score }}</span>
      <span v-else>?</span>
      + <span v-if="moveAdds > 0">{{ moveAdds }}</span>
      <span v-else>?</span>
      =
      <span v-if="actionScore"
        ><strong>{{ actionScore }}</strong></span
      >
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
      <AdjustMomentum :numberCancellable="anyCancellable.length" @burnMomentum="burnMomentum" />
    </template>

    <template #outcome>
      <MoveOutcome v-if="actionDie.result" :failures="failures" />
    </template>
  </MoveLayout>
</template>

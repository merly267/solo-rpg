<script setup>
import BaseDie from './BaseDie.vue'
import MoveLayout from './MoveLayout.vue'
import StatsList from './StatSelector.vue'
import { momentum } from '../composables/momentumStore.js'

import { computed, ref } from 'vue'

const selectedStat = ref({
  name: '',
  score: null
})

const actionDie = {
  id: 'actionDie',
  max: 6,
  result: null
}

const challengeDice = [
  {
    id: 'challengeDie-0',
    max: 10,
    result: null,
    isSuccess: null
  },
  {
    id: 'challengeDie-1',
    max: 10,
    result: null,
    isSuccess: null
  }
]

const checkSuccess = () => {
  challengeDice.forEach((die) => {
    if (actionScore.value > die.result) {
      die.isSuccess = true
    } else {
      die.isSuccess = false
    }
  })
}

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

const roll = (die) => {
  die.result = Math.ceil(Math.random() * die.max)
}

const clearDie = (die) => {
  die.result = null
}

const rollChallenge = () => {
  challengeDice.forEach((die) => {
    roll(die)
  })
}

const clearChallenge = () => {
  challengeDice.forEach((die) => {
    clearDie(die)
  })
}

const rollAllDice = () => {
  rollChallenge()
  roll(actionDie)
  checkSuccess()
}

const clearAllDice = () => {
  clearChallenge()
  clearDie(actionDie)
}

const clearAll = () => {
  clearSelectedStat()
  clearAllDice()
}

const actionScore = computed(() => {
  if (actionDie.result) {
    return actionDie.result + selectedStat.value.score
  } else {
    return null
  }
})

const successes = computed(() => {
  return filter((die) => die.isSuccess === true)
})

const outcome = computed(() => {
  if (actionDie.result) {
    switch (successes.value.length) {
      case 0:
        return 'Miss'
      case 1:
        return 'Weak hit'
      case 2:
        return 'Strong hit'
    }
    return null
  } else {
    return null
  }
})

const match = computed(() => {
  if (challengeDice[0].result) {
    const toMatch = challengeDice[0].result
    const matches = challengeDice.filter((die) => die.result === toMatch)
    if (matches.length > 1) {
      if (toMatch === 10) {
        return ' and a match on 10, the worst possible result...'
      } else {
        return ' and a match!'
      }
    } else {
      return null
    }
  } else {
    return null
  }
})
</script>

<template>
  <h1>Make a move</h1>
  <MoveLayout>
    <template #stats>
      <StatsList :selected="selectedStat" @setSelected="setSelectedStat" />
    </template>
    <template #dice>
      <button type="button" @click="rollAllDice">
        <h2>Action score</h2>
        <p>
          <BaseDie :die="actionDie" />
          +
          <span v-if="selectedStat.score">{{ selectedStat.score }}</span>
          <span v-else>?</span>
          + <span class="add">?</span> =
          <span v-if="actionScore">{{ actionScore }}</span>
          <span v-else>?</span>
        </p>
        <div class="challenge">
          <h2>Challenge dice</h2>
          <ul class="dice">
            <li v-for="die in challengeDice" :key="die.id">
              <BaseDie :die="die" />
            </li>
          </ul>
        </div>
      </button>
    </template>
  </MoveLayout>

  <p class="outcome">{{ outcome }}{{ match }}</p>
  <button type="button" @click="clearAll">Clear</button>
  <h3>Momentum</h3>
  <button type="button">{{ momentum }}</button>
</template>

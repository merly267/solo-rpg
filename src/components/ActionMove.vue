<script setup lang="ts">
import { computed } from 'vue'
import ActionDie from '@/components/ActionDie.vue'
import ChallengeDice from '@/components/ChallengeDice.vue'
import { useMomentumStore } from '@/stores/MomentumStore'
import AdjustMomentum from '@/components/AdjustMomentum.vue'
import { actionDie, challengeDice, clear, roll } from '@/composables/useDiceStore'

type PropTypes = {
  title: string
  stat: number
  adds: number
  disabled?: boolean
}

const props = defineProps<PropTypes>()

const momentumStore = useMomentumStore()

const actionScore = computed(() => {
  if (actionDie.value.rolled) {
    if (actionDie.value.result + momentumStore.momentum == 0) {
      actionDie.value.cancelled = true
      return props.stat + props.adds
    }
    return actionDie.value.result + props.stat + props.adds
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
    if (actionScore.value && die.rolled) {
      if (actionScore.value > die.result) {
        die.isSuccess = true
      } else {
        die.isSuccess = false
      }
    }
  })
}

const checkCancellable = () => {
  if (actionDie.value.rolled && momentumStore.momentum > 0) {
    challengeDice.value.forEach((die) => {
      if (!die.isSuccess && die.rolled && momentumStore.momentum > die.result) {
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
    die.result = 0
    die.isSuccess = true
    die.isCancellable = false
    die.cancelled = true
  })
  momentumStore.resetMomentum()
}

const anyClearable = computed(() => {
  const challengeClearable = challengeDice.value.filter((die) => die.rolled)
  if (challengeClearable.length && actionDie.value.rolled) {
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
  <h2>{{ title }}</h2>
  <slot></slot>
  <h3>Action Score</h3>
  <ActionDie />
  + <span v-if="stat">{{ stat }}</span>
  <span v-else>?</span>
  + <span v-if="adds > 0">{{ adds }}</span>
  <span v-else>?</span>
  =
  <span v-if="actionScore"
    ><strong>{{ actionScore }}</strong></span
  >
  <span v-else>?</span>

  <ChallengeDice />
  <button type="button" :disabled="disabled" @click="rollAllDice()">Roll</button>
  <button type="button" @click="clearAll()" :disabled="!anyClearable">Clear</button>
  <AdjustMomentum :numberCancellable="anyCancellable.length" @burnMomentum="burnMomentum" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDiceStore } from '@/stores/DiceStore'
import { useMoveOutcomeStore } from '@/stores/MoveOutcomeStore'
import { outcomeList } from '@/constants'

const outcomes = outcomeList

const diceStore = useDiceStore()
const moveOutcomeStore = useMoveOutcomeStore()

const outcome = computed(() => {
  switch (diceStore.failures.length) {
    case 0:
      return outcomes.strong.label
    case 1:
      return outcomes.weak.label
    case 2:
      return outcomes.miss.label
  }
  return null
})

defineExpose({ outcome })

const match = computed(() => {
  if (diceStore.challengeDice[0].result) {
    const toMatch = diceStore.challengeDice[0].result
    const matches = diceStore.challengeDice.filter((die) => die.result === toMatch)
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
  <div>
    <h3>{{ outcome }}{{ match }}</h3>
    <slot name="strong" v-if="diceStore.failures.length == 0"></slot>
    <slot name="weak" v-if="diceStore.failures.length == 1"></slot>
    <slot name="miss" v-if="diceStore.failures.length == 2"></slot>
  </div>
</template>

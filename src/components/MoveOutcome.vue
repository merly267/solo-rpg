<script setup lang="ts">
import { computed } from 'vue'
import { useDiceStore } from '@/stores/DiceStore'
import { useMoveOutcomeStore } from '@/stores/MoveOutcomeStore'

const diceStore = useDiceStore()
const moveOutcomeStore = useMoveOutcomeStore()

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
    <h3>{{ moveOutcomeStore.getOutcomeLabel(diceStore.successes.length) }}{{ match }}</h3>
    <slot name="strong" v-if="diceStore.successes.length == 2"></slot>
    <slot name="weak" v-if="diceStore.successes.length == 1"></slot>
    <slot name="miss" v-if="diceStore.successes.length == 0"></slot>
  </div>
</template>

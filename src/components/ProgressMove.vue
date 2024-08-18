<script setup lang="ts">
import ChallengeDice from '@/components/ChallengeDice.vue'
import { challengeDice, clear, roll } from '@/composables/useDiceStore'
type PropTypes = {
  title: string
  progressScore: number
}

const emit = defineEmits<{
  (e: 'makeMove'): void
  (e: 'clearMove'): void
}>()

const makeMove = () => {
  emit('makeMove')
}

const rollAllDice = () => {
  console.log('rolled')
  clearAllDice()
  challengeDice.value.forEach((die) => roll(die))
  checkSuccess()
  makeMove()
}

const checkSuccess = () => {
  challengeDice.value.forEach((die) => {
    if (props.progressScore > die.result) {
      die.isSuccess = true
    } else {
      die.isSuccess = false
    }
  })
}

const clearAllDice = () => {
  challengeDice.value.forEach((die) => clear(die))
}

const props = defineProps<PropTypes>()
</script>
<template>
  <h2>{{ props.title }}</h2>
  <slot></slot>
  <ChallengeDice />
  <button type="button" @click="rollAllDice()">Roll</button>
</template>

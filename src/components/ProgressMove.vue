<script setup lang="ts">
import { onUnmounted } from 'vue'
import ChallengeDice from '@/components/ChallengeDice.vue'
import { useDiceStore } from '@/stores/DiceStore'

type PropTypes = {
  title: string
  progressScore: number
  hideDice?: boolean
}

const diceStore = useDiceStore()

const emit = defineEmits<{
  (e: 'makeMove'): void
  (e: 'clearMove'): void
}>()

const makeMove = () => {
  emit('makeMove')
}

const rollAllDice = () => {
  clearAllDice()
  diceStore.challengeDice.forEach((die) => diceStore.roll(die))
  checkSuccess()
  makeMove()
}

const checkSuccess = () => {
  diceStore.challengeDice.forEach((die) => {
    if (props.progressScore > die.result) {
      die.isSuccess = true
    } else {
      die.isSuccess = false
    }
  })
}

const clearAllDice = () => {
  diceStore.challengeDice.forEach((die) => diceStore.clear(die))
}

const clearMove = () => {
  emit('clearMove')
}

const clearAll = () => {
  clearAllDice()
  clearMove()
}

onUnmounted(() => clearAll())

const props = defineProps<PropTypes>()
</script>
<template>
  <h2>{{ props.title }}</h2>
  <slot></slot>
  <div v-if="!hideDice" class="dice-buttons">
    <ChallengeDice />
    <button type="button" @click="rollAllDice()">Roll</button
    ><button type="button" @click="clearAll()">Clear</button>
  </div>
</template>

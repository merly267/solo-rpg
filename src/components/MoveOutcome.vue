<script setup lang="ts">
import { useDiceStore } from '@/stores/DiceStore'
import { useMoveOutcomeStore } from '@/stores/MoveOutcomeStore'

const diceStore = useDiceStore()
const moveOutcomeStore = useMoveOutcomeStore()

</script>
<template>
  <div>
    <h3>{{ moveOutcomeStore.outcomeLabel }}{{ moveOutcomeStore.matchMessage }}</h3>
    <slot name="strong" v-if="diceStore.successes.length == 2"></slot>
    <slot name="weak" v-if="diceStore.successes.length == 1"></slot>
    <slot name="miss" v-if="diceStore.successes.length == 0"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import ActionDie from '@/components/ActionDie.vue'
import ChallengeDice from '@/components/ChallengeDice.vue'
import { useMomentumStore } from '@/stores/MomentumStore'
import StashedMoves from '@/components/StashedMoves.vue'
import { useDiceStore } from '@/stores/DiceStore'
import { usestashedAddstore } from '@/stores/MoveAddsStore'
import { useMoveOutcomeStore } from '@/stores/MoveOutcomeStore'

const { title, stat, adds, disabled } = defineProps<{
  title: string
  stat: number
  adds: number
  disabled?: boolean
}>()

const stashedStore = usestashedAddstore()

const moveAdds = computed(() => {
  return adds ? Number(stashedStore.selected) + Number(adds) : stashedStore.selected
})

const momentumStore = useMomentumStore()

const emit = defineEmits<{
  (e: 'makeMove'): void
  (e: 'clearMove'): void
}>()

const diceStore = useDiceStore()
const moveOutcomeStore = useMoveOutcomeStore()

const makeMove = () => {
  emit('makeMove')
}

const rollAllDice = () => {
  clearAllDice()
  diceStore.challengeDice.forEach((die) => diceStore.roll(die))
  diceStore.roll(diceStore.actionDie)
  moveOutcomeStore.calculateActionScore(stat, adds)
  moveOutcomeStore.checkSuccess()
  moveOutcomeStore.checkMomentumSuccess()
  checkReplaceable()
  stashedStore.clearUsedAndExpiredStashed()
  makeMove()
}

let anyReplaceable = false

const checkReplaceable = () => {
  if (diceStore.actionDie.rolled) {
    if (moveOutcomeStore.possibleMomentumSuccesses > diceStore.successes.length) {
      anyReplaceable = true
    }
  }
}

let actionScoreReplaced = false

const burnMomentum = () => {
  actionScoreReplaced = true
  moveOutcomeStore.useMomentumSuccess()
  momentumStore.resetMomentum()
}

const anyClearable = computed(() => {
  const challengeClearable = diceStore.challengeDice.filter((die) => die.rolled)
  if (challengeClearable.length && diceStore.actionDie.rolled) {
    return true
  }
  return false
})

const clearAllDice = () => {
  diceStore.challengeDice.forEach((die) => diceStore.clear(die))
  diceStore.clear(diceStore.actionDie)
}

const clearMove = () => {
  emit('clearMove')
}

const clearAll = () => {
  clearAllDice()
  moveOutcomeStore.clearActionScore()
  moveOutcomeStore.resetMomentumSuccess()
  anyReplaceable = false
  actionScoreReplaced = false
  clearMove()
}
onUnmounted(() => clearAll())
</script>
<template>
  <h2>{{ title }}</h2>
  <slot></slot>
  <StashedMoves />
  <h3>Action Score</h3>
  <span :class="{ replaced: actionScoreReplaced }">
    <ActionDie />
    + <span v-if="stat">{{ stat }}</span>
    <span v-else>?</span>
    + <span v-if="moveAdds > 0">{{ moveAdds }}</span>
    <span v-else>?</span>
  </span>
  =

  <span v-if="moveOutcomeStore.latestActionScore > 0"
    ><strong>{{ moveOutcomeStore.latestActionScore }}</strong></span
  >
  <span v-else>?</span>

  <ChallengeDice />
  <button type="button" :disabled="disabled" @click="rollAllDice()">Roll</button>
  <button type="button" @click="clearAll()" :disabled="!anyClearable">Clear</button>
  <span v-if="anyReplaceable && !actionScoreReplaced">
    <button type="button" @click="burnMomentum">
      Burn momentum ({{ momentumStore.momentum }})
    </button>
    to turn a {{ moveOutcomeStore.outcomeLabel }} into a
    {{ moveOutcomeStore.possibleOutcomeLabel }}
  </span>
</template>

<style scoped>
h3 {
  margin-block-end: 1em;
}
.replaced {
  --stripe-start: calc(50% - 1px);
  --stripe-end: calc(50% + 1px);
  color: var(--grey-text);
  background: linear-gradient(
    to bottom left,
    transparent var(--stripe-start),
    var(--app-text) var(--stripe-start) var(--stripe-end),
    transparent var(--stripe-end)
  );
  .die {
    opacity: 0.5;
  }
}
</style>

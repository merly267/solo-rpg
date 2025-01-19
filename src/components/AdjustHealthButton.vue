<script setup lang="ts">
import { useCharacterStore } from '@/stores/CharacterStore'
import { maxHealth } from '@/constants'

type Operation = 'take' | 'lose'
type ButtonType = 'submit' | 'button'

const { buttonType = 'button' } = defineProps<{
  operation: Operation
  amount: number
  disabled?: boolean
  buttonType?: ButtonType
}>()

const characterStore = useCharacterStore()
</script>

<template>
  <button
    v-if="operation == 'take'"
    :type="buttonType"
    :disabled="disabled || characterStore.health == maxHealth"
    @click="characterStore.takeHealth(amount)"
  >
    Take +{{ amount }} health
  </button>
  <span v-else-if="operation == 'lose'">
    <button
      :type="buttonType"
      :disabled="disabled || characterStore.health == 0"
      @click="characterStore.loseHealth(amount)"
    >
      Lose -{{ amount }} health
    </button>
    <!-- <span v-if="characterStore.health == 0">
      Your health is already at minumum. Face a setback instead.
    </span> -->
  </span>
</template>

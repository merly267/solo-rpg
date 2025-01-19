<script setup lang="ts">
import { useCharacterStore } from '@/stores/CharacterStore'
import { maxSupply } from '@/constants'

type Operation = 'take' | 'suffer'

const { operation, amount, disabled } = defineProps<{
  operation: Operation
  amount: number
  disabled?: boolean
}>()

const characterStore = useCharacterStore()
</script>

<template>
  <button
    v-if="operation == 'take'"
    type="button"
    :disabled="disabled || characterStore.supply == maxSupply"
    @click="characterStore.takeSupply(amount)"
  >
    Take +{{ amount }} supply
  </button>
  <span v-else-if="operation == 'suffer'">
    <button
      type="button"
      :disabled="disabled || characterStore.supply == 0"
      @click="characterStore.loseSupply(amount)"
    >
      Suffer -{{ amount }} supply
    </button>
    <!-- <span v-if="characterStore.health == 0">
      Your health is already at minumum. Face a setback instead.
    </span> -->
  </span>
</template>

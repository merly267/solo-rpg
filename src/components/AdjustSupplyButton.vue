<script setup lang="ts">
import { useCharacterStore } from '@/stores/CharacterStore'
import { maxSupply } from '@/constants'

type Operation = 'take' | 'suffer'

type PropTypes = {
  operation: Operation
  amount: number
  disabled?: boolean
}

const props = defineProps<PropTypes>()

const characterStore = useCharacterStore()
</script>

<template>
  <button
    v-if="props.operation == 'take'"
    type="button"
    :disabled="props.disabled || characterStore.supply == maxSupply"
    @click="characterStore.takeSupply(props.amount)"
  >
    Take +{{ props.amount }} supply
  </button>
  <span v-else-if="props.operation == 'suffer'">
    <button
      type="button"
      :disabled="props.disabled || characterStore.supply == 0"
      @click="characterStore.loseSupply(props.amount)"
    >
      Suffer -{{ props.amount }} supply
    </button>
    <!-- <span v-if="characterStore.health == 0">
      Your health is already at minumum. Face a setback instead.
    </span> -->
  </span>
</template>

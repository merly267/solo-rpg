<script setup lang="ts">
import { useCharacterStore } from '@/stores/CharacterStore'
import { maxHealth } from '@/constants'

type Operation = 'take' | 'lose'
type ButtonType = 'submit' | 'button'

type PropTypes = {
  operation: Operation
  amount: number
  disabled?: boolean
  buttonType?: ButtonType
}

const props = withDefaults(defineProps<PropTypes>(), {
  buttonType: 'button'
})

const characterStore = useCharacterStore()
</script>

<template>
  <button
    v-if="props.operation == 'take'"
    :type="props.buttonType"
    :disabled="props.disabled || characterStore.health == maxHealth"
    @click="characterStore.takeHealth(props.amount)"
  >
    Take +{{ props.amount }} health
  </button>
  <span v-else-if="props.operation == 'lose'">
    <button
      :type="props.buttonType"
      :disabled="props.disabled || characterStore.health == 0"
      @click="characterStore.loseHealth(props.amount)"
    >
      Lose -{{ props.amount }} health
    </button>
    <!-- <span v-if="characterStore.health == 0">
      Your health is already at minumum. Face a setback instead.
    </span> -->
  </span>
</template>

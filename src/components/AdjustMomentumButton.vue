<script setup lang="ts">
import { useMomentumStore } from '@/stores/MomentumStore'

type Operation = 'adds' | 'subtracts'

const { operation, amount, disabled } = defineProps<{
  operation: Operation
  amount: number
  disabled?: boolean
}>()

const momentumStore = useMomentumStore()
</script>

<template>
  <button
    v-if="operation == 'adds'"
    type="button"
    :disabled="disabled || momentumStore.momentum == momentumStore.maxMomentum"
    @click="momentumStore.addMomentum(amount)"
  >
    Take +{{ amount }} momentum
  </button>
  <span v-else-if="operation == 'subtracts'">
    <button
      type="button"
      :disabled="disabled || momentumStore.momentum == momentumStore.minMomentum"
      @click="momentumStore.loseMomentum(amount)"
    >
      Suffer -{{ amount }} momentum
    </button>
    <span v-if="momentumStore.momentum == momentumStore.minMomentum">
      Your momentum is already at minumum. Face a setback instead.
    </span>
  </span>
</template>

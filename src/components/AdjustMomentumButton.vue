<script setup lang="ts">
import { useMomentumStore } from '@/stores/MomentumStore'

type Operation = 'adds' | 'subtracts'

type PropTypes = {
  operation: Operation
  amount: number
}

const props = defineProps<PropTypes>()

const momentumStore = useMomentumStore()
</script>

<template>
  <button
    v-if="props.operation == 'adds'"
    type="button"
    :disabled="momentumStore.momentum == momentumStore.maxMomentum"
    @click="momentumStore.addMomentum(props.amount)"
  >
    Take +{{ props.amount }} momentum
  </button>
  <span v-else-if="props.operation == 'subtracts'">
    <button
      type="button"
      :disabled="momentumStore.momentum == momentumStore.minMomentum"
      @click="momentumStore.loseMomentum(props.amount)"
    >
      Suffer -{{ props.amount }} momentum
    </button>
    <span v-if="momentumStore.momentum == momentumStore.minMomentum">
      Your momentum is already at minumum. Face a setback instead.
    </span>
  </span>
</template>

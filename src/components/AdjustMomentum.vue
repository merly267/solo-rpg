<script setup lang="ts">
import { useMomentumStore } from '@/stores/MomentumStore'
import AdjustMomentumButton from './AdjustMomentumButton.vue'

type PropTypes = {
  numberCancellable: number
  manual?: boolean
}

const props = defineProps<PropTypes>()

const momentumStore = useMomentumStore()

const emit = defineEmits<{
  (e: 'burnMomentum'): void
}>()

const burnMomentum = () => {
  emit('burnMomentum')
}
</script>

<template>
  <p>Current momentum: {{ momentumStore.momentum }}</p>
  <span v-if="props.manual">
    <AdjustMomentumButton operation="adds" :amount="1" />
    <AdjustMomentumButton operation="subtracts" :amount="1" />
  </span>
  <p>
    <button type="button" :disabled="props.numberCancellable < 1" @click="burnMomentum">
      Burn momentum
    </button>
  </p>
</template>

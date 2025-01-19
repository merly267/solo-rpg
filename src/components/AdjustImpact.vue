<script setup lang="ts">
import { useImpactsStore } from '@/stores/ImpactsStore'
import type { ImpactOperation } from '@/types'

const { operation, impact } = defineProps<{
  operation: ImpactOperation
  impact: string
}>()

const impactsStore = useImpactsStore()

const impactToAdjust = impactsStore.impacts.find((imp) => imp.name === impact)

const clearImpact = () => {
  if (operation === 'Clear') {
    impactsStore.clearImpact(impact)
  }
}

const markImpact = () => {
  if (operation === 'Mark') {
    impactsStore.markImpact(impact)
  }
}
</script>

<template>
  <button v-if="operation === 'Mark'" @click="markImpact" :disabled="impactToAdjust!.status">
    {{ operation }} {{ impact }}
  </button>
  <button
    v-if="operation === 'Clear'"
    @click="clearImpact"
    :disabled="impactToAdjust!.status === false"
  >
    {{ operation }} {{ impact }}
  </button>
</template>

<script setup lang="ts">
import { useImpactsStore } from '@/stores/ImpactsStore'
import type { ImpactOperation } from '@/types'

type PropTypes = {
  operation: ImpactOperation
  impact: string
}

const props = defineProps<PropTypes>()

const impactsStore = useImpactsStore()

const impactToAdjust = impactsStore.impacts.find((imp) => imp.name === props.impact)

const clearImpact = () => {
  if (props.operation === 'Clear') {
    impactsStore.clearImpact(props.impact)
  }
}

const markImpact = () => {
  if (props.operation === 'Mark') {
    impactsStore.markImpact(props.impact)
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

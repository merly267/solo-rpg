<script setup lang="ts">
import { useDebilitiesStore } from '@/stores/DebilitiesStore'
import type { DebilityOperation } from '@/types'

type PropTypes = {
  operation: DebilityOperation
  debility: string
}

const props = defineProps<PropTypes>()

const debilitiesStore = useDebilitiesStore()

const debilityToAdjust = debilitiesStore.debilities.find((deb) => deb.name === props.debility)

const clearDebility = () => {
  if (props.operation === 'Clear') {
    debilitiesStore.clearDebility(props.debility)
  }
}

const markDebility = () => {
  if (props.operation === 'Mark') {
    debilitiesStore.markDebility(props.debility)
  }
}
</script>

<template>
  <button v-if="operation === 'Mark'" @click="markDebility" :disabled="debilityToAdjust!.status">
    {{ operation }} {{ debility }}
  </button>
  <button
    v-if="operation === 'Clear'"
    @click="clearDebility"
    :disabled="debilityToAdjust!.status === false"
  >
    {{ operation }} {{ debility }}
  </button>
</template>

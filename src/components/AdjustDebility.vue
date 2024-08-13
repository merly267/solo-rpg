<script setup lang="ts">
import { useDebilitiesStore } from '@/stores/DebilitiesStore'
import type { DebilityOperation } from '@/types'

type PropTypes = {
  operation: DebilityOperation
  debility: string
}

const props = defineProps<PropTypes>()

const debilitiesStore = useDebilitiesStore()

const debilityToAdjust = debilitiesStore.newDebilities.find((deb) => deb.name === props.debility)

const markDebility = () => {
  if (props.operation === 'Mark') {
    debilitiesStore.markDebility(props.debility)
  }
}
</script>

<template>
  {{ debilityToAdjust }}
  <button v-if="operation === 'Mark'" @click="markDebility" :disabled="debilityToAdjust!.status">
    {{ operation }} {{ debility }}
  </button>
</template>

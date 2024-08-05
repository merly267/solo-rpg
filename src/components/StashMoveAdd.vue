<script setup lang="ts">
import { usestashedAddstore } from '@/stores/MoveAddsStore'
import type { StashedAdd } from '@/types'

type PropTypes = {
  text: string
  addToStash: StashedAdd
}

const props = defineProps<PropTypes>()

const stashedStore = usestashedAddstore()

const addToStashStore = () => {
  stashedStore.stashedAdds.push(props.addToStash)
  // stashedStore.clearLocalStorage()
}
</script>

<template>
  <button @click="addToStashStore">{{ props.text }}</button>
</template>

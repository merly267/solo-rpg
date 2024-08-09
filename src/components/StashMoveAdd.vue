<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { usestashedAddstore } from '@/stores/MoveAddsStore'
import type { StashedAdd } from '@/types'

type PropTypes = {
  text: string
  addToStash: StashedAdd
}

const props = defineProps<PropTypes>()

const stashedStore = usestashedAddstore()

const addToStashStore = () => {
  const toAdd = { ...props.addToStash, uuid: uuidv4() }
  stashedStore.stashedAdds.push(toAdd)
  // stashedStore.clearLocalStorage()
}
</script>

<template>
  <button @click="addToStashStore">{{ props.text }}</button>
</template>

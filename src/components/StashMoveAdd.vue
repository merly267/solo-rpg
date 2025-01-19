<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { usestashedAddstore } from '@/stores/MoveAddsStore'
import type { StashedAdd } from '@/types'

const { text, addToStash } = defineProps<{
  text: string
  addToStash: StashedAdd
}>()

const stashedStore = usestashedAddstore()

const addToStashStore = () => {
  const toAdd = { ...addToStash, uuid: uuidv4() }
  stashedStore.stashedAdds.push(toAdd)
  // stashedStore.clearLocalStorage()
}
</script>

<template>
  <button @click="addToStashStore">{{ text }}</button>
</template>

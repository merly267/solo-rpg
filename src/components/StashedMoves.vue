<script setup lang="ts">
import { toRefs } from 'vue'
import { usestashedAddstore } from '@/stores/MoveAddsStore'
import type { StashedAdd } from '@/types'

const { stashedAdds } = toRefs(usestashedAddstore())

// const emit = defineEmits<{
//   (e: 'useStashedAdd', add: number): void
// }>()

// const useStashedAdd = (add: number) => {
//   emit('useStashedAdd', add)
// }
</script>

<template>
  <div v-for="stash in stashedAdds" :key="stash.uuid">
    <input
      type="checkbox"
      :id="stash.uuid"
      name="stashed"
      :checked="stash.nextOnly"
      v-model="stash.selected"
    />
    <label :for="stash.uuid">Add +{{ stash.add }} from {{ stash.source }}.</label>
  </div>
</template>

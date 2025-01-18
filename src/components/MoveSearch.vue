<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { movesList } from '@/moves'
import type { Move } from '@/types'

const movesArray = Object.entries(movesList).map((i) => i[1])

const search = ref('')
const results = ref<Move[]>([])
const isOpen = ref(false)
const moveSelected = ref(false)
const selectedMove = ref('')

const onChange = () => {
  isOpen.value = true
  filterResults()
}

const filterResults = () => {
  results.value = movesArray.filter(
    (item) => item.title.toLowerCase().indexOf(search.value.toLowerCase()) > -1
  )
}

const setResult = (result: string) => {
  isOpen.value = false
  moveSelected.value = true
  selectedMove.value = result
}

const getComponent = (name: string) => {
  if (moveSelected.value) {
    return defineAsyncComponent({
      loader: () => import(`@/views/moves/${name}.vue`)
    })
  }
}
</script>

<template>
  <input type="text" v-model="search" @input="onChange" />
  <ul class="results" v-show="isOpen">
    <li v-for="(move, i) in results" :key="i" @click="setResult(move.componentName)">
      {{ move }}
    </li>
  </ul>
  <component v-if="selectedMove" :is="getComponent(selectedMove)"></component>
</template>

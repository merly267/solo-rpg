<script setup lang="ts">
import { ref } from 'vue'
import { movesList } from '@/moves'
import type { Move } from '@/types'

const movesArray = Object.entries(movesList).map((i) => i[1])

const search = ref('')
const results = ref<Move[]>([])
const isOpen = ref(false)

const filterResults = () => {
  results.value = movesArray.filter(
    (item) => item.title.toLowerCase().indexOf(search.value.toLowerCase()) > -1
  )
}

const setResult = (result: string) => {
  search.value = result
  isOpen.value = false
}

const onChange = () => {
  isOpen.value = true
  filterResults()
}
</script>

<template>
  <input type="text" v-model="search" @input="onChange" />
  <ul class="results" v-show="isOpen">
    <li v-for="(result, i) in results" :key="i" @click="setResult(result.title)">
      {{ result }}
    </li>
  </ul>
</template>

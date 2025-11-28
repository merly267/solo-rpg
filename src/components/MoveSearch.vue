<script setup lang="ts">
import { watch, defineAsyncComponent, hydrateOnVisible, onUpdated, ref, useTemplateRef } from 'vue'
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
      loader: () => import(`@/views/moves/${name}.vue`),
      hydrate: hydrateOnVisible()
    })
  }
}

const selectedMoveDiv = useTemplateRef('selected-move')

onUpdated(() => {
  watch(moveSelected, async () => {
    if (moveSelected.value) {
      console.log(selectedMoveDiv.value)
      selectedMoveDiv.value?.scrollTo(0, 0)
    }
  })
})

// watchEffect(async () => {
//   if (moveSelected.value) {
//     console.log(selectedMoveDiv.value)
//     selectedMoveDiv.value?.scrollTo(0, 0)
//     console.log('done?')
//   }
// })
</script>

<template>
  <input
    type="text"
    v-model="search"
    id="moveSearch"
    placeholder="Search for a move"
    @input="onChange"
  />
  <div class="results" v-show="isOpen">
    <dl
      v-for="(move, index) in results"
      :key="`move-${index}`"
      @click="setResult(move.componentName)"
    >
      <dt class="move">{{ move.title }}</dt>
      <dd class="trigger">{{ move.trigger }}.</dd>
    </dl>
  </div>
  <div ref="selected-move">Hey</div>
  <component v-if="selectedMove" :is="getComponent(selectedMove)"></component>
</template>

<style scoped>
input {
  position: relative;
  min-height: 3em;
  width: calc(100% - 0.5rem);
  margin-top: 0;
  padding-left: 0.5em;
  z-index: 1;
}
dl {
  margin: 0;
  cursor: pointer;
}
.trigger {
  display: inline-block;
  font-size: 0.95rem;
  margin: 0;
}

.trigger::first-letter {
  text-transform: capitalize;
}

@media (min-width: 768px) {
  dt,
  .trigger {
    display: inline;
  }
  .trigger:before {
    content: ' - ';
  }
}
</style>

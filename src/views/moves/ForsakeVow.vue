<script setup lang="ts">
import { computed, ref, toRaw } from 'vue'
import MoveLayout from '@/components/MoveLayout.vue'
import TrackInfo from '@/components/TrackInfo.vue'
import { movesList } from '@/moves'
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'

const move = movesList.forsakeVow
const swearMove = movesList.swearVow
const progressTrackStore = useProgressTrackStore()

const noVow = computed(() => {
  if (progressTrackStore.activeVows.length) {
    return false
  }
  return true
})

const multipleVows = computed(() => {
  if (progressTrackStore.activeVows.length <= 1) {
    return false
  }
  return true
})

const selectedVowUuid = ref(progressTrackStore.lastTouchedVow)

const selectedVow = computed(() => {
  return progressTrackStore.activeVows.find((vow) => vow.uuid === selectedVowUuid.value)
})

const setLastTouched = (event: Event) => {
  const target = event.target as HTMLInputElement
  progressTrackStore.setLastTouched('Vow', target.value)
}

const clearedVow = ref(selectedVow.value)

let moveMade = ref(false)

const makeMove = () => {
  moveMade.value = true
}

const clearVow = () => {
  progressTrackStore.markForsaken(selectedVowUuid.value, 'Vow')
  makeMove()
}

</script>
<template>
  <MoveLayout>
    <template #text>
      <h2>{{ move.title }}</h2>
      <p>
        When you <strong>{{ move.trigger }}</strong>, 
        <button @click="clearVow">Clear the vow</button>
      </p>
      <div v-if="noVow && !moveMade">
          First you must
          <button @click="$router.push(`/moves/${swearMove.slug}`)">
            {{ swearMove.title }}
          </button>
        </div>
        <div v-if="multipleVows">
          <label for="vow-select">Choose a vow: </label>
          <select name="vows" id="vow-select" v-model="selectedVowUuid" @change="setLastTouched">
            <option
              v-for="vow in progressTrackStore.activeVows"
              :key="`vow-${vow.uuid}`"
              :value="vow.uuid"
            >
              {{ vow.name }}
            </option>
          </select>
        </div>
        <div v-if="selectedVow">
          <TrackInfo
            :name="selectedVow.name"
            :rank="selectedVow.rank"
            :progress="selectedVow.progress"
          />
        </div>
        <div v-if="moveMade && clearedVow">
          <TrackInfo
            :name="clearedVow.name"
            :rank="clearedVow.rank"
            :progress="clearedVow.progress"
            :status="clearedVow.status"
          />
        </div>
    </template>
  </MoveLayout>
</template>
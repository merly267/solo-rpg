<script setup lang="ts">
import { computed, ref } from 'vue'
import MoveLayout from '@/components/MoveLayout.vue'
import TrackInfo from '@/components/TrackInfo.vue'
import { movesList } from '@/moves'
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'

const move = movesList.reachMilestone
const swearMove = movesList.swearVow

const progressTrackStore = useProgressTrackStore()

const noVow = computed(() => {
  if (progressTrackStore.vows.length) {
    return false
  }
  return true
})

const oneVow = computed(() => {
  if (progressTrackStore.vows.length === 1) {
    return false
  }
  return true
})

const selectedVowUuid = ref(progressTrackStore.lastTouchedVow)

const selectedVow = computed(() => {
  return progressTrackStore.vows.find((vow) => vow.uuid === selectedVowUuid.value)
})

const setLastTouched = (event: Event) => {
  const target = event.target as HTMLInputElement
  progressTrackStore.setLastTouched(target.value)
}

const makeMove = () => {
  progressTrackStore.markProgress(selectedVowUuid.value)
}
</script>
<template>
  <MoveLayout>
    <template #text>
      <h2>{{ move.title }}</h2>
      <p>
        When you <strong>{{ move.trigger }}</strong> by overcoming a critical obstacle, completing a
        perilous journey, solving a complex mystery, defeating a powerful threat, gaining vital
        support, or acquiring a crucial item, you may mark progress.
      </p>
      <div v-if="noVow">
        First you must
        <button @click="$router.push(`/moves/${swearMove.slug}`)">
          {{ swearMove.title }}
        </button>
      </div>
      <div>
        <div v-if="oneVow">
          <label for="vow-select">Choose a vow:</label>
          <select name="vows" id="vow-select" v-model="selectedVowUuid" @change="setLastTouched">
            <option
              v-for="vow in progressTrackStore.vows"
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
          <button :disabled="selectedVow.status === 'Full'" @click="makeMove">Mark Progress</button>
          <button @click="progressTrackStore.resetProgress(selectedVow.uuid)">
            Reset progress
          </button>
        </div>
      </div>
    </template>
  </MoveLayout>
</template>

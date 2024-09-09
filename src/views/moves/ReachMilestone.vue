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

const makeMove = () => {
  progressTrackStore.markProgress(selectedVowUuid.value)
}
</script>
<template>
  <MoveLayout>
    <template #text>
      <h2>{{ move.title }}</h2>
      <p>
        When you <strong>{{ move.trigger }}</strong> by doing any of the following... 
        <ul>
          <li>overcoming a critical obstacle</li>
          <li>gaining meaningful insight</li>
          <li>completing a perilous expedition</li>
          <li>acquiring a crucial item or resource</li>
          <li>earning vital support</li>
          <li>defeating a notable foe</li>
        </ul>
        ... you may mark progres per the rank of the vow.
      </p>
      <div v-if="noVow">
        First you must
        <button @click="$router.push(`/moves/${swearMove.slug}`)">
          {{ swearMove.title }}
        </button>
      </div>
      <div>
        <div v-if="multipleVows">
          <label for="vow-select">Choose a vow:</label>
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
          <button :disabled="selectedVow.status === 'Full'" @click="makeMove">Mark Progress</button>
          <button @click="progressTrackStore.resetProgress(selectedVow.uuid)">
            Reset progress
          </button>
        </div>
      </div>
    </template>
  </MoveLayout>
</template>

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

// default to first vow in list
const selectedVowUuid = ref(progressTrackStore.vows[0].uuid)

const selectedVow = computed(() => {
  return progressTrackStore.vows.find((vow) => vow.uuid === selectedVowUuid.value)
})

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
      <div v-else>
        <label for="vow-select">Choose a vow:</label>
        <select name="vows" id="vow-select" v-model="selectedVowUuid">
          <option v-for="vow in progressTrackStore.vows" :key="`vow-${vow.uuid}`" :value="vow.uuid">
            {{ vow.name }}
          </option>
        </select>
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

<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ProgressMove from '@/components/ProgressMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import TrackInfo from '@/components/TrackInfo.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'

const move = movesList.fulfillVow
const swearMove = movesList.swearVow

const progressTrackStore = useProgressTrackStore()

const noVow = computed(() => {
  if (progressTrackStore.vows.length) {
    return false
  }
  return true
})

const multipleVows = computed(() => {
  if (progressTrackStore.vows.length <= 1) {
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
</script>
<template>
  <MoveLayout>
    <template #text>
      <ProgressMove :title="move.title">
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, roll the challenge dice and compare to your progress. Momentum is ignored on this roll.
        </p>
        <div v-if="noVow">
          First you must
          <button @click="$router.push(`/moves/${swearMove.slug}`)">
            {{ swearMove.title }}
          </button>
        </div>
        <div v-if="multipleVows">
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
        </div>
      </ProgressMove>
    </template>
  </MoveLayout>
</template>

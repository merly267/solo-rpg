<script setup lang="ts">
import { computed, ref, toRaw } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import CreateProgressTrack from '@/components/CreateProgressTrack.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import TrackInfo from '@/components/TrackInfo.vue'
import { movesList } from '@/moves'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'
import type { StatName } from '@/types'

const move = movesList.reachMilestone
const swearMove = movesList.swearVow

const progressTrackType = 'Vow'

const progressTrackStore = useProgressTrackStore()

const noVow = computed(() => {
  if (progressTrackStore.vows.length) {
    return false
  }
  return true
})

const selectedVow = progressTrackStore.vows[0]

const addVow = () => {
  progressTrackStore.newTrack.uuid = uuidv4()
  progressTrackStore.newTrack.type = progressTrackType
  const newVow = structuredClone(toRaw(progressTrackStore.newTrack))
  progressTrackStore.vows.push(newVow)
}

const clearVow = () => {
  progressTrackStore.clearNewTrack()
  // to clear vows list from local storage
  // progressTrackStore.clearLocalStorage()
}

const makeMove = () => {
  progressTrackStore.markProgress(selectedVow.uuid)
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
        <TrackInfo
          :name="selectedVow.name"
          :rank="selectedVow.rank"
          :progress="selectedVow.progress"
        />
        <button @click="makeMove">Mark Progress</button>
      </div>
      <pre>{{ selectedVow }}</pre>

      <!-- <ActionMove
        v-if="selectedStat"
        :title="move.title"
        :stat="selectedStat.score"
        :adds="moveAdds"
        :disabled="noVow"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, write your vow and give the quest a rank:
        </p>
        <CreateProgressTrack :type="progressTrackType" />
        <p>Then, roll +{{ selectedStat.name }} ({{ selectedStat.score }}).</p>
        <input type="checkbox" id="bondAadds" name="adds" v-model="bondAadds" />
        <label for="bondAadds"
          >If you make this vow to a person or community with whom you share a bond, add +1.</label
        >
      </ActionMove> -->
    </template>
  </MoveLayout>
</template>

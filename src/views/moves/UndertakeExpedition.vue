<script setup lang="ts">
import { ref, computed } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'
import CreateProgressTrack from '@/components/CreateProgressTrack.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import TrackInfo from '@/components/TrackInfo.vue'
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

const move = movesList.undertakeExpedition
const progressTrackType = 'Expedition'

const findStat = (statToFind: StatName) => statsList.value.find((stat) => stat.name === statToFind)

let selectedStatName = ref<string>('')

const selectedStat = computed(() => {
  if (selectedStatName.value.length) {
    const thisStat = statsList.value.find((stat) => stat.name === selectedStatName.value)
    return thisStat
  }
  return {
    name: '',
    score: 0
  }
})

const moveAdds = 0

const progressTrackStore = useProgressTrackStore()

const noNewExpedition = computed(() => {
  if (
    progressTrackStore.newTrack.name.length && progressTrackStore.newTrack.rank
  ) {
    return false
  }
  return true
})

const addTrack = () => {
  progressTrackStore.addTrack(progressTrackType)
}

const selectedExpeditionUuid = ref(progressTrackStore.lastTouchedExpedition)

const selectedExpedition = computed(() => {
  return progressTrackStore.expeditions.find((expedition) => expedition.uuid === selectedExpeditionUuid.value)
})

const moveMade = ref(false)

const makeMove = () => {
  moveMade.value = true
}

const clearMove = () => {
  moveMade.value = false
}
</script>
<template>
  <MoveLayout>
    <template #text>
      <ActionMove
        v-if="selectedStat"
        :title="move.title"
        :stat="selectedStat.score"
        :adds="moveAdds"
        :disabled="!selectedStatName.length"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <pre>{{ progressTrackStore.activeVows }}</pre>
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, give the expedition a name and rank:
        </p>
        <!-- only show if no incomplete expeditions or if create new expedition option chosen -->
        <div>
          <CreateProgressTrack :type="progressTrackType" />
          <button @click="addTrack" :disabled="noNewExpedition">Create Expedition</button>
        </div>
        <div v-if="selectedExpedition">
          <TrackInfo
            :name="selectedExpedition.name"
            :rank="selectedExpedition.rank"
            :progress="selectedExpedition.progress"
          />
        </div>
        <p>Then, for each segment of the expedition, envision your approach. If you…</p>
        <fieldset>
          <div>
            <input
              type="radio"
              name="chooseStat"
              id="speed"
              value="Edge"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label for="speed">Move at speed: Roll +edge ({{ findStat('Edge')?.score }}).</label>
          </div>
          <div>
            <input
              type="radio"
              name="chooseStat"
              id="lowProfile"
              value="Shadow"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label for="lowProfile"
              >Keep a low profile: Roll +shadow ({{ findStat('Shadow')?.score }}).</label
            >
          </div>
          <div>
            <input
              type="radio"
              name="chooseStat"
              id="vigilant"
              value="Wits"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label for="vigilant">Stay vigilant: Roll +wits ({{ findStat('Wits')?.score }}).</label>
          </div>
        </fieldset>
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>
            You reach a waypoint. Envision the location and mark progress per the rank of the expedition.
          </p>
        </template>
        <template v-slot:weak>
          <p>
            You reach a waypoint. Envision the location and mark progress per the rank of the expedition, but this progress costs you. Choose one:
            <ul>
              <li>Suffer costs en route: Make a suffer move (-2), or two suffer moves (-1)</li>
              <li>Face a peril at the waypoint: Envision what you encounter.</li>
            </ul>
          </p>
        </template>
        <template v-slot:miss>
          <p>
            You are waylaid by a crisis, or arrive at a waypoint to confront an immediate hardship or threat. Do not mark progress, and Pay the Price.
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

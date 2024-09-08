<script setup lang="ts">
import { ref, computed } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'
import CreateProgressTrack from '@/components/CreateProgressTrack.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
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

const noSelectedExpedition = computed(() => {
  if (
    progressTrackStore.newTrack.name.length &&
    progressTrackStore.newTrack.rank > 0 &&
    selectedStatName.value.length
  ) {
    return false
  }
  return true
})

const moveMade = ref(false)

const makeMove = () => {
  progressTrackStore.addTrack(progressTrackType)
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
        :disabled="noSelectedExpedition"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <pre>{{ progressTrackStore }}</pre>
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, give the expedition a name and rank:
        </p>
        <CreateProgressTrack :type="progressTrackType" />
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
  </MoveLayout>
</template>

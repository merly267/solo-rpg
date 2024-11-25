<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import TrackInfo from '@/components/TrackInfo.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'

const move = movesList.exploreWaypoint
const newExpeditionMove = movesList.undertakeExpedition

const progressTrackStore = useProgressTrackStore()

const noExpedition = computed(() => {
  if (progressTrackStore.activeExpeditions.length) {
    return false
  }
  return true
})

const multipleExpeditions = computed(() => {
  if (progressTrackStore.activeExpeditions.length <= 1) {
    return false
  }
  return true
})

const selectedExpeditionUuid = ref(progressTrackStore.lastTouchedExpedition)

const selectedExpedition = computed(() => {
  return progressTrackStore.activeExpeditions.find(
    (expedition) => expedition.uuid === selectedExpeditionUuid.value
  )
})

const setLastTouched = (event: Event) => {
  const target = event.target as HTMLInputElement
  progressTrackStore.setLastTouched('Expedition', target.value)
}

const statForMove: StatName = 'Wits'

const selectedStat = statsList.value.find((stat) => stat.name === statForMove)

const moveAdds = 0

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
        :disabled="noExpedition"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <div v-if="noExpedition">
          First you must
          <button @click="$router.push(`/moves/${newExpeditionMove.slug}`)">
            {{ newExpeditionMove.title }}
          </button>
        </div>
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, roll +{{ selectedStat.name }} ({{ selectedStat.score }}).
        </p>
        <div v-if="multipleExpeditions">
          <label for="expedition-select">Divert from:</label>
          <select name="expeditions" id="expedition-select" v-model="selectedExpeditionUuid" @change="setLastTouched">
            <option
              v-for="expedition in progressTrackStore.activeExpeditions"
              :key="`expedition-${expedition.uuid}`"
              :value="expedition.uuid"
            >
              {{ expedition.name }}
            </option>
          </select>
        </div>
        <div v-if="selectedExpedition">
          <TrackInfo
            :name="`Divert from: ${selectedExpedition.name}`"
            :rank="selectedExpedition.rank"
            :progress="selectedExpedition.progress"
          />
        </div>
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <!-- TODO Check for match -->
           <p>On a strong hit, choose one. On a strong hit with a match, you may instead Make a Discovery.
            <!-- TODO - MAKE RADIOS -->
✴ Find an opportunity: Envision a favorable insight, situation, resource, or encounter. Then, take +2 momentum.
<!-- TODO - MARK EXPEDITION PROGRESS -->
✴ Gain progress: Mark progress on your expedition, per its rank.</p>
          <p>
            You discover something helpful and specific. The path you must follow or action you must
            take to make progress is made clear. Envision what you learn. Then
            <AdjustMomentumButton operation="adds" :amount="2" />.
          </p>
        </template>
        <template v-slot:weak>
          <p>
            You uncover something interesting, but it is bound up in a peril or reveals an ominous aspect of this place. Envision what you encounter. Then
            <AdjustMomentumButton operation="adds" :amount="1" />.
          </p>
        </template>
        <template v-slot:miss>
          <p>
            <!-- TODO Check for match -->
            You encounter an immediate hardship or threat, and must Pay the Price. On a miss with a match, you may instead Confront Chaos.
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>
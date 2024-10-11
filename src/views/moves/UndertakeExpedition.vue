<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'
import CreateProgressTrack from '@/components/CreateProgressTrack.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import TrackInfo from '@/components/TrackInfo.vue'
import { useDiceStore } from '@/stores/DiceStore'
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

const diceStore = useDiceStore()

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

const multipleExpeditions = computed(() => {
  if (progressTrackStore.activeExpeditions.length <= 1) {
    return false
  }
  return true
})

const addNewExpedition = ref<boolean>(false)

const createNewExpedition = () => {
  addNewExpedition.value === false ? addNewExpedition.value = true : addNewExpedition.value = false
}

const addTrack = () => {
  progressTrackStore.addTrack(progressTrackType)
}

const updatingProgressTrackSTore = storeToRefs(progressTrackStore)

const selectedExpeditionUuid = updatingProgressTrackSTore.lastTouchedExpedition

const selectedExpedition = computed(() => {
  return progressTrackStore.expeditions.find((expedition) => expedition.uuid === selectedExpeditionUuid.value)
})

const setLastTouched = (event: Event) => {
  const target = event.target as HTMLInputElement
  progressTrackStore.setLastTouched(progressTrackType, target.value)
}

const moveMade = ref(false)

const makeMove = () => {
  moveMade.value = true
  if (diceStore.successes.length > 0) {
    progressTrackStore.markProgress(selectedExpeditionUuid.value, progressTrackType)
  }
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
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, give the expedition a name and rank:
        </p>
        <div v-if="multipleExpeditions">
          <label for="expedition-select">Choose an expedition:</label>
          <select name="expeditions" id="expedition-select" v-model="selectedExpeditionUuid" @change="setLastTouched">
            <option
              v-for="expedition in progressTrackStore.activeExpeditions"
              :key="`expedition-${expedition.uuid}`"
              :value="expedition.uuid"
            >
              {{ expedition.name }}
            </option>
          </select>
          or
        </div>
        <div class="expeditions-info">
        <div v-if="progressTrackStore.activeExpeditions.length === 0 || addNewExpedition" class="add-track">
          <CreateProgressTrack :type="progressTrackType" /> 
          <button @click="addTrack" :disabled="noNewExpedition">Create Expedition</button>
        </div>
        <div v-if="selectedExpedition" class="expedition-track">
          <TrackInfo
            :name="selectedExpedition.name"
            :rank="selectedExpedition.rank"
            :progress="selectedExpedition.progress"
          />
        </div>
        <div class="new-expedition">or <button v-if="progressTrackStore.activeExpeditions.length > 0" @click="createNewExpedition">Undertake a new expedition</button></div>
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

<style scoped>
@media (min-width: 768px) {
  .expeditions-info {
    display: grid;
    grid-template-columns: auto auto;
  }
  .add-track {
    grid-column: 1 / span 2;
  }
  .expedition-track{
    margin-top: -0.4em;
  }
  .new-expedition:before {
    content: "\00a0";
  }
}
</style>
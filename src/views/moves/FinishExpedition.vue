<script setup lang="ts">
import { computed, ref } from 'vue'
import ChallengeDice from '@/components/ChallengeDice.vue'
import ProgressMove from '@/components/ProgressMove.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import TrackInfo from '@/components/TrackInfo.vue'
import { movesList } from '@/moves'
import { useDiceStore } from '@/stores/DiceStore'
import { useLegacyTrackStore } from '@/stores/LegacyTrackStore'
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'

const diceStore = useDiceStore()

const move = movesList.finishExpedition
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

const progressScore = computed(() => {
  if (selectedExpedition.value) {
    return Math.floor(selectedExpedition.value.progress)
  }
  return 0
})

const setLastTouched = (event: Event) => {
  const target = event.target as HTMLInputElement
  progressTrackStore.setLastTouched('Expedition', target.value)
}

const legacyTrackStore = useLegacyTrackStore()
const moveMade = ref(false)

const makeMove = () => {
  if (selectedExpedition.value && diceStore.successes.length > 0){
    progressTrackStore.markComplete(selectedExpeditionUuid.value, 'Expedition')
    if (diceStore.successes.length === 2) {
      markLegacyProgress(selectedExpedition.value.rank)
    } else {
      markLegacyProgress(selectedExpedition.value.rank - 1)
    }
  }
  moveMade.value = true
}

const markLegacyProgress = (rank: number) => {
  legacyTrackStore.markDiscoveryProgress(rank)
}

const returnExp = ref<boolean>(false)

const returnToExpedition = () => {
  returnExp.value = true
  findLowestChallengeDie()
  raiseRank()
}

const adjustProgress = (lostProgress: number) => {
  if (selectedExpedition.value) {
    const fullBoxes = Math.ceil(selectedExpedition.value.progress)
    if (fullBoxes - lostProgress == 0) {
      selectedExpedition.value.progress =0
    } else {
      selectedExpedition.value.progress = fullBoxes - lostProgress
    }
  }
}

const findLowestChallengeDie = () => {
  diceStore.challengeDice.forEach((die) => diceStore.clear(die))
  diceStore.challengeDice.forEach((die) => diceStore.roll(die))
  diceStore.showLowest = true
  const results = diceStore.challengeDice.map(die => die.result)
  const lowest = Math.min(...results)
  diceStore.challengeDice.forEach((die) => die.result === lowest ? die.lowest = true : !die.lowest )
  adjustProgress(lowest)
}

const raiseRank = () => {
  if (selectedExpedition.value && selectedExpedition.value.rank < 5) {
    selectedExpedition.value.rank += 1
  }
}

const clearMove = () => {
  moveMade.value = false
  returnExp.value = false
  diceStore.showLowest = false
}

</script>
<template>
  <MoveLayout>
    <template #text>
      <ProgressMove :title="move.title" :progressScore="progressScore" :hideDice="returnExp" @makeMove="makeMove" @clearMove="clearMove">
        <p>
          When <strong>{{ move.trigger }}</strong
          >, roll the challenge dice and compare to your progress.
        </p>
        <div v-if="noExpedition">
          First you must
          <button @click="$router.push(`/moves/${newExpeditionMove.slug}`)">
            {{ newExpeditionMove.title }}
          </button>
        </div>
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
        </div>
        <div v-if="selectedExpedition">
          <TrackInfo
            :name="selectedExpedition.name"
            :rank="selectedExpedition.rank"
            :progress="selectedExpedition.progress"
          />
        </div>
      </ProgressMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>
            You reach your destination or complete your survey.
          </p>
        </template>
        <template v-slot:weak>
          <p>You reach your destination or complete your survey, but you face an unforeseen complication at the end of your expedition. Make the legacy reward one rank lower (none for a troublesome expedition), and envision what you encounter.</p>
        </template>
        <template v-slot:miss>
          <p>
            Your destination is lost to you, or you come to understand the true nature or cost of the expedition. Envision what happens and choose one.:
            <ul>
              <li>Abandon the expedition: Envision the cost of this setback and Pay the Price.</li>
              <li>Return to the expedition: Roll both challenge dice, take the lowest value, and clear that number of progress boxes. Then, raise the expedition’s rank by one (if not already epic). <button @click="returnToExpedition">Return</button>
                <div v-if="returnExp">
                  <ChallengeDice />
                  <button @click="clearMove">Clear</button>
                </div>
              </li>
            </ul>
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

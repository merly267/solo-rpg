<script setup lang="ts">
import { computed, ref } from 'vue'
import ProgressMove from '@/components/ProgressMove.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import TrackInfo from '@/components/TrackInfo.vue'
import { movesList } from '@/moves'
import { useDiceStore } from '@/stores/DiceStore'
import { useLegacyTrackStore } from '@/stores/LegacyTrackStore'
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'

const diceStore = useDiceStore()

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

const progressScore = computed(() => {
  if (selectedVow.value) {
    return Math.floor(selectedVow.value.progress)
  }
  return 0
})

const setLastTouched = (event: Event) => {
  const target = event.target as HTMLInputElement
  progressTrackStore.setLastTouched(target.value)
}

const legacyTrackStore = useLegacyTrackStore()
const moveMade = ref(false)

const makeMove = () => {
  // progressTrackStore.resetStatus(selectedVowUuid.value)
  if (selectedVow.value && diceStore.successes.length > 0){
    progressTrackStore.markComplete(selectedVowUuid.value)
    if (diceStore.successes.length === 2) {
      markLegacyProgress(selectedVow.value.rank)
    }
  }
  moveMade.value = true
}

const markLegacyProgress = (rank: number) => {
  legacyTrackStore.markQuestProgress(rank)
}

</script>
<template>
  <MoveLayout>
    <template #text>
      <pre>diceStore.successes: {{ diceStore.successes.length }}</pre>
      <ProgressMove :title="move.title" :progressScore="progressScore" @makeMove="makeMove">
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, roll the challenge dice and compare to your progress.
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
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>
            Your vow is fulfilled. Mark a reward on your quests legacy track per the vow's rank.
          </p>
        </template>
        <template v-slot:weak>
          <p>
            Your vow is fulfilled, but there is more to be done or you realize the truth of your quest. If you <router-link :to="{ path: `/moves/${swearMove.slug}` }">{{ swearMove.title }}</router-link> to set things right, take your full legacy reward. Otherwise, make the legacy reward one rank lower (none for a troublesome quest).
          </p>
        </template>
        <template v-slot:miss>
          <p>
            Your vow is undone through an unexpected complication or realization. Envision what happens and choose one:
            <ul>
              <li>Give up on the quest: Forsake Your Vow</li>
              <li>Recommit to the quest: Roll both challenge dice, take the lowest value, and clear that number of progress boxes. Then, raise the vow's rank by one (if not already epic).</li>
              
            </ul>
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

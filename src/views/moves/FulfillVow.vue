<script setup lang="ts">
import { computed, ref } from 'vue'
import ProgressMove from '@/components/ProgressMove.vue'
import AdjustExperienceButton from '@/components/AdjustExperienceButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import TrackInfo from '@/components/TrackInfo.vue'
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

const moveMade = ref(false)

const makeMove = () => {
  moveMade.value = true
}

const fullExperience = computed(() => {
  if (selectedVow.value) {
    return selectedVow.value.rank
  }
  return 0
})
</script>
<template>
  <MoveLayout>
    <template #text>
      <ProgressMove :title="move.title" :progressScore="progressScore" @makeMove="makeMove">
        calculateFullExperience: <pre>{{ fullExperience }}</pre>
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
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>
            Your quest is complete. <AdjustExperienceButton operation="mark" :amount="fullExperience" />
          </p>
        </template>
        <template v-slot:weak>
          <p>
            There is more to be done or you realize the truth of your quest. Envision what you
            discover (Ask the Oracle if unsure). Then, <AdjustExperienceButton operation="mark" :amount="fullExperience - 1" />. You may
            <button @click="$router.push(`/moves/${swearMove.slug}`)">
              {{ swearMove.title }}
            </button>
            to set things right. If you do, add +1.
          </p>
        </template>
        <template v-slot:miss>
          <p>
            Your quest is undone. Envision what happens (Ask the Oracle if unsure), and choose one:
            <ul>
              <li>You recommit: Clear all but one filled progress, and raise the quest’s rank by one (if not already epic).</li>
              <li>You give up: Forsake Your Vow</li>
            </ul>
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

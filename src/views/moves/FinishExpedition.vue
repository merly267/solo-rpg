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
    }
  }
  moveMade.value = true
}

const markLegacyProgress = (rank: number) => {
  legacyTrackStore.markDiscoveryProgress(rank)
}

</script>
<template>
  <MoveLayout>
    <template #text>
      <ProgressMove :title="move.title" :progressScore="progressScore" :hideDice="recommit" @makeMove="makeMove" @clearMove="clearMove">
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
          <p>Your vow is fulfilled, but there is more to be done or you realize the truth of your quest.</p>
            <fieldset>
              <div>
                <input
                  type="radio"
                  name="chooseReward"
                  id="full"
                  value="full"
                  v-model="chosenReward"
                />
                <label for="full">
                  If you <router-link :to="{ path: `/moves/${swearMove.slug}` }">{{ swearMove.title }}</router-link> to set things right, take your full legacy reward.
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="chooseReward"
                  id="lower"
                  value="lower"
                  v-model="chosenReward"
                />
                <label for="lower">
                  Otherwise, make the legacy reward one rank lower (none for a troublesome quest).
                </label>
              </div>
            </fieldset>
            <button :disabled="chosenReward === ''" @click="takeRewards">
              Take rewards
            </button>
        </template>
        <template v-slot:miss>
          <p>
            Your vow is undone through an unexpected complication or realization. Envision what happens and choose one:
            <ul>
              <li>Give up on the quest: Forsake Your Vow</li>
              <li>Recommit to the quest: Roll both challenge dice, take the lowest value, and clear that number of progress boxes. Then, raise the vow's rank by one (if not already epic). <button @click="recommitToQuest">Recommit</button>
                <div v-if="recommit">
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

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

const chosenReward = ref<string>('')

const rewards = computed(() => {
  if (selectedVow.value) {
    if (chosenReward.value === 'full') {
      return selectedVow.value.rank
    }
    if (chosenReward.value === 'lower') {
      return selectedVow.value.rank - 1
    }
  }
  return 0
})

const takeRewards = () => {
  legacyTrackStore.markQuestProgress(rewards.value)
}

const markLegacyProgress = (rank: number) => {
  legacyTrackStore.markQuestProgress(rank)
}

const recommit = ref<boolean>(false)

const recommitToQuest = () => {
  recommit.value = true
  findLowestChallengeDie()
  raiseRank()
}

const adjustProgress = (lostProgress: number) => {
  if (selectedVow.value) {
    const fullBoxes = Math.ceil(selectedVow.value.progress)
    if (fullBoxes - lostProgress == 0) {
      selectedVow.value.progress =0
    } else {
      selectedVow.value.progress = fullBoxes - lostProgress
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
  if (selectedVow.value && selectedVow.value.rank < 5) {
    selectedVow.value.rank += 1
  }
}

const clearMove = () => {
  moveMade.value = false
  chosenReward.value = ''
  recommit.value = false
  diceStore.showLowest = false
}

</script>
<template>
  <MoveLayout>
    <template #text>
      <ProgressMove :title="move.title" :progressScore="progressScore" :hideDice="recommit" @makeMove="makeMove" @clearMove="clearMove">
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
            Your vow is fulfilled. You gain a reward on your quests legacy track per the vow's rank.
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
                </div>
              </li>
            </ul>
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

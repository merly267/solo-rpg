<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import RadioStatSelector from '@/components/RadioStatSelector.vue'
import StashMoveAdd from '@/components/StashMoveAdd.vue'
import { useMomentumStore } from '@/stores/MomentumStore'
import { usestashedAddstore } from '@/stores/MoveAddsStore'
import type { StashedAdd } from '@/types'
import { movesList } from '@/moves'

const move = movesList.secureAdvantage

const childComponent = ref<InstanceType<typeof RadioStatSelector>>()

const selectedStat = computed(() => {
  if (childComponent.value?.selectedStat) {
    return {
      name: childComponent.value.selectedStat.name,
      score: childComponent.value.selectedStat.score
    }
  }
  return {
    name: '',
    score: 0
  }
})

const stash: StashedAdd = {
  uuid: '',
  source: move.title,
  add: 1,
  nextOnly: true,
  selected: true
}

const moveAdds = 0

const moveMade = ref(false)
const cleared = ref(false)

watch(
  () => childComponent.value?.selectedStat,
  () => {
    if (childComponent.value?.selectedStat) {
      cleared.value = false
    }
  }
)

const makeMove = () => {
  moveMade.value = true
}

const momentumStore = useMomentumStore()
const stashedAddsStore = usestashedAddstore()

const rewardsTaken = ref(false)
const takeRewards = () => {
  momentumStore.addMomentum(2)
  stashedAddsStore.addToStash(stash)
  rewardsTaken.value = true
}
const takeMomentumRewards = () => rewardsTaken.value = true

const clearMove = () => {
  moveMade.value = false
  rewardsTaken.value = false
  cleared.value = true
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
        :disabled="!selectedStat.score"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, envision your action and roll. If you act...
        </p>
        <RadioStatSelector
          v-if="move.stats"
          :stats="move.stats"
          :cleared="cleared"
          ref="childComponent"
        />
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>
            You succeed. Take +2 momentum and add +1 on your next move (not a progress move).
            <button @click="takeRewards" :disabled="rewardsTaken">Take rewards</button>
          </p>
        </template>
        <template v-slot:weak>
          <div>
            <p>You succeed. Choose one.</p>
            <ul>
              <li><AdjustMomentumButton operation="adds" :amount="2" @click="takeMomentumRewards" :disabled="rewardsTaken" /></li>
              <li>
                <StashMoveAdd text="Add +1 on your next move" :addToStash="stash" @click="takeMomentumRewards" :disabled="rewardsTaken" /> (not a progress
                move).
              </li>
            </ul>
          </div>
        </template>
        <template v-slot:miss>
          <p>You fail or your assumptions betray you. Pay the Price.</p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import StashMoveAdd from '@/components/StashMoveAdd.vue'
import { useMomentumStore } from '@/stores/MomentumStore'
import { usestashedAddstore } from '@/stores/MoveAddsStore'
import type { StashedAdd, StatName } from '@/types'
import { movesList } from '@/moves'

const move = movesList.secureAdvantage

let selectedStatName = ref<String>('')

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

const matchInstruction = (statName: StatName) => {
  switch (statName) {
    case 'Edge':
      return 'With speed, mobility, or agility:'
    case 'Heart':
      return 'With resolve, command, or sociability:'
    case 'Iron':
      return 'With strength, endurance, or aggression:'
    case 'Shadow':
      return 'With deception, stealth, or trickery'
    case 'Wits':
      return 'With expertise, focus, or observation'
  }
}

const annotatedStatList = statsList.value.map((stat) => ({
  ...stat,
  instructions: matchInstruction(stat.name)
}))

const stash: StashedAdd = {
  uuid: '',
  source: move.title,
  add: 1,
  nextOnly: true,
  selected: true
}

const moveAdds = 0

const moveMade = ref(false)

const makeMove = () => {
  moveMade.value = true
}

const clearMove = () => {
  selectedStatName.value = ''
  moveMade.value = false
}

const momentumStore = useMomentumStore()
const stashedAddsStore = usestashedAddstore()

const takeRewards = () => {
  momentumStore.addMomentum(2)
  stashedAddsStore.addToStash(stash)
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
          When you <strong>{{ move.trigger }}</strong>, envision your action and roll. If you act...
        </p>
        <fieldset>
          <div v-for="(stat, index) in annotatedStatList" :key="`stat-${index}`">
            <input type="radio" :id="stat.name" :value="stat.name" v-model="selectedStatName" />
            <label :for="stat.name"
              >{{ stat.instructions }} Roll +{{ stat.name }}({{ stat.score }})</label
            >
          </div>
        </fieldset>
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>You succeed. Take +2 momentum and add +1 on your next move (not a progress move). <button @click="takeRewards">Take rewards</button></p>
        </template>
        <template v-slot:weak>
          <p>
            You succeed. Choose one.
            <ul>
              <li><AdjustMomentumButton operation="adds" :amount="2" /></li>
              <li><StashMoveAdd text="Add +1 on your next move" :addToStash=stash /> (not a progress move).</li>
            </ul>
          </p>
        </template>
        <template v-slot:miss>
          <p>
            You fail or your assumptions betray you. Pay the Price.
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

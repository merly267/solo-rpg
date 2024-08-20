<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import StashMoveAdd from '@/components/StashMoveAdd.vue'
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
      return 'With speed, agility, or precision:'
    case 'Heart':
      return 'With charm, loyalty, or courage:'
    case 'Iron':
      return 'With aggressive action, forceful defense, strength, or endurance:'
    case 'Shadow':
      return 'With deception, stealth, or trickery'
    case 'Wits':
      return 'With expertise, insight, or observation'
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
          <p>
            You gain advantage. Choose one.
            <ul>
              <li><StashMoveAdd text="Take control:" :addToStash=stash /> Make another move now (not a progress move); when you do, add +1.</li>
              <li>Prepare to act: <AdjustMomentumButton operation="adds" :amount="2" /></li>
            </ul>
          </p>
        </template>
        <template v-slot:weak>
          <p>
            Your advantage is short-lived. <AdjustMomentumButton operation="adds" :amount="1" />
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

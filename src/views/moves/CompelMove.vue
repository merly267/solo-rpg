<script setup lang="ts">
import { ref, computed } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

const move = movesList.compelMove

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
        :disabled="!selectedStatName.length"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, envision your approach. If you...
        </p>
        <fieldset>
          <div>
            <input
              type="radio"
              name="chooseStat"
              id="barter"
              value="Heart"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label for="barter"
              >Charm, pacify, encourage, or barter: roll +Heart ({{
                findStat('Heart')?.score
              }}).</label
            >
          </div>
          <div>
            <input
              type="radio"
              name="chooseStat"
              id="threaten"
              value="Iron"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label for="threaten"
              >Threaten or incite: roll +Iron ({{ findStat('Iron')?.score }}).</label
            >
          </div>
          <div>
            <input
              type="radio"
              name="chooseStat"
              id="steal"
              value="Shadow"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label for="steal"
              >Lie or swindle: roll +Shadow ({{ findStat('Shadow')?.score }}).</label
            >
          </div>
        </fieldset>
      </ActionMove>
    </template>
    <template #outcome> </template>
  </MoveLayout>
</template>

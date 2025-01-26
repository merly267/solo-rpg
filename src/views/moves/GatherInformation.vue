<script setup lang="ts">
import { ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

const move = movesList.gatherInfo

const statForMove: StatName = 'Wits'

const selectedStat = statsList.value.find((stat) => stat.name === statForMove)

const moveAdds = 0

const moveMade = ref(false)

const makeMove = () => {
  moveMade.value = true
}

const rewardsTaken = ref(false)
const takeRewards = () => rewardsTaken.value = true

const clearMove = () => {
  moveMade.value = false
  rewardsTaken.value = false
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
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, roll +{{ selectedStat.name }} ({{ selectedStat.score }}).
        </p>
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>
            You discover something helpful and specific. The path you must follow or action you must
            take to make progress is made clear. Envision what you learn. Then
            <AdjustMomentumButton operation="adds" :amount="2" @click="takeRewards" :disabled="rewardsTaken" />.
          </p>
        </template>
        <template v-slot:weak>
          <p>
            The information provides new insight, but also complicates your quest. Envision what you
            discover. Then
            <AdjustMomentumButton operation="adds" :amount="1" @click="takeRewards" :disabled="rewardsTaken" />.
          </p>
        </template>
        <template v-slot:miss>
          <p>
            Your investigation unearths a dire threat or reveals an unwelcome truth that undermines
            your quest. Pay the Price.
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

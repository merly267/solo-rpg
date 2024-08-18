<script setup lang="ts">
import { ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import { useCharacterStore } from '@/stores/CharacterStore'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import AdjustSupplyButton from '@/components/AdjustSupplyButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

const move = movesList.resupplyMove

const statForMove: StatName = 'Wits'
const selectedStat = statsList.value.find((stat) => stat.name === statForMove)

const moveAdds = 0

const characterStore = useCharacterStore()

const momentumForSupplyCost = ref<number>(2)
const payMomentumforSupply = () => {
  characterStore.takeSupply(momentumForSupplyCost.value)
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
      >
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, roll +{{ selectedStat.name }} ({{ selectedStat.score }}).
        </p>
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome>
        <template v-slot:strong>
          <p>
            You bolster your resources.
            <AdjustSupplyButton operation="take" :amount="2" />
          </p>
        </template>
        <template v-slot:weak>
          <p>Take up to +2 supply, but suffer -1 momentum for each:</p>
          <p>
            Take
            <input
              type="number"
              id="supplyTaken"
              name="supplyTaken"
              min="0"
              max="2"
              value="2"
              v-model="momentumForSupplyCost"
            />
            supply and
            <AdjustMomentumButton
              operation="subtracts"
              :amount="momentumForSupplyCost"
              :disabled="momentumForSupplyCost == 0"
              @click="payMomentumforSupply"
            />
          </p>
        </template>
        <template v-slot:miss>
          <p>You find nothing helpful. Pay the Price.</p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

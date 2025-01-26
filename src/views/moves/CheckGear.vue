<script setup lang="ts">
import { ref, computed } from 'vue'
import ActionMove from '@/components/ActionMove.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import { useCharacterStore } from '@/stores/CharacterStore'
import { movesList } from '@/moves'

const move = movesList.checkGear
const characterStore = useCharacterStore()

const selectedSupplyType = ref<string>('Equipped')

const selectedSupplyScore = computed(() => {
  if (selectedSupplyType.value === 'Hold') {
    return characterStore.hold
  } else {
    return characterStore.supply
  }
})

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
  selectedSupplyType.value = 'Equipped'
}
</script>

<template>
  <MoveLayout>
    <template #text>
      <ActionMove
        :title="move.title"
        :stat="selectedSupplyScore"
        :adds="moveAdds"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <fieldset>
          <div>
            <input
              type="radio"
              name="chooseSupply"
              id="equipped"
              value="Equipped"
              v-model="selectedSupplyType"
            />
            <label for="equipped">Equipped supply ({{ characterStore.supply }})</label>
          </div>
          <div>
            <input
              type="radio"
              name="chooseSupply"
              id="hold"
              value="Hold"
              v-model="selectedSupplyType"
            />
            <label for="hold">Hold supply ({{ characterStore.hold }})</label>
          </div>
        </fieldset>
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, roll +supply ({{ selectedSupplyScore }}).
        </p>
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>
            You have it, and are ready to act.
            <AdjustMomentumButton operation="adds" :amount="1" @click="takeRewards" :disabled="rewardsTaken" />
          </p>
        </template>
        <template v-slot:weak>
          <p>
            You have it, but must choose one:
            <ul>
              <li>Your supply is diminished: Sacrifice Resources (-1)</li>
              <li>It's not quite right, and causes a complication or delay: <AdjustMomentumButton operation="subtracts" :amount="2" @click="takeRewards" :disabled="rewardsTaken" /></li>
            </ul>
          </p>
        </template>
        <template v-slot:miss>
          <p>
            You don't have it and the situation grows more perilous. Pay the Price.
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

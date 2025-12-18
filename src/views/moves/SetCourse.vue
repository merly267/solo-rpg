<script setup lang="ts">
import { computed, ref } from 'vue'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import { useCharacterStore } from '@/stores/CharacterStore'
import { movesList } from '@/moves'

const move = movesList.setCourse
const payPrice = movesList.payPrice
const characterStore = useCharacterStore()

const selectedSupplyType = ref<string>('')

const selectedSupplyScore = computed(() => {
  if (selectedSupplyType.value === 'Hold') {
    return characterStore.hold
  } else if (selectedSupplyType.value === 'Equipped') {
    return characterStore.supply
  } else {
    return 0
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
  selectedSupplyType.value = ''
}
</script>
<template>
  <MoveLayout>
    <template #text>
      <ActionMove
        :title="move.title"
        :stat="selectedSupplyScore"
        :adds="moveAdds"
        :disabled="!selectedSupplyScore"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, roll:
        </p>
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
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>
            You reach your destination and the situation there favors you
            <AdjustMomentumButton operation="adds" :amount="1" @click="takeRewards" :disabled="rewardsTaken" />.
          </p>
        </template>
        <template v-slot:weak>
          <p>
            You arrive, but face a cost or complication. Choose one:
            <ul>
              <li>Suffer costs en route: Make a suffer move (-2), or two suffer moves (-1).</li>
              <li>Face a complication at the destination: Envision what you encounter.</li>
            </ul>
          </p>
        </template>
        <template v-slot:miss>
          <p>
            You are waylaid by a significant threat, and must <router-link :to="{ path: `/moves/${payPrice.slug}` }" class="move"
              >Pay the Price</router-link
            >. If you overcome this obstacle, you may push on safely to your destination.
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>
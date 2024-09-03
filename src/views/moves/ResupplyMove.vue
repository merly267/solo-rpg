<script setup lang="ts">
import { ref, computed } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import { useCharacterStore } from '@/stores/CharacterStore'
import { useImpactsStore } from '@/stores/ImpactsStore'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import AdjustSupplyButton from '@/components/AdjustSupplyButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'
import { maxSupply } from '@/constants'

const move = movesList.resupplyMove

// const selectedSupply = ref<string>('Equipped')

const selectedSupply = computed(() => {
  if (characterStore.supply === maxSupply) {
    return 'Hold'
  } else {
    return 'Equipped'
  }
})

const findStat = (statToFind: StatName) => statsList.value.find((stat) => stat.name === statToFind)

let selectedStatName = ref<string>('')

const selectedStat = computed(() => {
  if (selectedStatName.value.length) {
    if (selectedStatName.value === 'Hold') {
      return {
        name: selectedStatName.value,
        score: characterStore.hold
      }
    } else {
      const thisStat = statsList.value.find((stat) => stat.name === selectedStatName.value)
      return thisStat
    }
  }
  return {
    name: '',
    score: 0
  }
})

const moveAdds = 0

const characterStore = useCharacterStore()

const momentumForSupplyCost = ref<number>(2)
const payMomentumforSupply = () => {
  characterStore.takeSupply(momentumForSupplyCost.value)
}

const moveMade = ref(false)

const makeMove = () => {
  moveMade.value = true
}

const chosenReward = ref<string>('')

const impactsStore = useImpactsStore()

const unprepared = impactsStore.impacts.find((imp) => imp.name === 'Unprepared')

const isUnprepared = computed(() => {
  return unprepared!.status
})

const takeRewards = () => {
  if (isUnprepared.value) {
    impactsStore.clearImpact('Unprepared')
    if (selectedSupply.value === 'Hold') {
      characterStore.takeHoldSupply(1)
    } else {
      characterStore.takeSupply(1)
    }
  } else {
    if (selectedSupply.value === 'Hold') {
      characterStore.takeHoldSupply(2)
    } else {
      characterStore.takeSupply(2)
    }
  }
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
        <fieldset>
          <div>
            <input
              type="radio"
              name="chooseSupply"
              id="equipped"
              value="Equipped"
              v-model="selectedSupply"
              :disabled="characterStore.supply === maxSupply"
            />
            <label for="equipped">Equipped supply ({{ characterStore.supply }})</label>
          </div>
          <div>
            <input
              type="radio"
              name="chooseSupply"
              id="hold"
              value="Hold"
              v-model="selectedSupply"
              :disabled="characterStore.hold === maxSupply"
            />
            <label for="hold">Hold supply ({{ characterStore.hold }})</label>
          </div>
        </fieldset>
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, envision the opportunity and your approach. If you...
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
              >Barter or make an appeal: roll +Heart ({{ findStat('Heart')?.score }}).</label
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
              >Threaten or seize: roll +Iron ({{ findStat('Iron')?.score }}).</label
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
              >Steal or swindle: roll +Shadow ({{ findStat('Shadow')?.score }}).</label
            >
          </div>
          <div>
            <input
              type="radio"
              name="chooseStat"
              id="scavenge"
              value="Wits"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label for="scavenge"
              >Scavenge or craft: roll +Wits ({{ findStat('Wits')?.score }}).</label
            >
          </div>
          <div>
            <input
              type="radio"
              name="chooseStat"
              id="gearUp"
              value="Hold"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
              :disabled="selectedSupply === 'Hold'"
            />
            <label for="gearUp"
              >Gear up from your ship's stores: roll +Supply (hold) ({{
                characterStore.hold
              }}).</label
            >
          </div>
        </fieldset>
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          selectedSupply: {{ selectedSupply }}
          <fieldset>
            <legend>Choose one:</legend>
            <div>
              <input
                type="radio"
                name="chooseReward"
                id="general"
                value="general"
                v-model="chosenReward"
              />
              <label for="general">
                <span :class="{ disabled: !isUnprepared }">
                  If you are unprepared, clear the impact and take +1 supply.
                </span>
                <span :class="{ disabled: isUnprepared }">Otherwise, take +2 supply</span
                ><button :disabled="chosenReward !== 'general'" @click="takeRewards">
                  Take rewards
                </button>
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="chooseReward"
                id="specific"
                value="specific"
                v-model="chosenReward"
              />
              <label for="specific">
                If you are in need of a specific item, resource, or service that can reasonably be
                obtained, you acquire it.
                <AdjustMomentumButton
                  operation="adds"
                  :amount="1"
                  :disabled="chosenReward !== 'specific'"
              /></label>
            </div>
          </fieldset>

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
          <p>You gain nothing and the situation worsens. Pay the Price.</p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

<style scoped>
.disabled {
  color: var(--grey-text);
}
</style>

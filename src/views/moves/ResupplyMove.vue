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
const characterStore = useCharacterStore()

let selectedSupply = ref<string>('Equipped')

const allSupplyFull = computed(() => {
  if (characterStore.supply === maxSupply && characterStore.hold === maxSupply) {
    return true
  } else {
    return false
  }
})

const findStat = (statToFind: StatName) => statsList.value.find((stat) => stat.name === statToFind)

const findLabel = (statToFind: string) => customStats.value.find((stat) => stat.value === statToFind)

const holdSelected = computed(() => selectedSupply.value === 'Hold' ? true : false)


const customStats = computed(() => [
  {
    value: 'Heart',
    score: findStat('Heart')?.score,
    label: 'Barter or make an appeal'
  },
  {
    value: 'Iron',
    score: findStat('Iron')?.score,
    label: 'Threaten or seize'
  },
  {
    value: 'Shadow',
    score: findStat('Shadow')?.score,
    label: 'Steal or swindle'
  },
  {
    value: 'Wits',
    score: findStat('Wits')?.score,
    label: 'Scavenge or craft'
  },
  {
    value: 'Hold',
    score: characterStore.hold,
    label: "Gear up from your ship's stores",
    disabled: holdSelected.value
  }
])

let selectedStatName = ref<string>('')

const selectedStat = computed(() => {
  if (selectedStatName.value.length) {
    return {
      name: findLabel(selectedStatName.value as string)?.value,
      score: findLabel(selectedStatName.value as string)?.score
    }
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

const chosenReward = ref<string>('')

const impactsStore = useImpactsStore()

const unprepared = impactsStore.impacts.find((imp) => imp.name === 'Unprepared')

const isUnprepared = computed(() => {
  return unprepared!.status
})

const rewardsTaken = ref(false)

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
  rewardsTaken.value = true
}

const takeMomentumRewards = () => rewardsTaken.value = true

const clearMove = () => {
  moveMade.value = false
  rewardsTaken.value = false
  selectedStatName.value = ''
  selectedSupply.value = 'Equipped'
}
</script>

<template>
  <MoveLayout>
    <template #text>
      <ActionMove
        :title="move.title"
        :stat="selectedStat.score!"
        :adds="moveAdds"
        :disabled="!selectedStatName.length || allSupplyFull"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <p v-if="allSupplyFull">Both your equipped and hold supply are at maximum.</p>
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
        <fieldset v-if="selectedStatName === ''">
          <div v-for="(stat, index) in customStats" :key="`stat-${index}`" >
            <input 
              type="radio" 
              name="chooseStat"
              :id="`${index}-${stat.value}`" 
              :value="stat.value"
              v-model="selectedStatName"
              :disabled="stat.disabled"
            />
            <label :for="`${index}-${stat.value}`">{{ stat.label }}: roll +{{ stat.value }} ({{ stat.score }})</label>
          </div>
        </fieldset>
        <div v-else>
          <p>
            {{ findLabel(selectedStatName)?.label }}: roll +{{ selectedStatName }} ({{ findLabel(selectedStatName)?.score }})
          </p>
          <p>
            <button @click="selectedStatName = ''">Change approach</button>
          </p>
        </div>
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
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
                ><button :disabled="chosenReward !== 'general' || rewardsTaken" @click="takeRewards">
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
                  @click="takeMomentumRewards"
                  :disabled="chosenReward !== 'specific' || rewardsTaken"
              /></label>
            </div>
          </fieldset>
        </template>
        <template v-slot:weak>
          <p>
            You must first deal with a cost, complication, or demand. Envision the nature of this
            obstacle, and then
          </p>
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
                ><button :disabled="chosenReward !== 'general' || rewardsTaken" @click="takeRewards">
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
                  @click="takeMomentumRewards"
                  :disabled="chosenReward !== 'specific' || rewardsTaken"
              /></label>
            </div>
          </fieldset>
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

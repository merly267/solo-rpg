<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import { useCharacterStore } from '@/stores/CharacterStore'
import { useImpactsStore } from '@/stores/ImpactsStore'
import { useMomentumStore } from '@/stores/MomentumStore'
import ActionMove from '@/components/ActionMove.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

type AdjustableTrack = 'momentum' | 'supply' | ''

const move = movesList.healMove

const findStat = (statToFind: StatName) => statsList.value.find((stat) => stat.name === statToFind)

const findLabel = (statToFind: string) => customStats.value.find((stat) => stat.value === statToFind)

const ownWoundsStat = findStat('Wits')!.score <= findStat('Iron')!.score ? 'Wits' : 'Iron'

const customStats = computed(() => [
  {
    value: 'Iron',
    score: findStat('Iron')?.score,
    label: 'Receive treatment from someone (not an ally)'
  },
  {
    value: ownWoundsStat,
    score: findStat(ownWoundsStat)?.score,
    label: 'Mend your own wounds (roll +Wits or +Iron, whichever is lower)'
  },
  {
    value: 'Heart',
    score: findStat('Heart')?.score,
    label: 'Obtain treatment for a companion'
  },
  {
    value: 'Wits',
    score: findStat('Wits')?.score,
    label: "Provide care"
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

const impactsStore = useImpactsStore()

const wounded = impactsStore.impacts.find((imp) => imp.name === 'Wounded')

const isWounded = computed(() => {
  return wounded!.status
})

const selectedCost = ref<AdjustableTrack>('')
const momentumStore = useMomentumStore()
const characterStore = useCharacterStore()

const moveMade = ref(false)

const makeMove = () => {
  moveMade.value = true
}

const takeRewards = () => {
  if (isWounded.value) {
    impactsStore.clearImpact('Wounded')
    characterStore.takeHealth(2)
  } else {
    characterStore.takeHealth(3)
  }
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
        :title="move.title"
        :stat="selectedStat.score!"
        :adds="moveAdds"
        :disabled="!selectedStatName.length"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, envision the situation and roll. If you...
        </p>
        <fieldset v-if="selectedStatName === ''">
          <div v-for="(stat, index) in customStats" :key="`stat-${index}`" >
            <input 
              type="radio" 
              name="chooseStat"
              :id="`${index}-${stat.value}`" 
              :value="stat.value"
              v-model="selectedStatName"
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
          <p>
            The care is helpful.
            <span :class="{ disabled: !isWounded }">
              If you (or the ally under your care) are wounded, clear the impact and take or give +2
              health.
            </span>
            <span :class="{ disabled: isWounded }">Otherwise, take or give +3 health.</span>
            <button @click="takeRewards">Take rewards</button>
          </p>
        </template>
        <template v-slot:weak>
          <p>
            The care is helpful.
            <span :class="{ disabled: !isWounded }">
              If you (or the ally under your care) are wounded, clear the impact and take or give +2
              health.
            </span>
            <span :class="{ disabled: isWounded }">Otherwise, take or give +3 health.</span>
            <button @click="takeRewards">Take rewards</button>
          </p>
          <fieldset>
            <legend>But the recovery costs extra time or resources. Choose one:</legend>
            <div>
              <input
                type="radio"
                name="sufferCost"
                id="supplyCost"
                value="supply"
                :disabled="characterStore.supply == 0"
                v-model="selectedCost"
              />
              <label for="supplyCost"
                ><span class="disabled" v-if="characterStore.supply == 0"
                  >Sacrifice resources (-2) your supply is already at 0</span
                ><span v-else>Sacrifice resources (-2)</span></label
              >
            </div>
            <div>
              <input
                type="radio"
                name="sufferCost"
                id="momentumCost"
                value="momentum"
                :disabled="momentumStore.momentum == momentumStore.minMomentum"
                v-model="selectedCost"
              />
              <label for="momentumCost"
                ><span v-if="momentumStore.momentum == momentumStore.minMomentum" class="disabled">
                  Your momentum is already at minumum. Face a setback instead. </span
                ><span v-else>Lose momentum (-2)</span></label
              >
            </div>
          </fieldset>
        </template>
        <template v-slot:miss>
          <p>The aid is ineffective and the situation worsens. Pay the Price.</p>
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

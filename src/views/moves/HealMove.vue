<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import { useCharacterStore } from '@/stores/CharacterStore'
import { useImpactsStore } from '@/stores/ImpactsStore'
import { useMomentumStore } from '@/stores/MomentumStore'
import ActionMove from '@/components/ActionMove.vue'
import AdjustImpact from '@/components/AdjustImpact.vue'
import AdjustHealthButton from '@/components/AdjustHealthButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

type AdjustableTrack = 'momentum' | 'supply' | ''

const move = movesList.healMove

const findStat = (statToFind: StatName) => statsList.value.find((stat) => stat.name === statToFind)

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

const healOtherStatForMove: StatName = 'Wits'

const healOtherStat = statsList.value.find((stat) => stat.name === healOtherStatForMove)

const healSelfAltStatForMove: StatName = 'Iron'

const healSelfAltStat = statsList.value.find((stat) => stat.name === healSelfAltStatForMove)

const healSelfStat =
  healSelfAltStat!.score <= healOtherStat!.score ? healSelfAltStat : healOtherStat

const moveAdds = 0

const impactsStore = useImpactsStore()

const wounded = impactsStore.impacts.find((imp) => imp.name === 'Wounded')

const isWounded = computed(() => {
  return wounded!.status
})

const selectedCost = ref<AdjustableTrack>('')
const momentumStore = useMomentumStore()
const characterStore = useCharacterStore()

const takeCost = () => {
  switch (selectedCost.value) {
    case 'momentum':
      momentumStore.loseMomentum(1)
      break
    case 'supply':
      characterStore.loseSupply(1)
  }
}

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
          >, envision the situation and roll. If you...
        </p>
        <fieldset>
          <div>
            <input
              type="radio"
              name="chooseStat"
              id="receiveTreatment"
              value="Iron"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label for="receiveTreatment"
              >Receive treatment from someone (not an ally): roll +Iron ({{
                findStat('Iron')?.score
              }}).</label
            >
          </div>
          <div v-if="healOtherStat && healSelfAltStat && healSelfStat">
            <input
              type="radio"
              name="chooseStat"
              id="mendOwnWounds"
              :value="healSelfStat.name"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label for="mendOwnWounds"
              >Mend your own wounds: roll +{{ healOtherStat.name }} or +{{ healSelfAltStat.name }},
              whichever is lower: +{{ healSelfStat.name }} ({{ healSelfStat.score }})</label
            >
          </div>
          <div>
            <input
              type="radio"
              name="chooseStat"
              id="forCompanion"
              value="Heart"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label for="forCompanion"
              >Obtain treatment for a companion: roll +Heart ({{
                findStat('Heart')?.score
              }}).</label
            >
          </div>
          <div>
            <input
              type="radio"
              name="chooseStat"
              id="provideCare"
              value="Wits"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label for="provideCare"
              >Provide care: roll +Wits ({{ findStat('Wits')?.score }}).</label
            >
          </div>
        </fieldset>
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

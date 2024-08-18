<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import { useCharacterStore } from '@/stores/CharacterStore'
import { useDebilitiesStore } from '@/stores/DebilitiesStore'
import { useMomentumStore } from '@/stores/MomentumStore'
import ActionMove from '@/components/ActionMove.vue'
import AdjustDebility from '@/components/AdjustDebility.vue'
import AdjustHealthButton from '@/components/AdjustHealthButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

type AdjustableTrack = 'momentum' | 'supply' | ''

const move = movesList.healMove

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

const debilitiesStore = useDebilitiesStore()

const wounded = debilitiesStore.debilities.find((deb) => deb.name === 'Wounded')

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
      >
        <fieldset v-if="healOtherStat && healSelfAltStat && healSelfStat">
          <div>
            <input
              type="radio"
              name="chooseStat"
              :id="healOtherStat.name"
              :value="healOtherStat.name"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label :for="healOtherStat.name"
              >When you <strong>{{ move.trigger }}</strong> for another, roll +{{
                healOtherStat.name
              }}
              ({{ healOtherStat.score }}).</label
            >
          </div>
          <div>
            <input
              type="radio"
              name="chooseStat"
              :id="healSelfStat.name"
              :value="healSelfStat.name"
              @input="selectedStatName = ($event.target as HTMLInputElement).value"
            />
            <label :for="healSelfStat.name"
              >If you <strong>mend your own wounds</strong>, roll +{{ healOtherStat.name }} or +{{
                healSelfAltStat.name
              }}, whichever is lower: +{{ healSelfStat.name }} ({{ healSelfStat.score }})</label
            >
          </div>
        </fieldset>
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome>
        <template v-slot:strong>
          <p>
            Your care is helpful.
            <span :class="{ notWounded: !isWounded }"
              >If you (or the ally under your care) have the wounded condition, you may clear it:
              <AdjustDebility operation="Clear" debility="Wounded" />.</span
            >
            Then, take or give up to +2 health.
            <AdjustHealthButton operation="take" :amount="2" />.
          </p>
        </template>
        <template v-slot:weak>
          <p>
            Your care is helpful.
            <span :class="{ notWounded: !isWounded }"
              >If you (or the ally under your care) have the wounded condition, you may clear it:
              <AdjustDebility operation="Clear" debility="Wounded" />.</span
            >
          </p>
          <fieldset>
            <legend>Then suffer -1 supply or -1 momentum (your choice):</legend>
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
                  >Suffer -1 supply: your supply is already at 0</span
                ><span v-else>Suffer -1 supply</span></label
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
                ><span v-else>Suffer -1 momentum</span></label
              >
            </div>
          </fieldset>

          <p>
            and take or give up to +2 health
            <AdjustHealthButton
              operation="take"
              :amount="2"
              @click="takeCost"
              :disabled="!selectedCost.length"
            />.
          </p>
        </template>
        <template v-slot:miss>
          <p>Your aid is ineffective. Pay the Price.</p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

<style scoped>
.notWounded {
  color: var(--grey-text);
}
.disabled {
  color: var(--grey-text);
}
</style>

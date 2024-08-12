<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

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
              >If you are mending your own wounds, roll +{{ healOtherStat.name }} or +{{
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
            Your care is helpful. If you (or the ally under your care) have the wounded condition,
            you may clear it. Then, take or give up to +2 health.
            <AdjustMomentumButton operation="adds" :amount="2" />.
          </p>
        </template>
        <template v-slot:weak>
          <p>
            Your care is helpful. If you (or the ally under your care) have the wounded condition,
            you may clear it. Then, take or give up to +2 health, but you must suffer -1 supply or
            -1 momentum (your choice).
            <AdjustMomentumButton operation="adds" :amount="1" />.
          </p>
        </template>
        <template v-slot:miss>
          <p>Your aid is ineffective. Pay the Price.</p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

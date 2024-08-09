<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import StashedMoves from '@/components/StashedMoves.vue'
import { usestashedAddstore } from '@/stores/MoveAddsStore'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

const move = movesList.gatherInfo

const statForMove: StatName = 'Wits'

const selectedStat = statsList.value.find((stat) => stat.name === statForMove)

const stashedStore = usestashedAddstore()

const bondAadds = ref(false)
const moveAdds = computed(() => {
  const initialValue = 0
  const selectedStashed = stashedStore.stashedAdds.filter((stashed) => stashed.selected)
  const selectedAdds = selectedStashed.map((stash) => stash.add)
  const stashedTotal = selectedAdds.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  )
  return bondAadds.value ? stashedTotal + 1 : stashedTotal
})

const clearMove = () => {
  bondAadds.value = false
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
        @clearMove="clearMove"
      >
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, roll +{{ selectedStat.name }} ({{ selectedStat.score }}).
        </p>

        <input type="checkbox" id="bondAadds" name="adds" v-model="bondAadds" />
        <label for="bondAadds"
          >If you act within a community or ask questions of a person with whom you share a bond,
          add +1.</label
        >
        <StashedMoves />
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome>
        <template v-slot:strong>
          <p>
            You discover something helpful and specific. The path you must follow or action you must
            take to make progress is made clear. Envision what you learn (Ask the Oracle if unsure),
            and
            <AdjustMomentumButton operation="adds" :amount="2" />.
          </p>
        </template>
        <template v-slot:weak>
          <p>
            The information complicates your quest or introduces a new danger. Envision what you
            discover (Ask the Oracle if unsure), and
            <AdjustMomentumButton operation="adds" :amount="1" />.
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

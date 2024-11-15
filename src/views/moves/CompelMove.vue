<script setup lang="ts">
import { ref, computed } from 'vue'
import ActionMove from '@/components/ActionMove.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import RadioStatSelector from '@/components/RadioStatSelector.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import { movesList } from '@/moves'

const move = movesList.compelMove

const childComponent = ref<InstanceType<typeof RadioStatSelector>>()

const selectedStat = computed(() => {
  if (childComponent.value?.selectedStat) {
    return {
      name: childComponent.value.selectedStat.name,
      score: childComponent.value.selectedStat.score
    }
  }
  return {
    name: '',
    score: 0
  }
})

const moveAdds = 0

const moveMade = ref(false)
const cleared = ref(false)

const makeMove = () => {
  moveMade.value = true
}

const clearMove = () => {
  moveMade.value = false
  cleared.value = true
}
</script>
<template>
  <MoveLayout>
    <template #text>
      <ActionMove
        :title="move.title"
        :stat="selectedStat.score"
        :adds="moveAdds"
        :disabled="!selectedStat"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, envision your approach. If you...
        </p>
        <RadioStatSelector v-if="move.stats" :stats="move.stats" :cleared="cleared" ref="childComponent" />
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>
            They’ll do what you want or agree to your conditions.
            <AdjustMomentumButton operation="adds" :amount="1" />
          </p>
        </template>
        <template v-slot:weak>
          <p>
            They’ll do what you want or agree to your conditions, but their agreement comes with a
            demand or complication. Envision their couteroffer and
            <AdjustMomentumButton operation="adds" :amount="1" />
          </p>
        </template>
        <template v-slot:miss>
          <p>They refuse or make a demand that costs you greatly. Pay the Price.</p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

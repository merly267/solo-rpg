<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import RadioStatSelector from '@/components/RadioStatSelector.vue'
import { movesList } from '@/moves'

const move = movesList.faceDanger

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

watch(() => childComponent.value?.selectedStat, () => {
  if (childComponent.value?.selectedStat) {
    cleared.value = false
  }
})

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
        v-if="selectedStat"
        :title="move.title"
        :stat="selectedStat.score"
        :adds="moveAdds"
        :disabled="!selectedStat"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, envision your action and roll. If you act...
        </p>
        <RadioStatSelector v-if="move.stats" :stats="move.stats" :cleared="cleared" ref="childComponent" />
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>
            You are successful.
            <AdjustMomentumButton operation="adds" :amount="1" />
          </p>
        </template>
        <template v-slot:weak>
          <p>You succeed, but not without a cost. Make a suffer move (-1).</p>
        </template>
        <template v-slot:miss>
          <p>
            You fail, or a momentary success is undermined by a dire turn of events. Pay the Price.
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import { useMomentumStore } from '@/stores/MomentumStore'
import ActionMove from '@/components/ActionMove.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

const move = movesList.gatherInfo
const statForMove: StatName = 'Wits'

const selectedStat = statsList.value.find((stat) => stat.name === statForMove)
const bondAadds = ref(false)
const moveAdds = computed(() => {
  if (bondAadds.value) {
    return 1
  }
  return 0
})
const momentumStore = useMomentumStore()
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
          When you <strong>search an area</strong>, <strong>ask questions</strong>,
          <strong>conduct an investigation</strong>, or <strong>follow a track</strong>, roll +{{
            selectedStat.name
          }}
          ({{ selectedStat.score }}).
        </p>
        <input type="checkbox" id="bondAadds" name="adds" v-model="bondAadds" />
        <label for="bondAadds"
          >If you act within a community or ask questions of a person with whom you share a bond,
          add +1.</label
        >
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome>
        <template v-slot:strong>
          <p>
            You discover something helpful and specific. The path you must follow or action you must
            take to make progress is made clear. Envision what you learn (Ask the Oracle if unsure),
            and
            <button
              type="button"
              :disabled="momentumStore.momentum == momentumStore.maxMomentum"
              @click="momentumStore.addMomentum(2)"
            >
              take +2 momentum</button
            >.
          </p>
        </template>
        <template v-slot:weak>
          <p>
            The information complicates your quest or introduces a new danger. Envision what you
            discover (Ask the Oracle if unsure), and
            <button
              type="button"
              :disabled="momentumStore.momentum == momentumStore.maxMomentum"
              @click="momentumStore.addMomentum(1)"
            >
              take +1 momentum</button
            >.
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

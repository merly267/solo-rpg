<script setup lang="ts">
import { computed, ref } from 'vue'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import CreateProgressTrack from '@/components/CreateProgressTrack.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import { movesList } from '@/moves'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import type { StatName } from '@/types'

const move = movesList.swearVow

const statForMove: StatName = 'Heart'

const selectedStat = statsList.value.find((stat) => stat.name === statForMove)

const bondAadds = ref(false)
const moveAdds = computed(() => {
  if (bondAadds.value) {
    return 1
  }
  return 0
})
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
          >, write your vow and give the quest a rank:
        </p>
        <CreateProgressTrack />
        <p>Then, roll +{{ selectedStat.name }} ({{ selectedStat.score }}).</p>
        <input type="checkbox" id="bondAadds" name="adds" v-model="bondAadds" />
        <label for="bondAadds"
          >If you make this vow to a person or community with whom you share a bond, add +1.</label
        >
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome>
        <template v-slot:strong>
          <p>
            You are emboldened and it is clear what you must do next (Ask the Oracle if unsure).
            <AdjustMomentumButton operation="adds" :amount="2" />.
          </p>
        </template>
        <template v-slot:weak>
          <p>
            You are determined but begin your quest with more questions than answers.
            <AdjustMomentumButton operation="adds" :amount="1" />, and envision what you do to find
            a path forward.
          </p>
        </template>
        <template v-slot:miss>
          <p>
            You face a significant obstacle before you can begin your quest. Envision what stands in
            your way (Ask the Oracle if unsure), and choose one:
          </p>
          <ul>
            <li>
              You press on: <AdjustMomentumButton operation="subtracts" :amount="2" />, and do what
              you must to overcome this obstacle.
            </li>
            <li>You give up: Forsake Your Vow.</li>
          </ul>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

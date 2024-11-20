<script setup lang="ts">
import { ref } from 'vue'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'

const moveMade = ref(false)

const makeMove = () => {
  moveMade.value = true
}

const clearMove = () => {
  moveMade.value = false
}
</script>
<template>
  <MoveLayout>
    <template #text>
      Set a course
      <!-- <ActionMove
        v-if="selectedStat"
        :title="move.title"
        :stat="selectedStat.score"
        :adds="moveAdds"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, roll +{{ selectedStat.name }} ({{ selectedStat.score }}).
        </p>
      </ActionMove> -->
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>
            You reach your destination and the situation there favors you
            <AdjustMomentumButton operation="adds" :amount="1" />.
          </p>
        </template>
        <template v-slot:weak>
          <p>
            You arrive, but face a cost or complication. Choose one:
            <ul>
              <li>Suffer costs en route: Make a suffer move (-2), or two suffer moves (-1).</li>
              <li>Face a complication at the destination: Envision what you encounter.</li>
            </ul>
          </p>
        </template>
        <template v-slot:miss>
          <p>
            You are waylaid by a significant threat, and must Pay the Price. If you overcome this obstacle, you may push on safely to your destination.
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>
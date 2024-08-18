<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ProgressMove from '@/components/ProgressMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

const move = movesList.fulfillVow
</script>
<template>
  <MoveLayout>
    <template #text>
      <ProgressMove :title="move.title">
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, roll the challenge dice and compare to your progress. Momentum is ignored on this roll.
        </p>
      </ProgressMove>
    </template>
  </MoveLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

const move = movesList.fulfillVow
</script>
<template>
  <MoveLayout
    ><template #text>
      <p>
        When you <strong>{{ move.trigger }}</strong
        >, roll the challenge dice and compare to your progress. Momentum is ignored on this roll.
      </p>
    </template></MoveLayout
  >
</template>

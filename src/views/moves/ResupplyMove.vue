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

const move = movesList.resupplyMove

const statForMove: StatName = 'Wits'
const selectedStat = statsList.value.find((stat) => stat.name === statForMove)

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
      </ActionMove>
    </template>
  </MoveLayout>
</template>

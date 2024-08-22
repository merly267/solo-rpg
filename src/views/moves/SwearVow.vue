<script setup lang="ts">
import { computed, ref } from 'vue'
import ActionMove from '@/components/ActionMove.vue'
import AdjustMomentumButton from '@/components/AdjustMomentumButton.vue'
import CreateProgressTrack from '@/components/CreateProgressTrack.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import { movesList } from '@/moves'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'
import type { StatName } from '@/types'

const move = movesList.swearVow

const progressTrackType = 'Vow'

const statForMove: StatName = 'Heart'

const selectedStat = statsList.value.find((stat) => stat.name === statForMove)

const connectionAdds = ref(0)

const moveAdds = computed(() => {
  if (connectionAdds.value) {
    return connectionAdds.value
  }
  return 0
})

const progressTrackStore = useProgressTrackStore()

const noVow = computed(() => {
  if (progressTrackStore.newTrack.name.length && progressTrackStore.newTrack.rank > 0) {
    return false
  }
  return true
})

const moveMade = ref(false)

const makeMove = () => {
  progressTrackStore.addVow(progressTrackType)
  moveMade.value = true
}

const clearMove = () => {
  connectionAdds.value = 0
  moveMade.value = false
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
        :disabled="noVow"
        @makeMove="makeMove"
        @clearMove="clearMove"
      >
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, write your vow and give the quest a rank:
        </p>
        <CreateProgressTrack :type="progressTrackType" />
        <p>Then, roll +{{ selectedStat.name }} ({{ selectedStat.score }}).</p>
        <fieldset>
          <div>
            <input
              type="radio"
              name="connectionAdds"
              id="connection"
              value="1"
              v-model="connectionAdds"
            />
            <label for="connection">If you swear this vow to a connection, add +1.</label>
          </div>
          <div>
            <input
              type="radio"
              name="connectionAdds"
              id="bond"
              value="2"
              v-model="connectionAdds"
            />
            <label for="bond">If you share a bond, add +2.</label>
          </div>
        </fieldset>
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome v-if="moveMade">
        <template v-slot:strong>
          <p>
            You are emboldened and it is clear what you must do next.
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
            You must overcome a significant obstacle before you begin your quest. Envision what
            stands in your way.
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

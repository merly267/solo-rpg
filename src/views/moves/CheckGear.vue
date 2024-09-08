<script setup lang="ts">
import ActionMove from '@/components/ActionMove.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import { useCharacterStore } from '@/stores/CharacterStore'
import { movesList } from '@/moves'

const move = movesList.checkGear

const moveAdds = 0

const characterStore = useCharacterStore()

// need to choose between hold and personal supply
const selectedTrack = 4
</script>

<template>
  <MoveLayout>
    <template #text>
      <ActionMove :title="move.title" :stat="selectedTrack" :adds="moveAdds">
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, roll +supply ({{ selectedTrack }}).
        </p>
      </ActionMove>
    </template>
  </MoveLayout>
</template>

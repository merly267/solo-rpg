<script setup>
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'
import NewMoveOutcome from '@/components/NewMoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'

const title = 'Gather Information'

const selectedStat = statsList.value.find((stat) => stat.name === 'Wits')
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
      <ActionMove :title="title" :stat="selectedStat.score" :adds="moveAdds">
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
      <NewMoveOutcome>
        <template v-slot:strong>
          <p>strong hit text goes here</p>
        </template>
        <template v-slot:weak>
          <p>weak hit text goes here</p>
        </template>
        <template v-slot:miss>
          <p>miss text goes here</p>
        </template>
      </NewMoveOutcome>
    </template>
  </MoveLayout>
</template>

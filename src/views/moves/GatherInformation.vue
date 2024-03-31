<script setup>
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'

const title = 'Gather Information'

const selectedStat = statsList.value.find((stat) => stat.name === 'Wits')
</script>

<template>
  <ActionMove :title="title" :stat="selectedStat.score">
    <p>
      When you <strong>search an area</strong>, <strong>ask questions</strong>,
      <strong>conduct an investigation</strong>, or <strong>follow a track</strong>, roll +{{
        selectedStat.name
      }}
      ({{ selectedStat.score }}).
    </p>
  </ActionMove>
</template>

<script setup>
import { stats as statsList } from '@/composables/useCharacterStats.js'
import ActionMove from '@/components/ActionMove.vue'

const title = 'Gather Information'

const selectedStat = statsList.value.find((stat) => stat.name === 'Wits')
</script>

<template>
  <ActionMove :title="title" :stat="selectedStat.score">
    <p>This is the move instructions passed as slots</p>
  </ActionMove>
</template>

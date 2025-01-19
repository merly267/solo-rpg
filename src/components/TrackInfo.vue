<script setup lang="ts">
import ProgressTrack from '@/components/ProgressTrack.vue'
import { progressRanksList } from '@/constants'
import type { ProgressTrackStatus } from '@/types'

const { name, rank, progress, experience, status, legacy } = defineProps<{
  name: string
  rank?: number
  progress: number
  experience?: number
  status?: ProgressTrackStatus
  legacy?: boolean
}>()

const translateRank = (level: number) => {
  const rankName = progressRanksList.filter((rank) => rank.level === level)
  return rankName[0].name
}
</script>
<template>
  <h3>
    {{ name }}<span v-if="status"> ({{ status }})</span>
  </h3>
  <p v-if="rank" class="rank">Rank: {{ translateRank(rank) }}</p>
  <ProgressTrack :progress="progress" :experience="experience" :legacy="legacy" />
  <p v-if="experience">XP: {{ experience }}</p>
</template>

<style scoped>
h3 {
  margin-bottom: 0;
  &:first-letter {
    text-transform: uppercase;
  }
}
p.rank {
  margin: 0.5rem 0;
}
</style>

<script setup lang="ts">
import ProgressTrack from '@/components/ProgressTrack.vue'
import { progressRanksList } from '@/constants'
import type { ProgressTrackStatus } from '@/types'

type PropTypes = {
  name: string
  rank?: number
  progress: number
  experience?: number
  status?: ProgressTrackStatus
}

const props = defineProps<PropTypes>()

const translateRank = (level: number) => {
  const rankName = progressRanksList.filter((rank) => rank.level === level)
  return rankName[0].name
}
</script>
<template>
  <h3>{{ props.name }}<span v-if="props.status"> ({{ props.status }})</span></h3>
  <p v-if="props.rank" class="rank">Rank: {{ translateRank(props.rank) }}</p>
  <ProgressTrack :progress="props.progress" :experience="props.experience" />
  <p v-if="props.experience">XP: {{ props.experience }}</p>
  
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

<script setup lang="ts">
import ProgressTrack from '@/components/ProgressTrack.vue'
import { progressRanksList } from '@/constants'

type PropTypes = {
  name: string
  rank: number
  progress: number
}

const props = defineProps<PropTypes>()

const translateRank = (level: number) => {
  const rankName = progressRanksList.filter((rank) => rank.level === level)
  return rankName[0].name
}
</script>
<template>
  <h3>{{ props.name }}</h3>
  <p class="rank">Rank: {{ translateRank(props.rank) }}</p>
  <ProgressTrack :progress="props.progress" />
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

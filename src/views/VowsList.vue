<script setup lang="ts">
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'
import { movesList } from '@/moves'
import { progressRanksList } from '@/constants'

const progressTrackStore = useProgressTrackStore()
const move = movesList.swearVow

const translateRank = (level: number) => {
  const rankName = progressRanksList.filter((rank) => rank.level === level)
  return rankName[0].name
}
</script>

<template>
  <h2>Vows</h2>
  <div v-if="progressTrackStore.vows.length">
    <div v-for="vow in progressTrackStore.vows" :key="`vow-${vow.uuid}`" class="vow">
      <h3>{{ vow.name }}</h3>
      <p class="rank">Rank: {{ translateRank(vow.rank) }}</p>
      <p>Progress: {{ vow.progress }}</p>
    </div>
  </div>
  <p v-else>Make a background vow</p>
  <button @click="$router.push(`/moves/${move.slug}`)">
    {{ move.title }}
  </button>
</template>

<style>
.vow {
  margin-bottom: 2rem;
  h3 {
    margin-bottom: 0;
  }
  p.rank {
    margin-top: 0.5rem;
  }
}
</style>

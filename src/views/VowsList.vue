<script setup lang="ts">
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'
import TrackInfo from '@/components/TrackInfo.vue'
import { movesList } from '@/moves'

const progressTrackStore = useProgressTrackStore()
const move = movesList.swearVow
</script>

<template>
  <h2>Vows</h2>
  <div v-if="progressTrackStore.vows.length">
    <div v-for="vow in progressTrackStore.vows" :key="`vow-${vow.uuid}`" class="vow">
      <TrackInfo :name="vow.name" :rank="vow.rank" :progress="vow.progress" />
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
}
</style>

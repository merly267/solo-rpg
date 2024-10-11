<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'
import { progressRanksList } from '@/constants'
import type { ProgressTrackType } from '@/types'

type PropTypes = {
  type: ProgressTrackType
}

const props = defineProps<PropTypes>()

const progressTrackStore = useProgressTrackStore()

const track = progressTrackStore.newTrack

onUnmounted(() => progressTrackStore.clearNewTrack())
</script>

<template>
  <p>
    <label for="trackName">{{ props.type }}: </label>
    <input type="text" id="trackName" v-model="track.name" />
  </p>
  <fieldset>
    <legend>Rank:</legend>
    <div v-for="(rank, index) in progressRanksList" :key="`rank-${index}`">
      <input type="radio" :id="rank.name" :value="rank.level" v-model="track.rank" />
      <label :for="rank.name">{{ rank.name }}</label>
    </div>
  </fieldset>
</template>

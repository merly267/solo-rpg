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

const findRank = (rankToFind: number) => progressRanksList.find((rank) => rank.level === rankToFind)

onUnmounted(() => progressTrackStore.clearNewTrack())
</script>

<template>
  <p>
    <label for="trackName">{{ props.type }}: </label>
    <input type="text" id="trackName" v-model="track.name" />
  </p>
  <fieldset v-if="track.rank === 0">
    <legend>Rank:</legend>
    <div v-for="(rank, index) in progressRanksList" :key="`rank-${index}`">
      <input type="radio" :id="rank.name" :value="rank.level" v-model="track.rank" />
      <label :for="rank.name">{{ rank.name }}</label>
    </div>
  </fieldset>
  <div v-else>
    <p>Rank: {{ findRank(track.rank)?.name }}</p>
    <p><button @click="track.rank = 0">Change rank</button></p>
  </div>
</template>

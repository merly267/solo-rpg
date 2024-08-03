<script setup lang="ts">
import { ref } from 'vue'

import { progressRanksList } from '@/constants'
import type { ProgressTrack, ProgressTrackType } from '@/types'

type PropTypes = {
  type: ProgressTrackType
}

const props = defineProps<PropTypes>()

const track = ref<ProgressTrack>({
  uuid: '',
  name: '',
  rank: 0,
  type: '',
  progress: 0,
  status: ''
})

const emit = defineEmits<{
  (e: 'newTrackInfo', track: ProgressTrack): void
  (e: 'newTrackRank', rank: number): void
}>()

const newTrackInfo = (track: ProgressTrack) => {
  emit('newTrackInfo', track)
}
const newTrackRank = (rank: number) => {
  emit('newTrackRank', rank)
}
</script>

<template>
  <p>
    <label for="trackName">{{ props.type }}: </label>
    <input type="text" id="trackName" v-model="track.name" @input="newTrackInfo(track)" />
  </p>
  <fieldset>
    <legend>Rank:</legend>
    <div v-for="(rank, index) in progressRanksList" :key="`rank-${index}`">
      <input
        type="radio"
        :id="rank.name"
        :value="rank.level"
        v-model="track.rank"
        @input="newTrackRank(track.rank)"
      />
      <label :for="rank.name">{{ rank.name }}</label>
    </div>
  </fieldset>
</template>

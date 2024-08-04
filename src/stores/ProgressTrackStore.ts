import { toRaw } from 'vue'
import { defineStore } from 'pinia'
// import { useLocalStorage } from '@vueuse/core'
import { newProgressTrack } from '@/constants'
import type { ProgressTrack } from '@/types'

type State = {
  newTrack: ProgressTrack
  vows: ProgressTrack[]
}

const progressTrack = structuredClone(toRaw(newProgressTrack))

export const useProgressTrackStore = defineStore('progressTrackStore', {
  state: (): State => ({
    newTrack: progressTrack,
    vows: []
  }),
  actions: {
    clearNewTrack() {
      Object.assign(this.newTrack, newProgressTrack)
    }
  }
})

import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { newProgressTrack } from '@/constants'
import type { ProgressTrack } from '@/types'

type State = {
  newTrack: ProgressTrack
  vows: RemovableRef<ProgressTrack[]>
}

const progressTrack = structuredClone(toRaw(newProgressTrack))

export const useProgressTrackStore = defineStore('progressTrackStore', {
  state: (): State => ({
    newTrack: progressTrack,
    vows: useLocalStorage('vows', [])
  }),
  actions: {
    clearNewTrack() {
      Object.assign(this.newTrack, newProgressTrack)
    },
    // to refresh from defaults
    clearLocalStorage() {
      this.vows = []
    }
  }
})

import { defineStore } from 'pinia'
// import { useLocalStorage } from '@vueuse/core'
import type { ProgressTrack } from '@/types'

type State = {
  vows: ProgressTrack[]
}

export const useProgressTrackStore = defineStore('progressTrackStore', {
  state: (): State => ({
    vows: []
  })
})

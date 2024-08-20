import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import { newProgressTrack } from '@/constants'
import type { ProgressTrack, ProgressTrackType } from '@/types'

type State = {
  newTrack: ProgressTrack
  vows: RemovableRef<ProgressTrack[]>
  lastTouchedVow: RemovableRef<string>
}

const progressTrack = structuredClone(toRaw(newProgressTrack))

export const useProgressTrackStore = defineStore('progressTrackStore', {
  state: (): State => ({
    newTrack: progressTrack,
    vows: useLocalStorage('vows', []),
    lastTouchedVow: useLocalStorage('lastTouchedVow', '')
  }),
  actions: {
    addVow(trackType: ProgressTrackType) {
      this.newTrack.uuid = uuidv4()
      this.newTrack.type = trackType
      const newVow = structuredClone(toRaw(this.newTrack))
      this.vows.push(newVow)
      this.setLastTouched(this.newTrack.uuid)
      this.clearNewTrack()
    },
    clearNewTrack() {
      Object.assign(this.newTrack, newProgressTrack)
    },
    markComplete(selectedUuid: string) {
      const selectedVow = this.vows.find((vow) => vow.uuid === selectedUuid)
      if (selectedVow) {
        selectedVow.status = 'Complete'
      }
    },
    resetStatus(selectedUuid: string) {
      const selectedVow = this.vows.find((vow) => vow.uuid === selectedUuid)
      if (selectedVow) {
        selectedVow.status = 'In progress'
      }
    },
    markProgress(selectedUuid: string) {
      const selectedVow = this.vows.find((vow) => vow.uuid === selectedUuid)
      if (selectedVow) {
        const increaseAmount = () => {
          switch (selectedVow.rank) {
            case 1:
              return 3
            case 2:
              return 2
            case 3:
              return 1
            case 4:
              return 0.5
            case 5:
              return 0.25
            default:
              return 0
          }
        }
        const newTotal = (selectedVow.progress += increaseAmount())
        selectedVow.progress = newTotal < 10 ? newTotal : 10
        selectedVow.status = selectedVow.progress < 10 ? 'In progress' : 'Full'
      }
    },
    resetProgress(selectedUuid: string) {
      const selectedVow = this.vows.find((vow) => vow.uuid === selectedUuid)
      if (selectedVow) {
        selectedVow.progress = 0
        selectedVow.status = selectedVow.progress < 10 ? 'In progress' : 'Full'
      }
    },
    setLastTouched(uuid: string) {
      this.lastTouchedVow = uuid
    },
    // to refresh from defaults
    clearLocalStorage() {
      this.vows = []
    }
  }
})

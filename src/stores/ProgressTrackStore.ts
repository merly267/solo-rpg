import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import { newProgressTrack } from '@/constants'
import type { ProgressTrack, ProgressTrackType } from '@/types'

type State = {
  newTrack: ProgressTrack
  expeditions: RemovableRef<ProgressTrack[]>
  vows: RemovableRef<ProgressTrack[]>
  lastTouchedExpedition: RemovableRef<string>
  lastTouchedVow: RemovableRef<string>
}

const progressTrack = structuredClone(toRaw(newProgressTrack))

export const useProgressTrackStore = defineStore('progressTrackStore', {
  state: (): State => ({
    newTrack: progressTrack,
    expeditions: useLocalStorage('expeditions', []),
    vows: useLocalStorage('vows', []),
    lastTouchedExpedition: useLocalStorage('lastTouchedExpedition', ''),
    lastTouchedVow: useLocalStorage('lastTouchedVow', '')
  }),
  getters: {
    activeExpeditions: (state) => {
      return state.expeditions.filter((expedition) => expedition.status === 'In progress' || expedition.status === 'Full')
    },
    activeVows: (state) => {
      return state.vows.filter((vow) => vow.status === 'In progress' || vow.status === 'Full')
    },
    completedVows: (state) => {
      return state.vows.filter((vow) => vow.status === 'Complete')
    }
  },
  actions: {
    addTrack(trackType: ProgressTrackType) {
      this.newTrack.uuid = uuidv4()
      this.newTrack.type = trackType
      const newClonedTrack = structuredClone(toRaw(this.newTrack))
      if (trackType === 'Expedition') {
        this.expeditions.push(newClonedTrack)
      }
      if (trackType === 'Vow') {
        this.vows.push(newClonedTrack)
      }
      this.setLastTouched(trackType, this.newTrack.uuid)
      this.clearNewTrack()
    },
    clearNewTrack() {
      Object.assign(this.newTrack, newProgressTrack)
    },
    findTrack(uuid: string, trackType: ProgressTrackType) {
      if (trackType === 'Vow') {
        const selectedTrack = this.vows.find((vow) => vow.uuid === uuid)
        return selectedTrack
      }
      if (trackType === 'Expedition') {
        const selectedTrack = this.expeditions.find((expedition) => expedition.uuid === uuid)
        return selectedTrack
      }
    },
    increaseTrack(rank: number) {
      switch (rank) {
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
    },
    markComplete(selectedUuid: string, trackType: ProgressTrackType) {
      const selectedTrack = this.findTrack(selectedUuid, trackType)
      if (selectedTrack) {
        selectedTrack.status = 'Complete'
      }
    },
    markProgress(selectedUuid: string, trackType: ProgressTrackType) {
      const selectedTrack = this.findTrack(selectedUuid, trackType)
      if (selectedTrack) {
        const increaseAmount = this.increaseTrack(selectedTrack.rank)
        const newTotal = (selectedTrack.progress += increaseAmount)
        selectedTrack.progress = newTotal < 10 ? newTotal : 10
        selectedTrack.status = selectedTrack.progress < 10 ? 'In progress' : 'Full'
      }
    },
    setLastTouched(trackType: ProgressTrackType, uuid: string) {
      if (trackType === 'Expedition') {
        this.lastTouchedExpedition = uuid
      }
      if (trackType === 'Vow') {
        this.lastTouchedVow = uuid
      }
    },
    // to refresh from defaults
    clearLocalStorage() {
      this.vows = []
      this.expeditions = []
    }
  }
})

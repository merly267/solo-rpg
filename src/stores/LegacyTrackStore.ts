import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import type { LegacyTrack } from '@/types'

type State = {
  quests: RemovableRef<LegacyTrack>
  bonds: RemovableRef<LegacyTrack>
  discoveries: RemovableRef<LegacyTrack>
}

export const useLegacyTrackStore = defineStore('legacyTrackStore', {
  state: (): State => ({
    quests: useLocalStorage('quests', {
      name: 'Quests',
      progress: 0
    }),
    bonds: useLocalStorage('bonds', {
      name: 'Bonds',
      progress: 0
    }),
    discoveries: useLocalStorage('discoveries', {
      name: 'Discoveries',
      progress: 0
    })
  }),
  actions: {
    markQuestProgress(rank: number) {
      const increaseAmount = () => {
        switch (rank) {
          case 1:
            return 0.25
          case 2:
            return 0.5
          case 3:
            return 1
          case 4:
            return 2
          case 5:
            return 3
          default:
            return 0
        }
      }
      this.quests.progress += increaseAmount()
    },
    markDiscoveryProgress(rank: number) {
      const increaseAmount = () => {
        switch (rank) {
          case 1:
            return 0.25
          case 2:
            return 0.5
          case 3:
            return 1
          case 4:
            return 2
          case 5:
            return 3
          default:
            return 0
        }
      }
      this.discoveries.progress += increaseAmount()
    }
  }
})

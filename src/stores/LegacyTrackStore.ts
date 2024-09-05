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
  })
})

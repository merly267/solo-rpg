import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import type { StashedAdd } from '@/types'

type State = {
  stashedAdds: RemovableRef<StashedAdd[]>
}

export const usestashedAddstore = defineStore('stashedAddsStore', {
  state: (): State => ({
    stashedAdds: useLocalStorage('stashedAdds', [])
  }),
  actions: {
    // clearNewTrack() {
    //   Object.assign(this.newTrack, newProgressTrack)
    // },
    // to refresh from defaults
    clearLocalStorage() {
      this.stashedAdds = []
    }
  }
})

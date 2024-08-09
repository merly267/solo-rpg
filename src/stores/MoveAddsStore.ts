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
  getters: {
    selected(state) {
      const initialValue = 0
      const selectedStashed = state.stashedAdds.filter((stashed) => stashed.selected)
      const selectedAdds = selectedStashed.map((stash) => stash.add)
      const stashedTotal = selectedAdds.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      )
      return stashedTotal
    }
  },
  actions: {
    clearUsedAndExpiredStashed() {
      const remainingStashedList = this.stashedAdds.filter(
        (stashed) => (!stashed.selected && !stashed.nextOnly) || stashed.reusable
      )
      this.clearLocalStorage()
      this.stashedAdds = remainingStashedList
    },
    // to refresh from defaults
    clearLocalStorage() {
      this.stashedAdds = []
    }
  }
})

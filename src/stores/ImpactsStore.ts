import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { impactDefaults } from '@/constants'
import type { Impact } from '@/types'

type State = {
  impacts: RemovableRef<Impact[]>
}

const defaultImpactArray = structuredClone(toRaw(impactDefaults))

export const useImpactsStore = defineStore('impactsStore', {
  state: (): State => ({
    impacts: useLocalStorage('impacts', defaultImpactArray)
  }),
  getters: {
    impactsTotal: (state) => {
      return state.impacts.filter((imp) => imp.status).length
    }
  },
  actions: {
    clearImpact(impact: string) {
      const impactToAdjust = this.impacts.find((imp) => imp.name === impact)
      impactToAdjust!.status = false
    },
    markImpact(impact: string) {
      const impactToAdjust = this.impacts.find((imp) => imp.name === impact)
      impactToAdjust!.status = true
    },
    // to refresh from defaults
    clearLocalStorage() {
      this.impacts = defaultImpactArray
    }
  }
})

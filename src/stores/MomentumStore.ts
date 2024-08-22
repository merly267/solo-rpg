import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { useImpactsStore } from '@/stores/ImpactsStore'

const impactsStore = useImpactsStore()

export const useMomentumStore = defineStore('momentumStore', {
  state: () => ({
    defaultMomentumResetValue: 2,
    minMomentum: -6,
    momentum: useLocalStorage('momentum', 2)
  }),
  getters: {
    momentumResetValue: (state) => {
      if (impactsStore.impactsTotal > 1) {
        return 0
      } else if (impactsStore.impactsTotal > 0) {
        return 1
      } else return state.defaultMomentumResetValue
    },
    maxMomentum: () => {
      return 10 - impactsStore.impactsTotal
    }
  },
  actions: {
    addMomentum(x: number) {
      if (this.momentum == this.maxMomentum) {
        return
      }
      if (this.momentum + x > this.maxMomentum) {
        return (this.momentum = this.maxMomentum)
      }
      this.momentum += x
    },
    loseMomentum(x: number) {
      if (this.momentum == this.minMomentum) {
        return
      } else {
        this.momentum -= x
      }
    },
    resetMomentum() {
      this.momentum = this.momentumResetValue
    }
  }
})

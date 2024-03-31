import { defineStore } from 'pinia'
import { debilitiesTotal } from '../composables/useCharacterStats'

export const useMomentumStore = defineStore('momentumStore', {
  state: () => ({
    defaultMomentumResetValue: 2,
    minMomentum: -6,
    momentum: 2,
    momentumOutcome: ''
  }),
  getters: {
    momentumResetValue: (state) => {
      if (debilitiesTotal.value > 1) {
        return 0
      } else if (debilitiesTotal.value > 0) {
        return 1
      } else return state.defaultMomentumResetValue
    },
    maxMomentum: () => {
      return 10 - debilitiesTotal.value
    }
  },
  actions: {
    addMomentum(x) {
      if (this.momentum == this.maxMomentum) {
        return
      }
      if (this.momentum + x > this.maxMomentum) {
        return (this.momentum = this.maxMomentum)
      }
      this.momentum += x
    },
    loseMomentum(x) {
      if (this.momentum == this.minMomentum) {
        this.momentumOutcome = 'Your momentum is already at minumum. Face a setback instead.'
      } else {
        this.momentum -= x
      }
    },
    resetMomentum() {
      this.momentum = this.momentumResetValue
    }
  }
})

import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { useDiceStore } from '@/stores/DiceStore'
import { useMomentumStore } from '@/stores/MomentumStore'
import { outcomeList } from '@/constants'

const outcomes = outcomeList

const diceStore = useDiceStore()
const momentumStore = useMomentumStore()

export const useMoveOutcomeStore = defineStore('moveOutcomeStore', {
  state: () => ({
    latestActionScore: useLocalStorage('latestActionScore', 0),
    possibleMomentumSuccesses: useLocalStorage('possibleMomentumSuccesses', 0)
  }),
  actions: {
    calculateActionScore(stat: number, adds: number) {
      if (diceStore.actionDie.result + momentumStore.momentum == 0) {
        diceStore.actionDie.cancelled = true
        this.latestActionScore = stat + adds
      } else {
        this.latestActionScore = diceStore.actionDie.result + stat + adds
      }
    },
    clearActionScore() {
      this.latestActionScore = 0
    },
    checkSuccess() {
      diceStore.challengeDice.forEach((die) => {
        if (this.latestActionScore && die.rolled) {
          if (this.latestActionScore > die.result) {
            die.isSuccess = true
          } else {
            die.isSuccess = false
          }
        }
      })
    },
    checkMomentumSuccess() {
      diceStore.challengeDice.forEach((die) => {
        if (momentumStore.momentum > 0 && die.rolled) {
          if (momentumStore.momentum > die.result) {
            this.possibleMomentumSuccesses++
          }
        }
      })
    },
    resetMomentumSuccess() {
      this.possibleMomentumSuccesses = 0
    },
    useMomentumSuccess() {
      this.latestActionScore = momentumStore.momentum
      this.checkSuccess()
    },
    getOutcomeLabel(successes: number) {
      switch (successes) {
        case 2:
          return outcomes.strong.label
        case 1:
          return outcomes.weak.label
        case 0:
          return outcomes.miss.label
      }
    }
  }
})

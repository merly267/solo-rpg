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
    // latestMove: useLocalStorage('latestMove', '')
  }),
  getters: {
    outcomeLabel() {
      switch (diceStore.successes.length) {
        case 2:
          return outcomes.strong.label
        case 1:
          return outcomes.weak.label
        case 0:
          return outcomes.miss.label
      }
    },
    possibleOutcomeLabel(state) {
      switch (state.possibleMomentumSuccesses) {
        case 2:
          return outcomes.strong.label
        case 1:
          return outcomes.weak.label
        case 0:
          return outcomes.miss.label
      }
    },
    matchMessage() {
      if (diceStore.match?.length) {
        const result = diceStore.challengeDice[0].result
        if (result === 10) {
          return ' and a match on 10, the worst possible result...'
        } else {
            return ' and a match!'
        }
      } else {
        return null
      }
    }
  },
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
    }
  }
})

import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Die } from '@/types'

export const useDiceStore = defineStore('diceStore', {
  state: () => ({
    actionDie: useLocalStorage('actionDie', {
      max: 6,
      rolled: false,
      result: 0,
      cancelled: false
    }),
    challengeDice: useLocalStorage('challengeDice', [
      {
        id: 'challengeDie-0',
        max: 10,
        rolled: false,
        result: 0,
        isSuccess: false
      },
      {
        id: 'challengeDie-1',
        max: 10,
        rolled: false,
        result: 0,
        isSuccess: false
      }
    ])
  }),
  getters: {
    failures: (state) => {
      return state.challengeDice.filter((die) => die.rolled && !die.isSuccess)
    }
  },
  actions: {
    roll(die: Die) {
      die.result = Math.ceil(Math.random() * die.max)
      die.rolled = true
    },
    clear(die: Die) {
      die.result = 0
      die.isSuccess = false
      die.cancelled = false
      die.rolled = false
    }
  }
})

// const failures = computed(() => {
//   return diceStore.challengeDice.filter((die) => die.isSuccess === false)
// })

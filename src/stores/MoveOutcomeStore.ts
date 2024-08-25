import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useMoveOutcomeStore = defineStore('moveOutcomeStore', {
  state: () => ({
    latestFailures: useLocalStorage('latestFailures', 0)
  })
})

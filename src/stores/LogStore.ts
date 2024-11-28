import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

export const useProgressTrackStore = defineStore('progressTrackStore', {
  state: () => ({
    log: useLocalStorage('log', []),
  }),
})
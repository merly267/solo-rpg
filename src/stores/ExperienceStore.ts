import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useExperienceStore = defineStore('experienceStore', {
  state: () => ({
    experience: useLocalStorage('experience', 0)
  })
})

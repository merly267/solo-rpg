import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { debilityDefaults } from '@/constants'
import type { DebilityNew } from '@/types'

type State = {
  newDebilities: RemovableRef<DebilityNew[]>
}

const defaultDebilityArray = structuredClone(toRaw(debilityDefaults))

export const useDebilitiesStore = defineStore('debilitiesStore', {
  state: (): State => ({
    newDebilities: useLocalStorage('newDebilities', defaultDebilityArray)
  }),
  getters: {
    debilitiesTotal: (state) => {
      return state.newDebilities.filter((deb) => deb.status).length
    }
  },
  actions: {
    clearDebility(debility: string) {
      const debilityToAdjust = this.newDebilities.find((deb) => deb.name === debility)
      debilityToAdjust!.status = false
    },
    markDebility(debility: string) {
      const debilityToAdjust = this.newDebilities.find((deb) => deb.name === debility)
      debilityToAdjust!.status = true
    },
    // to refresh from defaults
    clearLocalStorage() {
      this.newDebilities = defaultDebilityArray
    }
  }
})

import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { debilityDefaults } from '@/constants'
import type { Debility } from '@/types'

type State = {
  debilities: RemovableRef<Debility[]>
}

const defaultDebilityArray = structuredClone(toRaw(debilityDefaults))

export const useDebilitiesStore = defineStore('debilitiesStore', {
  state: (): State => ({
    debilities: useLocalStorage('debilities', defaultDebilityArray)
  }),
  getters: {
    debilitiesTotal: (state) => {
      return state.debilities.filter((deb) => deb.status).length
    }
  },
  actions: {
    clearDebility(debility: string) {
      const debilityToAdjust = this.debilities.find((deb) => deb.name === debility)
      debilityToAdjust!.status = false
    },
    markDebility(debility: string) {
      const debilityToAdjust = this.debilities.find((deb) => deb.name === debility)
      debilityToAdjust!.status = true
    },
    // to refresh from defaults
    clearLocalStorage() {
      this.debilities = defaultDebilityArray
    }
  }
})

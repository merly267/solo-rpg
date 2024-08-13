import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useDebilitiesStore = defineStore('debilitiesStore', {
  state: () => ({
    debilities: useLocalStorage('debilities', [
      {
        name: 'Wounded',
        category: 'Conditions',
        status: false
      },
      {
        name: 'Shaken',
        category: 'Conditions',
        status: false
      },
      {
        name: 'Unprepared',
        category: 'Conditions',
        status: false
      },
      {
        name: 'Encumbered',
        category: 'Conditions',
        status: false
      },
      {
        name: 'Maimed',
        category: 'Banes',
        status: false
      },
      {
        name: 'Corrupted',
        category: 'Banes',
        status: false
      },
      {
        name: 'Cursed',
        category: 'Burdens',
        status: false
      },
      {
        name: 'Tormented',
        category: 'Burdens',
        status: false
      }
    ])
  })
})

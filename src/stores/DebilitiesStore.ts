import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import type { DebilityNew } from '@/types'

type State = {
  debilities: RemovableRef<DebilityNew[]>
}

export const useDebilitiesStore = defineStore('debilitiesStore', {
  state: (): State => ({
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

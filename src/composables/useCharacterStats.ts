import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import type { Character, DebilitiesGroup, Stat } from '@/types'

const defaultCharacterStats: Character = {
  name: '',
  health: 5,
  spirit: 5,
  supply: 5
}

const characterStats = useStorage('characterStats', defaultCharacterStats, localStorage, {
  mergeDefaults: true
})

export const character = ref(characterStats)

export const stats = ref<Stat[]>([
  {
    name: 'Edge',
    score: 1
  },
  {
    name: 'Heart',
    score: 1
  },
  {
    name: 'Iron',
    score: 3
  },
  {
    name: 'Shadow',
    score: 2
  },
  {
    name: 'Wits',
    score: 2
  }
])

const defaultDebilities = ref(<DebilitiesGroup[]>[
  {
    group: 'Conditions',
    debilitiesList: [
      {
        name: 'Wounded',
        status: false
      },
      {
        name: 'Shaken',
        status: false
      },
      {
        name: 'Unprepared',
        status: false
      },
      {
        name: 'Encumbered',
        status: false
      }
    ]
  },
  {
    group: 'Banes',
    debilitiesList: [
      {
        name: 'Maimed',
        status: false
      },
      {
        name: 'Corrupted',
        status: false
      }
    ]
  },
  {
    group: 'Burdens',
    debilitiesList: [
      {
        name: 'Cursed',
        status: false
      },
      {
        name: 'Tormented',
        status: false
      }
    ]
  }
])

export const debilities = useStorage('debilities', defaultDebilities, localStorage, {
  mergeDefaults: true
})

// to refresh from defaults
// debilities.value = null

export const debilitiesTotal = ref(0)

const countMarkedDebilities = () => {
  const debilitiesList = []
  debilities.value.forEach((group) => {
    const markedDebilities = group.debilitiesList.filter((debility) => debility.status === true)
    markedDebilities.forEach((debility) => debilitiesList.push(debility.name))
  })
  debilitiesTotal.value = debilitiesList.length
}

countMarkedDebilities()

export const experience = ref(0)

export const backgroundVow = ref('')

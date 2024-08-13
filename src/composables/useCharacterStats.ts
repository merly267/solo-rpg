import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import type { Character, Stat } from '@/types'

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
    score: 3
  },
  {
    name: 'Heart',
    score: 1
  },
  {
    name: 'Iron',
    score: 2
  },
  {
    name: 'Shadow',
    score: 1
  },
  {
    name: 'Wits',
    score: 2
  }
])

export const experience = ref(0)

export const backgroundVow = ref('')

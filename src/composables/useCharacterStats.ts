import { ref } from 'vue'
import type { Stat } from '@/types'

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

export const backgroundVow = ref('')

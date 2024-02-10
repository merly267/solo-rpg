import { ref } from 'vue'

export const name = ref('Edda')

export const stats = ref([
  {
    name: 'Edge',
    score: 3
  },
  {
    name: 'Heart',
    score: 2
  },
  {
    name: 'Iron',
    score: 1
  },
  {
    name: 'Shadow',
    score: 2
  },
  {
    name: 'Wits',
    score: 1
  }
])

export const momentum = ref(0)

export const health = ref(5)

export const spirit = ref(5)

export const supply = ref(0)

export const experience = ref(0)

export const vows = ref([])

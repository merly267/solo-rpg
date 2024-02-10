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

export const debilities = ref([
  {
    group: 'Conditions',
    debilitiesChecked: false,
    debilitiesList: [
      {
        name: 'Wounded',
        status: true
      },
      {
        name: 'Shaken',
        status: false
      },
      {
        name: 'Unprepared',
        status: true
      },
      {
        name: 'Encumbered',
        status: false
      }
    ]
  },
  {
    group: 'Banes',
    debilitiesChecked: false,
    debilitiesList: [
      {
        name: 'Maimed',
        status: true
      },
      {
        name: 'Corrupted',
        status: false
      }
    ]
  },
  {
    group: 'Burdens',
    debilitiesChecked: false,
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

export const experience = ref(0)

export const vows = ref([])

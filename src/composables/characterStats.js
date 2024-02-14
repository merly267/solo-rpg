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

export const health = ref(5)

export const spirit = ref(5)

export const supply = ref(0)

export const debilities = ref([
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

export let debilitiesTotal = ref(0)

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

export const vows = ref([])

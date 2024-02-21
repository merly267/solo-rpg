import { ref } from 'vue'
import { debilitiesTotal } from './useCharacterStats'

let momentumResetValue = 2

if (debilitiesTotal.value > 1) {
  momentumResetValue = 0
} else if (debilitiesTotal.value > 0) {
  momentumResetValue = 1
}

const minMomentum = -6

export const maxMomentum = ref(10 - debilitiesTotal.value)

export let momentum = ref(2)

export const addMomentum = (x) => {
  if (momentum.value == maxMomentum.value) {
    return
  }
  momentum.value += x
}

export const loseMomentum = (x) => {
  if (momentum.value == minMomentum) {
    momentumOutcome.value = 'Your momentum is already at minumum. Face a setback instead.'
  } else {
    momentum.value -= x
  }
}

export const resetMomentum = () => {
  momentum.value = momentumResetValue
}

export let momentumOutcome = ref('')

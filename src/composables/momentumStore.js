import { ref } from 'vue'
import { debilitiesTotal } from './characterStats'

let momentumResetValue = 2

if (debilitiesTotal > 1) {
  momentumResetValue = 0
} else if (debilitiesTotal > 0) {
  momentumResetValue = 1
}

export let momentum = ref(2)

export const addMomentum = (x) => {
  momentum.value += x
}

export const loseMomentum = (x) => {
  momentum.value -= x
}

export const resetMomentum = () => {
  momentum.value = momentumResetValue
}

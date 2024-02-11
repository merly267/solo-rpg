import { ref } from 'vue'

export const momentumResetValue = ref(2)
export let momentum = ref(2)

export const addMomentum = (x) => {
  momentum.value += x
}

export const loseMomentum = (x) => {
  momentum.value -= x
}

export const resetMomentum = () => {
  momentum.value = momentumResetValue.value
}

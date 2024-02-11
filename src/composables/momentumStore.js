import { ref } from 'vue'

export const momentumResetValue = ref(2)
export const momentum = ref(momentumResetValue)

export const addMomentum = (x) => {
  momentum.value += x
}

export const loseMomentum = (x) => {
  momentum.value -= x
}

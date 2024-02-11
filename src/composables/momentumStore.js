import { ref } from 'vue'
export const momentum = ref(0)

export const addMomentum = (x) => {
  momentum.value += x
}

export const loseMomentum = (x) => {
  momentum.value -= x
}

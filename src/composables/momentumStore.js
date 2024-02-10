import { ref } from 'vue'
export const momentum = ref(0)

export const adjustMomentum = () => {
  momentum.value += 1
}

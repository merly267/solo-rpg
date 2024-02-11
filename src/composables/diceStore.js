import { ref } from 'vue'

export const actionDie = ref({
  id: 'actionDie',
  max: 6,
  result: null
})

export const challengeDice = ref([
  {
    id: 'challengeDie-0',
    max: 10,
    result: null,
    isSuccess: null,
    isCancellable: null
  },
  {
    id: 'challengeDie-1',
    max: 10,
    result: null,
    isSuccess: null,
    isCancellable: null
  }
])

export function roll(die) {
  die.result = Math.ceil(Math.random() * die.max)
}

export function clear(die) {
  die.result = null
}

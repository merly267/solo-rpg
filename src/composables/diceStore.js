import { ref } from 'vue'

export const actionDie = ref({
  id: 'actionDie',
  max: 6,
  result: null,
  cancelled: false
})

export const challengeDice = ref([
  {
    id: 'challengeDie-0',
    max: 10,
    result: null,
    isSuccess: null,
    isCancellable: null,
    cancelled: false
  },
  {
    id: 'challengeDie-1',
    max: 10,
    result: null,
    isSuccess: null,
    isCancellable: null,
    cancelled: false
  }
])

export function roll(die) {
  die.result = Math.ceil(Math.random() * die.max)
}

export function clear(die) {
  die.result = null
  die.isSuccess = null
  die.isCancellable = null
  die.cancelled = false
}

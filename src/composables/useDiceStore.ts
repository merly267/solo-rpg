import { ref } from 'vue'
import type { Die } from '@/types'

export const actionDie = ref<Die>({
  id: 'actionDie',
  max: 6,
  rolled: false,
  result: 0,
  cancelled: false
})

export const challengeDice = ref<Die[]>([
  {
    id: 'challengeDie-0',
    max: 10,
    rolled: false,
    result: 0,
    isSuccess: null,
    isCancellable: null,
    cancelled: false
  },
  {
    id: 'challengeDie-1',
    max: 10,
    rolled: false,
    result: 0,
    isSuccess: null,
    isCancellable: null,
    cancelled: false
  }
])

export function roll(die: Die) {
  die.result = Math.ceil(Math.random() * die.max)
  die.rolled = true
}

export function clear(die: Die) {
  die.result = 0
  die.isSuccess = null
  die.isCancellable = null
  die.cancelled = false
  die.rolled = false
}

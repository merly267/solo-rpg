import type { outcomeList, statNamesList } from './constants'

export type Stat = {
  name: StatName
  score: number
  // set: boolean
}

export type Die = {
  id: string
  max: number
  rolled: boolean
  result: number | null
  cancelled: boolean
  isSuccess?: boolean | null
  isCancellable?: boolean | null
}

export type Move = {
  title: string
}

export type MovesList = {
  [name: string]: Move
}

export type OutcomeList = typeof outcomeList

type StatName = (typeof statNamesList)[number]

import type { outcomeList, statNamesList } from './constants'

export type Stat = {
  name: StatName
  score: number
  // set: boolean
}

export type Debility = {
  name: string
  status: boolean
}

export type DebilitiesGroup = {
  group: string
  debilitiesList: Debility[]
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
  slug: string
}

export type MovesList = {
  [name: string]: Move
}

export type OutcomeList = typeof outcomeList

export type StatName = (typeof statNamesList)[number]

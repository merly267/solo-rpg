import type { outcomeList, statNamesList } from './constants'

export type Character = {
  name: string
  health: number
  spirit: number
  supply: number
}

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
  result: number
  cancelled: boolean
  isSuccess?: boolean
  isCancellable?: boolean
}

export type Move = {
  title: string
  slug: string
  trigger?: string
}

export type MovesList = {
  [name: string]: Move
}

export type OutcomeList = typeof outcomeList

export type StatName = (typeof statNamesList)[number]

import type { moveTypeList, outcomeList, progressRanksList, statNamesList } from './constants'

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
  moveType: MoveType
  trigger?: string
}

export type MovesList = {
  [name: string]: Move
}

export type OutcomeList = typeof outcomeList

export type ProgressRank = (typeof progressRanksList)[number]

export type StatName = (typeof statNamesList)[number]

export type MoveType = (typeof moveTypeList)[number]

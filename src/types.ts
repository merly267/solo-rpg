import type {
  impactCategoriesList,
  impactOperations,
  moveTypeList,
  outcomeList,
  outcomeResultsList,
  progressRanksList,
  progressTrackStatusList,
  progressTrackTypesList,
  statNamesList
} from './constants'

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

export type Impact = {
  name: string
  category: ImpactCategory
  status: boolean
}

export type ProgressTrack = {
  uuid: string
  name: string
  rank: number
  type: ProgressTrackType
  progress: number
  status: ProgressTrackStatus
}

export type StashedAdd = {
  uuid: string
  source: string
  add: number
  includeProgress?: boolean
  reusable?: boolean
  nextOnly?: boolean
  selected: boolean
}

export type Die = {
  id?: string
  max: number
  rolled: boolean
  result: number
  cancelled?: boolean
  isSuccess?: boolean
  isCancellable?: boolean
}

export type Move = {
  title: string
  slug: string
  moveType: MoveType
  progress?: boolean
  trigger?: string
}

export type MovesList = {
  [name: string]: Move
}

export type Outcome = {
  outcome: OutcomeResult
}

export type ImpactCategory = (typeof impactCategoriesList)[number]

export type ImpactOperation = (typeof impactOperations)[number]

export type OutcomeList = typeof outcomeList

export type OutcomeResult = (typeof outcomeResultsList)[number]

export type ProgressRank = (typeof progressRanksList)[number]

export type ProgressTrackStatus = (typeof progressTrackStatusList)[number]

export type ProgressTrackType = (typeof progressTrackTypesList)[number]

export type StatName = (typeof statNamesList)[number]

export type MoveType = (typeof moveTypeList)[number]

import type {
  impactCategoriesList,
  impactOperations,
  moveTypeList,
  outcomeList,
  outcomeResultsList,
  progressRanksList,
  progressTrackStatusList,
  progressTrackTypesList,
  rankNamesList,
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

export type RankInfo = {
  name: RankName
  level: number
}

export type LegacyTrack = {
  name: string
  progress: number
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
  lowest?: boolean
}

export type TableRow = {
  min: number
  max: number
  res: string
}

export type StatToSelect = {
  value: StatName
  label: string
}

export type Move = {
  title: string
  componentName: string
  slug: string
  moveType: MoveType
  progress?: boolean
  trigger?: string
  stats?: StatToSelect[]
}

export type MovesList = {
  [name: string]: Move
}

export type LogEntry = {
  timestamp: number
  entryText?: string
  move?: string
  stat?: string
  outcome?: string
  match?: string
}

export type ImpactCategory = (typeof impactCategoriesList)[number]

export type ImpactOperation = (typeof impactOperations)[number]

export type OutcomeList = typeof outcomeList

export type OutcomeResult = (typeof outcomeResultsList)[number]

export type ProgressRank = (typeof progressRanksList)[number]

export type ProgressTrackStatus = (typeof progressTrackStatusList)[number]

export type ProgressTrackType = (typeof progressTrackTypesList)[number]

export type StatName = (typeof statNamesList)[number]

export type RankName = (typeof rankNamesList)[number]

export type MoveType = (typeof moveTypeList)[number]

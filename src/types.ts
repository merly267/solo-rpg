import type { statNamesList } from './constants'

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

type StatName = (typeof statNamesList)[number]

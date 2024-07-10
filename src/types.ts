export type Stat = {
  name: string
  score: number
}

export type Die = {
  id: string
  max: number
  result: number | null
  cancelled: boolean
  isSuccess?: boolean | null
  isCancellable?: boolean | null
}

// export type OutcomeStatus = 'Strong hit' | 'Weak hit' | 'Miss'

import type { ProgressTrack } from '@/types'

export const moveTypeList = [
  'Adventure',
  'Relationship',
  'Combat',
  'Suffer',
  'Quest',
  'Fate'
] as const

export const newProgressTrack: ProgressTrack = {
  uuid: '',
  name: '',
  rank: 0,
  type: '',
  progress: 0,
  status: 'In progress'
}

export const outcomeList = {
  strong: {
    label: 'Strong hit'
  },
  weak: {
    label: 'Weak hit'
  },
  miss: {
    label: 'Miss'
  }
} as const

export const progressRanksList = [
  {
    name: 'Troublesome',
    level: 1
  },
  {
    name: 'Dangerous',
    level: 2
  },
  {
    name: 'Formidable',
    level: 3
  },
  {
    name: 'Extreme',
    level: 4
  },
  {
    name: 'Epic',
    level: 5
  }
] as const

export const progressTrackTypesList = ['Vow', ''] as const

export const progressTrackStatusList = ['In progress', 'Complete', 'Forsaken', ''] as const

export const statNamesList = ['Edge', 'Heart', 'Iron', 'Shadow', 'Wits', ''] as const

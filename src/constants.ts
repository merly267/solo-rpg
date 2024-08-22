import type { Impact, ProgressTrack } from '@/types'

export const maxHealth = 5
export const maxSupply = 5

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

export const outcomeResultsList = ['Strong hit', 'Weak hit', 'Miss'] as const

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

export const impactDefaults: Impact[] = [
  {
    name: 'Wounded',
    category: 'Conditions',
    status: false
  },
  {
    name: 'Shaken',
    category: 'Conditions',
    status: false
  },
  {
    name: 'Unprepared',
    category: 'Conditions',
    status: false
  },
  {
    name: 'Encumbered',
    category: 'Conditions',
    status: false
  },
  {
    name: 'Maimed',
    category: 'Banes',
    status: false
  },
  {
    name: 'Corrupted',
    category: 'Banes',
    status: false
  },
  {
    name: 'Cursed',
    category: 'Burdens',
    status: false
  },
  {
    name: 'Tormented',
    category: 'Burdens',
    status: false
  }
] as const

export const progressTrackTypesList = ['Vow', ''] as const

export const progressTrackStatusList = ['In progress', 'Full', 'Complete', 'Forsaken', ''] as const

export const statNamesList = ['Edge', 'Heart', 'Iron', 'Shadow', 'Wits', ''] as const

export const impactCategoriesList = ['Conditions', 'Banes', 'Burdens', 'Other'] as const

export const impactOperations = ['Mark', 'Clear'] as const

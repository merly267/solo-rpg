import type { MovesList } from '@/types'

export const movesList: MovesList = {
  faceDanger: {
    title: 'Face Danger',
    slug: 'face-danger',
    moveType: 'Adventure',
    trigger: 'attempt something risky or react to an imminent threat'
  },
  secureAdvantage: {
    title: 'Secure an Advantage',
    slug: 'secure-advantage',
    moveType: 'Adventure',
    trigger: 'you assess a situation, make preparations, or attempt to gain leverage'
  },
  gatherInfo: {
    title: 'Gather Information',
    slug: 'gather-information',
    moveType: 'Adventure',
    trigger: 'search an area, ask questions, conduct an investigation, or follow a track'
  },
  swearVow: {
    title: 'Swear an Iron Vow',
    slug: 'swear-vow',
    moveType: 'Quest',
    trigger: 'swear upon iron to complete a quest'
  }
}

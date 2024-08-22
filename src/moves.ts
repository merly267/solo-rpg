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
    trigger: 'assess a situation, make preparations, or attempt to gain leverage'
  },
  gatherInfo: {
    title: 'Gather Information',
    slug: 'gather-information',
    moveType: 'Adventure',
    trigger: 'search for clues, conduct an investigation, analyze evidence, or do research'
  },
  healMove: {
    title: 'Heal',
    slug: 'heal',
    moveType: 'Adventure',
    trigger: 'treat an injury or ailment'
  },
  resupplyMove: {
    title: 'Resupply',
    slug: 'resupply',
    moveType: 'Adventure',
    trigger: 'hunt, forage, or scavenge'
  },
  swearVow: {
    title: 'Swear an Iron Vow',
    slug: 'swear-vow',
    moveType: 'Quest',
    trigger: 'swear upon iron to complete a quest'
  },
  reachMilestone: {
    title: 'Reach a Milestone',
    slug: 'reach-milestone',
    moveType: 'Quest',
    trigger: 'make significant progress in your quest'
  },
  fulfillVow: {
    title: 'Fulfill Your Vow',
    slug: 'fulfill-vow',
    moveType: 'Quest',
    trigger: 'achieve what you believe to be the fulfillment of your vow',
    progress: true
  }
}

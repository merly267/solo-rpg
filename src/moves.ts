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
  compelMove: {
    title: 'Compel',
    slug: 'compel',
    moveType: 'Adventure',
    trigger: 'try to persuade someone or make them an offer'
  },
  checkGear: {
    title: 'Check your Gear',
    slug: 'check-gear',
    moveType: 'Adventure',
    trigger: 'check to see if you have a specific helpful item or resource'
  },
  swearVow: {
    title: 'Swear an Iron Vow',
    slug: 'swear-vow',
    moveType: 'Quest',
    trigger: 'swear to complete a quest'
  },
  reachMilestone: {
    title: 'Reach a Milestone',
    slug: 'reach-milestone',
    moveType: 'Quest',
    trigger: 'make headway in your quest'
  },
  fulfillVow: {
    title: 'Fulfill Your Vow',
    slug: 'fulfill-vow',
    moveType: 'Quest',
    trigger: 'reach the end of your quest',
    progress: true
  },
  undertakeExpedition: {
    title: 'Undertake an Expedition',
    slug: 'undertake-expedition',
    moveType: 'Exploration',
    trigger:
      'sail an unfamiliar route through perilous seas, find the way across hazardous terrain, or explore a mysterious site'
  },
  finishExpedition: {
    title: 'Finish an Expedition',
    slug: 'finish-expedition',
    moveType: 'Exploration',
    trigger: 'your expedition comes to an end',
    progress: true
  },
  healMove: {
    title: 'Heal',
    slug: 'heal',
    moveType: 'Recover',
    trigger: 'receive medical care or provide treatment'
  },
  resupplyMove: {
    title: 'Resupply',
    slug: 'resupply',
    moveType: 'Recover',
    trigger: 'attempt to bolster your readiness'
  }
}

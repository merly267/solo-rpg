import type { MovesList } from '@/types'

export const movesList: MovesList = {
  faceDanger: {
    title: 'Face Danger',
    slug: 'face-danger',
    moveType: 'Adventure',
    trigger: 'attempt something risky or react to an imminent threat',
    stats: [
      {
        value: 'Edge',
        label: 'With speed, mobility, or agility'
      },
      {
        value: 'Heart',
        label: 'With resolve, command, or sociability'
      },
      {
        value: 'Iron',
        label: 'With strength, endurance, or aggression'
      },
      {
        value: 'Shadow',
        label: 'With deception, stealth, or trickery'
      },
      {
        value: 'Wits',
        label: 'With expertise, focus, or observation'
      }
    ]
  },
  secureAdvantage: {
    title: 'Secure an Advantage',
    slug: 'secure-advantage',
    moveType: 'Adventure',
    trigger: 'assess a situation, make preparations, or attempt to gain leverage',
    stats: [
      {
        value: 'Edge',
        label: 'With speed, mobility, or agility'
      },
      {
        value: 'Heart',
        label: 'With resolve, command, or sociability'
      },
      {
        value: 'Iron',
        label: 'With strength, endurance, or aggression'
      },
      {
        value: 'Shadow',
        label: 'With deception, stealth, or trickery'
      },
      {
        value: 'Wits',
        label: 'With expertise, focus, or observation'
      }
    ]
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
    trigger: 'try to persuade someone or make them an offer',
    stats: [
      {
        value: 'Heart',
        label: 'Charm, pacify, encourage, or barter'
      },
      {
        value: 'Iron',
        label: 'Threaten or incite'
      },
      {
        value: 'Shadow',
        label: 'Lie or swindle'
      }
    ]
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
      'sail an unfamiliar route through perilous seas, find the way across hazardous terrain, or explore a mysterious site',
      stats: [
        {
          value: 'Edge',
          label: 'Move at speed'
        },
        {
          value: 'Shadow',
          label: 'Keep a low profile'
        },
        {
          value: 'Wits',
          label: 'Stay vigilant'
        }
      ]
  },
  exploreWaypoint: {
    title: 'Explore a Waypoint',
    slug: 'explore-waypoint',
    moveType: 'Exploration',
    trigger: 'divert from an expedition to examine a notable location'
  },
  finishExpedition: {
    title: 'Finish an Expedition',
    slug: 'finish-expedition',
    moveType: 'Exploration',
    trigger: 'your expedition comes to an end',
    progress: true
  },
  setCourse: {
    title: 'Set a Course',
    slug: 'set-course',
    moveType: 'Exploration',
    trigger:
      'travel a known route through perilous seas, across hazardous terrain, or within a mysterious site'
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

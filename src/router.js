export const routes = [
  {
    path: '/',
    component: () => import('./views/CharacterSheet.vue')
  },
  {
    path: '/character',
    component: () => import('./views/CharacterSheet.vue')
  },
  {
    path: '/vows',
    component: () => import('./views/VowsList.vue')
  },
  {
    path: '/moves',
    component: () => import('./views/MovesList.vue')
  },
  {
    path: '/moves/face-danger',
    component: () => import('./views/moves/FaceDanger.vue')
  },
  {
    path: '/moves/secure-advantage',
    component: () => import('./views/moves/SecureAdvantage.vue')
  },
  {
    path: '/moves/gather-information',
    component: () => import('./views/moves/GatherInformation.vue')
  },
  {
    path: '/moves/compel',
    component: () => import('./views/moves/CompelMove.vue')
  },
  {
    path: '/moves/check-gear',
    component: () => import('./views/moves/CheckGear.vue')
  },
  {
    path: '/moves/swear-vow',
    component: () => import('./views/moves/SwearVow.vue')
  },
  {
    path: '/moves/reach-milestone',
    component: () => import('./views/moves/ReachMilestone.vue')
  },
  {
    path: '/moves/fulfill-vow',
    component: () => import('./views/moves/FulfillVow.vue')
  },
  {
    path: '/moves/undertake-expedition',
    component: () => import('./views/moves/UndertakeExpedition.vue')
  },
  {
    path: '/moves/finish-expedition',
    component: () => import('./views/moves/FinishExpedition.vue')
  },
  {
    path: '/moves/heal',
    component: () => import('./views/moves/HealMove.vue')
  },
  {
    path: '/moves/resupply',
    component: () => import('./views/moves/ResupplyMove.vue')
  }
]

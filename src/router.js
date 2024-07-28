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
    path: '/action-move',
    component: () => import('./views/GenericActionMove.vue')
  },
  {
    path: '/moves',
    component: () => import('./views/MovesList.vue')
  },
  {
    path: '/moves/gather-information',
    component: () => import('./views/moves/GatherInformation.vue')
  }
]

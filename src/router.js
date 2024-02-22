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
    component: () => import('./views/ActionMove.vue')
  }
]

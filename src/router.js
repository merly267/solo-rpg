import CharacterSheet from './views/CharacterSheet.vue'
import ActionMove from './views/ActionMove.vue'

export const routes = [
  {
    path: '/',
    component: CharacterSheet
  },
  {
    path: '/character',
    component: CharacterSheet
  },
  {
    path: '/action-move',
    component: ActionMove
  }
]

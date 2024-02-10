<script>
import CharacterSheet from './components/CharacterSheet.vue'
import GenericMove from './components/GenericMove.vue'
import NewMove from './components/NewMove.vue'
export default {
  components: {
    CharacterSheet,
    GenericMove,
    NewMove
  },
  data: () => ({
    currentTab: 'CharacterSheet',
    tabs: ['CharacterSheet', 'GenericMove', 'NewMove']
  })
}
</script>

<template>
  <h1>Solo RPG</h1>

  <button v-for="tab in tabs" :key="tab" @click="currentTab = tab">{{ tab }}</button>
  <component :is="currentTab" />
</template>

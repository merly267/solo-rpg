<script>
import CharacterSheet from './components/CharacterSheet.vue'
import GenericMove from './components/GenericMove.vue'
export default {
  components: {
    CharacterSheet,
    GenericMove
  },
  data: () => ({
    currentTab: 'CharacterSheet',
    tabs: ['CharacterSheet', 'GenericMove']
  })
}
</script>

<template>
  <h1>Solo RPG</h1>

  <button v-for="tab in tabs" :key="tab" @click="currentTab = tab">{{ tab }}</button>
  <component :is="currentTab" />
</template>

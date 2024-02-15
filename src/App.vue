<script>
import CharacterSheet from './components/CharacterSheet.vue'
import ActionMove from './components/ActionMove.vue'
export default {
  components: {
    CharacterSheet,
    ActionMove
  },
  data: () => ({
    currentTab: 'CharacterSheet',
    tabs: ['CharacterSheet', 'ActionMove']
  })
}
</script>

<template>
  <h1>Solo RPG</h1>

  <button v-for="tab in tabs" :key="tab" @click="currentTab = tab">{{ tab }}</button>
  <component :is="currentTab" />
</template>

<style>
:root {
  --die-size: 2em;
  --die-text: white;
  --die-bg: darkgrey;
  --rolled-bg: black;
  --success-bg: green;
  --failure-bg: red;
}
</style>

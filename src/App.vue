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
  --app-text: #eeeeee;
  --app-bg: #222222;
  --grey-text: #b0b0b0;
  --die-size: 2em;
  --die-text: var(--app-text);
  --die-bg: #757575;
  --rolled-bg: var(--app-text);
  --success-bg: #0b7d0b;
  --failure-bg: #b80d0d;

  color: var(--app-text);
  background-color: var(--app-bg);
}

button {
  color: var(--app-text);
  background-color: var(--app-bg);
  border: 1px solid var(--app-text);
  border-radius: 0.25em;
  margin: 0.25em;
  padding: 0.25em 0.5em;
}
button:disabled {
  opacity: 0.5;
}
</style>

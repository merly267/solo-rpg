<template>
  <h1>Solo RPG</h1>
  <nav>
    <router-link to="/character">Character sheet</router-link>
    <router-link to="/action-move">Action move</router-link>
    <router-link to="/moves">Moves</router-link>
  </nav>
  <router-view />
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

nav a {
  margin-right: 0.5em;
  color: var(--app-text);
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

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
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700;800&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

:root {
  --noto: 'Noto Sans', sans-serif;
  --mukta: 'Mukta', sans-serif;
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

html,
body {
  font-family: var(--mukta);
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--noto);
  }
}

nav a {
  margin-right: 0.5em;
  color: var(--app-text);
}

button {
  font-family: var(--mukta);
  color: var(--app-text);
  background-color: var(--app-bg);
  border: 1px solid var(--app-text);
  border-radius: 0.25em;
  margin: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1rem;
}
button:disabled {
  opacity: 0.5;
}
</style>

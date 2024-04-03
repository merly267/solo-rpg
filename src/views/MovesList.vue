<template>
  <h2>Moves</h2>

  <h3><button @click="$router.push('/moves/gather-information')">Gather information</button></h3>
  <p>
    When you <strong>search an area</strong>, <strong>ask questions</strong>,
    <strong>conduct an investigation</strong>, or <strong>follow a track</strong>, roll +wits.
  </p>

  <p>
    If you act within a community or ask questions of a person with whom you share a bond, add +1.
  </p>
</template>

<style>
h3 button {
  padding: 0 0.5rem 0.1rem;
  font-size: 1.3rem;
  text-transform: uppercase;
  font-variant: all-small-caps;
  cursor: pointer;
}
p {
  font-size: 0.95rem;
  margin: 0.5rem 0;
}
</style>

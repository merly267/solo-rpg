<script setup lang="ts">
import { movesList } from '@/moves'
</script>
<template>
  <h2>Moves</h2>
  <h3>
    <button @click="$router.push(`/moves/${movesList.faceDanger.slug}`)">
      {{ movesList.faceDanger.title }}
    </button>
  </h3>
  <p v-html="movesList.faceDanger.precis"></p>

  <h3>
    <button @click="$router.push(`/moves/${movesList.gatherInfo.slug}`)">
      {{ movesList.gatherInfo.title }}
    </button>
  </h3>
  <p v-html="movesList.gatherInfo.precis"></p>
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

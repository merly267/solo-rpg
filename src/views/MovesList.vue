<script setup lang="ts">
import { movesList } from '@/moves'
</script>
<template>
  <h2>Moves</h2>
  <div v-for="(move, index) in movesList" :key="`move-${index}`">
    <h3>
      <button @click="$router.push(`/moves/${move.slug}`)">
        {{ move.title }}
      </button>
    </h3>
    <span class="trigger">{{ move.trigger }}.</span>
  </div>
</template>

<style>
h3 {
  margin-bottom: 0;
}
h3 button {
  padding: 0 0.5rem 0.1rem;
  font-size: 1.3rem;
  text-transform: uppercase;
  font-variant: all-small-caps;
  cursor: pointer;
}
.trigger {
  display: inline-block;
  font-size: 0.95rem;
  margin: 0.5rem 0;
}

.trigger::first-letter {
  text-transform: capitalize;
}

@media (min-width: 768px) {
  h3,
  .trigger {
    display: inline;
  }
  .trigger:before {
    content: ' - ';
  }
}
</style>

<script setup lang="ts">
import { movesList } from '@/moves'
</script>
<template>
  <h2>Moves</h2>
  <dl v-for="(move, index) in movesList" :key="`move-${index}`">
    <dt>
      <router-link :to="{ path: `/moves/${move.slug}` }" class="move">{{ move.title }}</router-link>
    </dt>
    <dd class="trigger">{{ move.trigger }}.</dd>
  </dl>
</template>

<style scoped>
dl {
  margin: 0;
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
  dt,
  .trigger {
    display: inline;
  }
  .trigger:before {
    content: ' - ';
  }
}
</style>

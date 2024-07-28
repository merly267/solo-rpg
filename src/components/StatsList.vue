<script setup lang="ts">
import { stats as statsList } from '@/composables/useCharacterStats.js'
</script>
<template>
  <h2>Stats</h2>
  <p v-if="statsList.length === 0">Please select your character's stats</p>
  <ul v-else>
    <li v-for="(stat, index) in statsList" :key="`stat-${index}`">
      <span class="name">{{ stat.name }}</span
      >:
      <span class="stat">{{ stat.score }}</span>
    </li>
  </ul>
</template>

<script setup>
import {
  name,
  experience,
  vows,
  momentum,
  health,
  spirit,
  supply
} from '../composables/characterStats.js'
import StatsList from './StatsList.vue'
</script>
<template>
  <h1>{{ name }}</h1>
  <p>Experience: {{ experience }}</p>
  <p v-if="vows.length">Vows: {{ vows }}</p>
  <p v-else>Make a vow</p>
  <StatsList />
  <p>Momentum: {{ momentum }}</p>
  <p>Health: {{ health }}</p>
  <p>Spirit: {{ spirit }}</p>
  <p>Supply: {{ supply }}</p>
</template>

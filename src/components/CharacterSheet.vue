<script setup>
import { name, experience } from '../composables/characterStats.js'
import StatsList from './StatsList.vue'
</script>
<template>
  <h1>{{ name }}</h1>
  <p>Experience: {{ experience }}</p>
  <StatsList />
</template>

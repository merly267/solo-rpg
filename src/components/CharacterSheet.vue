<script setup>
import { name } from '../composables/characterStats.js'
import StatsList from './StatsList.vue'
</script>
<template>
  <h1>{{ name }}</h1>
  <p>Here is the character sheet</p>
  <StatsList />
</template>

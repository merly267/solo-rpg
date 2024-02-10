<script setup>
import { actionDie } from '../composables/diceStore.js'
import BaseDie from './BaseDie.vue'
</script>
<template>
  <h2>Action die</h2>
  <BaseDie :die="actionDie" />
</template>

<script setup>
import { actionDie } from '../composables/diceStore.js'
import BaseDie from './BaseDie.vue'
</script>
<template>
  <BaseDie :die="actionDie" />
</template>

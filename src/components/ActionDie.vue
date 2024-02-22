<script setup>
import { actionDie } from '@/composables/useDiceStore.js'
import BaseDie from './BaseDie.vue'
</script>
<template>
  <BaseDie :die="actionDie" />
</template>

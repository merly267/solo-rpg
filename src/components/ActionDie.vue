<script setup lang="ts">
import { actionDie } from '@/composables/useDiceStore'
import BaseDie from './BaseDie.vue'
</script>
<template>
  <BaseDie :die="actionDie" />
</template>

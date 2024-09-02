<script setup lang="ts">
import BaseDie from './BaseDie.vue'
import { useDiceStore } from '@/stores/DiceStore'

const diceStore = useDiceStore()
</script>
<template>
  <BaseDie :die="diceStore.actionDie" />
</template>

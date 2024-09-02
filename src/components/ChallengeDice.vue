<script setup lang="ts">
import BaseDie from './BaseDie.vue'
import { useDiceStore } from '@/stores/DiceStore'

const diceStore = useDiceStore()
</script>
<template>
  <div class="challenge">
    <h3>Challenge dice</h3>
    <ul class="dice">
      <li v-for="die in diceStore.challengeDice" :key="die.id">
        <BaseDie :die="die" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
h3 {
  margin-block-end: 1em;
}
.dice {
  margin-top: 0;
  padding: 0;
}

.dice li {
  display: inline-block;
}
</style>

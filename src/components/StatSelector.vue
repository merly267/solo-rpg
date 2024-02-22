<script setup>
import { stats as statsList } from '@/composables/useCharacterStats.js'

defineEmits(['setSelected'])

defineProps({
  selected: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <h3>Stats</h3>
  <p v-if="statsList.length === 0">Please select your character's stats</p>
  <ul v-else>
    <li v-for="(stat, index) in statsList" :key="`stat-${index}`">
      <button
        type="button"
        class="aspect"
        @click="$emit('setSelected', stat)"
        :class="{ chosen: stat.name === selected.name }"
      >
        <span class="name">{{ stat.name }}</span
        >:
        <span class="stat">{{ stat.score }}</span>
      </button>
    </li>
  </ul>
</template>

<style>
.chosen {
  font-weight: bold;
}
</style>

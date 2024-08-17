<script setup lang="ts">
import { stats as statsList } from '@/composables/useCharacterStats.js'
import type { Stat } from '@/types'

type PropTypes = {
  selected: Stat
}

const emit = defineEmits<{
  (e: 'setSelected', stat: Stat): void
}>()

const setSelected = (stat: Stat) => {
  emit('setSelected', stat)
}

const props = defineProps<PropTypes>()
</script>
<template>
  <h3>Stats</h3>
  <p v-if="statsList.length === 0">Please select your character's stats</p>
  <ul v-else>
    <li v-for="(stat, index) in statsList" :key="`stat-${index}`">
      <button
        type="button"
        class="aspect"
        @click="setSelected(stat)"
        :class="{ chosen: stat.name === props.selected.name }"
      >
        <span class="name">{{ stat.name }}</span
        >:
        <span class="stat">{{ stat.score }}</span>
      </button>
    </li>
  </ul>
</template>

<style scoped>
.chosen {
  font-weight: bold;
}
</style>

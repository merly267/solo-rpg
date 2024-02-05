<script>
export default {
  props: {
    selected: {
      type: Object,
      required: true
    }
  },
  emits: ['setSelected'],
  data: () => ({
    statsList: [
      {
        name: 'Edge',
        score: 3
      },
      {
        name: 'Heart',
        score: 2
      },
      {
        name: 'Iron',
        score: 1
      },
      {
        name: 'Shadow',
        score: 2
      },
      {
        name: 'Wits',
        score: 1
      }
    ]
  })
}
</script>
<template>
  <h2>Stats</h2>
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

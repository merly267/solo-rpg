<script setup>
import {
  name,
  experience,
  vows,
  health,
  spirit,
  supply,
  debilities
} from '../composables/useCharacterStats.js'

import StatsList from '../components/StatsList.vue'
import { momentum } from '../composables/useMomentumStore.js'
</script>

<template>
  <h2>{{ name }}</h2>
  <p>Experience: {{ experience }}</p>
  <p v-if="vows.length">Vows: {{ vows }}</p>
  <p v-else>Make a vow</p>
  <StatsList />
  <p>Momentum: {{ momentum }}</p>
  <p>Health: {{ health }}</p>
  <p>Spirit: {{ spirit }}</p>
  <p>Supply: {{ supply }}</p>
  <h2>Debilities</h2>
  <ul>
    <li v-for="group in debilities" :key="group.group">
      <h3>{{ group.group }}</h3>
      <ul>
        <li
          class="debility"
          v-for="debility in group.debilitiesList"
          :key="debility.name"
          :class="{ marked: debility.status }"
        >
          {{ debility.name }}: {{ debility.status }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<style>
.debility {
  color: var(--grey-text);
}
.marked {
  color: var(--app-text);
  font-weight: bold;
}
</style>

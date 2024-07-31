<script setup lang="ts">
import { character, experience, vows, debilities } from '@/composables/useCharacterStats'

import StatsList from '@/components/StatsList.vue'
import { useMomentumStore } from '@/stores/MomentumStore'

const momentumStore = useMomentumStore()
</script>

<template>
  <pre>{{ character }}</pre>
  <h2>{{ character.name }}</h2>
  <input v-model="character.name" type="text" />
  <p>Experience: {{ experience }}</p>
  <p v-if="vows.length">Vows: {{ vows }}</p>
  <p v-else>Make a vow</p>
  <StatsList />
  <p>Momentum: {{ momentumStore.momentum }}</p>
  <p>Health: {{ character.health }}</p>
  <p>Spirit: {{ character.spirit }}</p>
  <p>Supply: {{ character.supply }}</p>
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

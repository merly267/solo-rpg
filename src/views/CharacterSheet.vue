<script setup lang="ts">
import { backgroundVow, character } from '@/composables/useCharacterStats'
import StatsList from '@/components/StatsList.vue'
import { useCharacterStore } from '@/stores/CharacterStore'
import { useExperienceStore } from '@/stores/ExperienceStore'
import { useMomentumStore } from '@/stores/MomentumStore'
import { useImpactsStore } from '@/stores/ImpactsStore'
import { impactCategoriesList } from '@/constants'

const characterStore = useCharacterStore()
const experienceStore = useExperienceStore()
const momentumStore = useMomentumStore()
const impactsStore = useImpactsStore()
</script>

<template>
  <h2>{{ character.name }}</h2>
  <input v-model="character.name" type="text" />
  <p>Experience: {{ experienceStore.experience }}</p>
  <p v-if="backgroundVow">Vows: {{ backgroundVow }}</p>
  <p v-else>Make a background vow</p>
  <StatsList />
  <p>Momentum: {{ momentumStore.momentum }}</p>
  <p>Health: {{ characterStore.health }}</p>
  <p>Spirit: {{ character.spirit }}</p>
  <p>Supply: {{ character.supply }}</p>
  <h2>Impacts: {{ impactsStore.impactsTotal }}</h2>
  <ul v-if="impactsStore.impactsTotal">
    <li v-for="category in impactCategoriesList" :key="category">
      <h3>{{ category }}</h3>
      <ul>
        <li
          v-for="(impact, index) in impactsStore.impacts.filter((imp) => imp.category === category)"
          :key="`imp-${index}`"
          class="impact"
          :class="{ marked: impact.status }"
        >
          {{ impact.name }}: {{ impact.status }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.impact {
  color: var(--grey-text);
}
.marked {
  color: var(--app-text);
  font-weight: bold;
}
</style>

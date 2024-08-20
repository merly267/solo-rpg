<script setup lang="ts">
import { backgroundVow, character } from '@/composables/useCharacterStats'
import StatsList from '@/components/StatsList.vue'
import { useCharacterStore } from '@/stores/CharacterStore'
import { useExperienceStore } from '@/stores/ExperienceStore'
import { useMomentumStore } from '@/stores/MomentumStore'
import { useDebilitiesStore } from '@/stores/DebilitiesStore'
import { debilityCategoriesList } from '@/constants'

const characterStore = useCharacterStore()
const experienceStore = useExperienceStore()
const momentumStore = useMomentumStore()
const debilitiesStore = useDebilitiesStore()
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
  <h2>Debilities: {{ debilitiesStore.debilitiesTotal }}</h2>
  <ul v-if="debilitiesStore.debilitiesTotal">
    <li v-for="category in debilityCategoriesList" :key="category">
      <h3>{{ category }}</h3>
      <ul>
        <li
          v-for="(debility, index) in debilitiesStore.debilities.filter(
            (deb) => deb.category === category
          )"
          :key="`deb-${index}`"
          class="debility"
          :class="{ marked: debility.status }"
        >
          {{ debility.name }}: {{ debility.status }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.debility {
  color: var(--grey-text);
}
.marked {
  color: var(--app-text);
  font-weight: bold;
}
</style>

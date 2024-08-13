<script setup lang="ts">
import { backgroundVow, character, experience } from '@/composables/useCharacterStats'
import StatsList from '@/components/StatsList.vue'
import { useMomentumStore } from '@/stores/MomentumStore'
import { useDebilitiesStore } from '@/stores/DebilitiesStore'
import { debilityCategoriesList } from '@/constants'

const momentumStore = useMomentumStore()
const debilitiesStore = useDebilitiesStore()
</script>

<template>
  <h2>{{ character.name }}</h2>
  <input v-model="character.name" type="text" />
  <p>Experience: {{ experience }}</p>
  <p v-if="backgroundVow">Vows: {{ backgroundVow }}</p>
  <p v-else>Make a background vow</p>
  <StatsList />
  <p>Momentum: {{ momentumStore.momentum }}</p>
  <p>Health: {{ character.health }}</p>
  <p>Spirit: {{ character.spirit }}</p>
  <p>Supply: {{ character.supply }}</p>
  <h2>Debilities: {{ debilitiesStore.debilitiesTotal }}</h2>
  <ul v-if="debilitiesStore.debilitiesTotal">
    <li v-for="category in debilityCategoriesList" :key="category">
      <h3>{{ category }}</h3>
      <ul>
        <li
          v-for="(debility, index) in debilitiesStore.newDebilities.filter(
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

<style>
.debility {
  color: var(--grey-text);
}
.marked {
  color: var(--app-text);
  font-weight: bold;
}
</style>

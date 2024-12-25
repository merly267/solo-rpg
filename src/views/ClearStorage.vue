<script setup lang="ts">
import { useCharacterStore } from '@/stores/CharacterStore'
import { useImpactsStore } from '@/stores/ImpactsStore'
import { useMomentumStore } from '@/stores/MomentumStore'
import { useLegacyTrackStore } from '@/stores/LegacyTrackStore'

const characterStore = useCharacterStore()
const momentumStore = useMomentumStore()
const impactsStore = useImpactsStore()
const legacyTrackStore = useLegacyTrackStore()

const clearAll = () => {
  characterStore.clearLocalStorage()
  impactsStore.clearLocalStorage()
}
</script>
<template>
  <button @click="clearAll">Clear all local storage</button>
  <hr>
  <button @click="characterStore.clearLocalStorage">Clear name and reset meters</button>
  <hr>
  <button @click="impactsStore.clearLocalStorage">Clear impacts</button>
</template>
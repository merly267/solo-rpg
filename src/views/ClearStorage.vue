<script setup lang="ts">
import { useCharacterStore } from '@/stores/CharacterStore'
import { useImpactsStore } from '@/stores/ImpactsStore'
import { useLogStore } from '@/stores/LogStore'
import { useMomentumStore } from '@/stores/MomentumStore'
import { useLegacyTrackStore } from '@/stores/LegacyTrackStore'

const characterStore = useCharacterStore()
const logStore = useLogStore()
const momentumStore = useMomentumStore()
const impactsStore = useImpactsStore()
const legacyTrackStore = useLegacyTrackStore()

const clearAll = () => {
  characterStore.clearLocalStorage()
  impactsStore.clearLocalStorage()
  legacyTrackStore.clearQuests()
  legacyTrackStore.clearBonds()
  legacyTrackStore.clearDiscoveries()
  logStore.clearLog()
}
</script>
<template>
  <button @click="clearAll">Clear all local storage</button>
  <hr>
  <button @click="characterStore.clearLocalStorage">Clear name and reset meters</button>
  <hr>
  <button @click="logStore.clearLog">Clear log</button>
  <hr>
  <button @click="impactsStore.clearLocalStorage">Clear impacts</button>
  <hr>
  <button @click="legacyTrackStore.clearQuests">Clear quests progress</button>
  <button @click="legacyTrackStore.clearBonds">Clear bonds progress</button>
  <button @click="legacyTrackStore.clearDiscoveries">Clear discoveries progress</button>
</template>
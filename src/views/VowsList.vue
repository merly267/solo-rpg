<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProgressTrackStore } from '@/stores/ProgressTrackStore'
import TrackInfo from '@/components/TrackInfo.vue'
import { movesList } from '@/moves'

const progressTrackStore = useProgressTrackStore()
const move = movesList.swearVow

const inactiveVows = computed(() => {
  return progressTrackStore.completedVows.concat(progressTrackStore.forsakenVows)
})

const defaultDisplay = computed(() => {
  return progressTrackStore.activeVows.length ? 'Active' : 'All'
})

const displayVows = ref<string>(defaultDisplay.value)

</script>

<template> 
  <div v-if="progressTrackStore.vows.length">
    <div :class="{ showFilter: inactiveVows.length }">
      <h2>Vows</h2>
      <select v-if="inactiveVows.length" v-model="displayVows">
        <option v-if="progressTrackStore.activeVows.length">Active</option>
        <option v-if="progressTrackStore.completedVows.length">Completed</option>
        <option v-if="progressTrackStore.forsakenVows.length">Forsaken</option>
        <option>All</option>
      </select>
    </div>
    <div v-show="displayVows === 'Active'">
      <div v-for="vow in progressTrackStore.activeVows" :key="`vow-active-${vow.uuid}`" class="vow">
        <TrackInfo :name="vow.name" :rank="vow.rank" :progress="vow.progress" />
      </div>
    </div>
    <div v-show="displayVows === 'Completed'">
      <div v-for="vow in progressTrackStore.completedVows" :key="`vow-complete-${vow.uuid}`" class="vow">
        <TrackInfo :name="vow.name" :rank="vow.rank" :progress="vow.progress" />
      </div>
    </div>
    <div v-show="displayVows === 'Forsaken'">
      <div v-for="vow in progressTrackStore.forsakenVows" :key="`vow-forsaken-${vow.uuid}`" class="vow">
        <TrackInfo :name="vow.name" :rank="vow.rank" :progress="vow.progress" />
      </div>
    </div>
    <div v-show="displayVows === 'All' || !inactiveVows">
      <div v-for="vow in progressTrackStore.vows" :key="`vow-all-${vow.uuid}`" class="vow">
        <TrackInfo :name="vow.name" :rank="vow.rank" :progress="vow.progress" :status="vow.status" />
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Vows</h2>
    <p>Make a background vow</p>
  </div>
  <router-link :to="{ path: `/moves/${move.slug}` }" class="move">{{ move.title }}</router-link>
</template>

<style scoped>
.vow {
  margin-bottom: 2rem;
}
.showFilter {
  display: flex;
  justify-content: space-between;
  h2 {
    margin: 0;
  }
}
</style>

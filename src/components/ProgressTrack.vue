<script setup lang="ts">
type PropTypes = {
  progress: number
}

const props = defineProps<PropTypes>()
const maxTrack = 10
</script>

<template>
  Progress is {{ props.progress }}
  <div class="progress-track">
    <div v-for="index in maxTrack" :key="index" class="box"></div>
  </div>
</template>

<style>
.progress-track {
  display: grid;
  max-width: 20rem;
  border: 1px solid var(--die-bg);

  .box {
    grid-row: 1/1;
    aspect-ratio: 1/1;
    border: 1px solid var(--die-bg);
  }
}
</style>

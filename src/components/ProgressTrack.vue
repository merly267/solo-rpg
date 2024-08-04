<script setup lang="ts">
type PropTypes = {
  progress: number
}

const props = defineProps<PropTypes>()
const maxTrack = 10

const boxStyle = (index: number, progress: number) => {
  if (index <= progress) {
    return 'filled'
  }
  return
}
</script>

<template>
  Progress is {{ props.progress }}
  <div class="progress-track">
    <div
      v-for="index in maxTrack"
      :key="index"
      class="box"
      :class="boxStyle(index, props.progress)"
    ></div>
  </div>
</template>

<style>
.progress-track {
  display: grid;
  max-width: 20rem;

  .box {
    grid-row: 1/1;
    aspect-ratio: 1/1;
    border: 2px solid var(--die-bg);
    border-left-width: 0;
    &:first-child {
      border-left-width: 2px;
    }
    &.filled {
      border-color: var(--app-text);
      border-color: white;
      background-color: var(--grey-text);
      /* background-color: white;
      background-color: var(--app-text); */
    }
  }
}
</style>

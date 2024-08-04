<script setup lang="ts">
type PropTypes = {
  progress: number
}

const props = defineProps<PropTypes>()
const maxTrack = 10

const boxStyle = (index: number, progress: number) => {
  const filled = Math.floor(progress)
  const semiFilled = progress - filled
  if (index <= filled) {
    return 'filled'
  }
  if (semiFilled != 0) {
    if (index === filled + 1) {
      switch (semiFilled) {
        case 0.25:
          return 'one-tick'
        case 0.5:
          return 'two-ticks'
        case 0.75:
          return 'three-ticks'
        default:
          return
      }
    }
  }
  return
}
</script>

<template>
  Progress: {{ props.progress }}
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
    --stripe-start: calc(50% - 1px);
    --stripe-end: calc(50% + 1px);
    grid-row: 1/1;
    aspect-ratio: 1/1;
    border: 2px solid var(--die-bg);
    border-left-width: 0;
    &:first-child {
      border-left-width: 2px;
    }
    &.filled,
    &.one-tick,
    &.two-ticks,
    &.three-ticks {
      border-color: var(--app-text);
    }
    &.filled {
      background-color: var(--grey-text);
    }
    &.one-tick {
      background: linear-gradient(
        to bottom left,
        transparent var(--stripe-start),
        var(--app-text) var(--stripe-start) var(--stripe-end),
        transparent var(--stripe-end)
      );
    }
    &.two-ticks {
      background: linear-gradient(
          to bottom left,
          transparent var(--stripe-start),
          var(--app-text) var(--stripe-start) var(--stripe-end),
          transparent var(--stripe-end)
        ),
        linear-gradient(
          to bottom right,
          transparent var(--stripe-start),
          var(--app-text) var(--stripe-start) var(--stripe-end),
          transparent var(--stripe-end)
        );
    }
    &.three-ticks {
      background: linear-gradient(
          to bottom left,
          transparent var(--stripe-start),
          var(--app-text) var(--stripe-start) var(--stripe-end),
          transparent var(--stripe-end)
        ),
        linear-gradient(
          to bottom right,
          transparent var(--stripe-start),
          var(--app-text) var(--stripe-start) var(--stripe-end),
          transparent var(--stripe-end)
        ),
        linear-gradient(
          to left,
          transparent var(--stripe-start),
          var(--app-text) var(--stripe-start) var(--stripe-end),
          transparent var(--stripe-end)
        );
    }
  }
}
</style>

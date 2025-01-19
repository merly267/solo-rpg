<script setup lang="ts">
import { computed } from 'vue'

const { progress, experience, legacy } = defineProps<{
  progress: number
  experience?: number
  legacy?: boolean
}>()
const maxTrack = 10

const displayProgress = computed(() => {
  if (progress <= maxTrack) {
    return progress
  }
  return progress % maxTrack
})

// not sure if I need to display this as I'm already displaying the total?
// const undisplayedProgress = computed(() => {
//   if (progress <= maxTrack) {
//     return
//   }
//   return progress - displayProgress.value
// })

const boxStyle = (index: number, progress: number) => {
  const filled = Math.floor(progress)
  const semiFilled = progress - filled
  if (index <= filled) {
    return 'filled'
  }
  if (semiFilled !== 0) {
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
  Progress: {{ progress }}
  <!-- <div class="undisplayed" v-if="undisplayedProgress">+{{ undisplayedProgress }}</div> -->
  <div class="progress-track" :class="{ legacy: legacy }">
    <div
      v-for="index in maxTrack"
      :key="index"
      class="box"
      :class="boxStyle(index, displayProgress)"
    ></div>
    <!-- <div v-if="props.experience" class="xp-container">
      <div
        v-for="index in props.experience"
        :key="index"
        class="xp"
      ></div>
    </div> -->
  </div>
</template>

<style>
.progress-track {
  display: grid;
  max-width: 20rem;
  margin-bottom: 0.5rem;

  .box {
    --stripe-start: calc(50% - 1px);
    --stripe-end: calc(50% + 1px);
    grid-row: 1/2;
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
  &.legacy {
    .box.filled {
      position: relative;
      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: -0.5rem;
        width: 30%;
        height: 30%;
        border: 2px solid var(--app-text);
        background-color: var(--app-bg);
        @media (min-width: 768px) {
          bottom: -0.5rem;
          width: 20%;
          height: 20%;
        }
      }
      &:before {
        left: 10%;
      }
      &:after {
        right: 10%;
      }
      @media (min-width: 768px) {
        &:before {
          left: 24%;
        }
        &:after {
          right: 24%;
        }
      }
    }
    @media (min-width: 768px) {
      max-width: 35rem;
    }
  }
}
</style>

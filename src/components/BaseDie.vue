<script setup lang="ts">
import type { Die } from '@/types'

type PropTypes = {
  die: Die
}

const props = defineProps<PropTypes>()
</script>
<template>
  <span v-if="props.die.cancelled" class="die cancelled"><span class="number">x</span></span>
  <span
    v-else-if="props.die.result"
    class="die rolled"
    :class="{
      success: props.die.isSuccess === true,
      failure: props.die.isSuccess === false,
      cancellable: props.die.isCancellable === true
    }"
    ><span class="number">{{ props.die.result }}</span></span
  >
  <span v-else class="die"><span class="number">?</span></span>
</template>

<style scoped>
.die {
  position: relative;
  display: inline-block;
  height: var(--die-size);
  width: var(--die-size);
  text-align: center;
  line-height: var(--die-size);
  font-weight: bold;
  color: var(--die-text);
  &::after {
    content: '';
    position: absolute;
    height: var(--die-size);
    width: var(--die-size);
    left: 0;
    background-color: var(--die-bg);
    border-radius: 2px;
    z-index: 0;
  }
}

.die .number {
  position: relative;
  z-index: 1;
}

.dice li .die {
  margin-left: 0.5em;
}

.challenge .dice li .die {
  margin-left: 1rem;
}

.dice li:first-of-type .die {
  margin-left: 0;
}

.die.rolled {
  color: var(--app-bg);
  &::after {
    background-color: var(--rolled-bg);
  }
}

.challenge .die:after {
  transform: skew(4deg, 4deg);
  rotate: 45deg;
}

.challenge .die.rolled {
  color: var(--app-text);
}

.challenge .die.success:after {
  background-color: var(--success-bg);
}

.challenge .die.failure:after {
  background-color: var(--failure-bg);
}

.cancellable.failure:after {
  top: -2px;
  left: -2px;
  border: 2px solid var(--app-text);
}

.die.cancelled:after {
  background-color: var(--die-bg);
}
</style>

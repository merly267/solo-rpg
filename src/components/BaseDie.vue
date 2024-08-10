<script setup lang="ts">
import type { Die } from '@/types'

type PropTypes = {
  die: Die
}

const props = defineProps<PropTypes>()
</script>
<template>
  <span v-if="props.die.cancelled" class="die cancelled">x</span>
  <span
    v-else-if="props.die.result"
    class="die rolled"
    :class="{
      success: props.die.isSuccess === true,
      failure: props.die.isSuccess === false,
      cancellable: props.die.isCancellable === true
    }"
    >{{ props.die.result }}</span
  >
  <span v-else class="die">?</span>
</template>

<style scoped>
.die {
  display: inline-block;
  height: var(--die-size);
  width: var(--die-size);
  margin-top: 1em;
  text-align: center;
  line-height: var(--die-size);
  font-weight: bold;
  color: var(--die-text);
  background-color: var(--die-bg);
  border-radius: 2px;
}

.dice li .die {
  margin-left: 0.5em;
}

.dice li:first-of-type .die {
  margin-left: 0;
}

.die.rolled {
  background-color: var(--rolled-bg);
  color: var(--app-bg);
}

.challenge .die.rolled {
  color: var(--app-text);
}

.challenge .success {
  background-color: var(--success-bg);
}

.challenge .failure {
  background-color: var(--failure-bg);
}

.cancellable.failure {
  border: 2px solid var(--app-text);
}

.die.cancelled {
  background-color: var(--die-bg);
}
</style>

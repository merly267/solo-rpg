<script setup>
defineProps({
  die: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <span v-if="die.cancelled" class="die cancelled">x</span>
  <span
    v-else-if="die.result"
    class="die rolled"
    :class="{
      success: die.isSuccess === true,
      failure: die.isSuccess === false,
      cancellable: die.isCancellable === true
    }"
    >{{ die.result }}</span
  >
  <span v-else class="die">?</span>
</template>

<style scoped>
.die {
  display: inline-block;
  height: var(--die-size);
  width: var(--die-size);
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
  border: 2px solid black;
}

.die.cancelled {
  background-color: var(--die-bg);
}
</style>

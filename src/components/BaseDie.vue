<script>
export default {
  props: {
    die: {
      type: Object,
      required: true
    }
  }
}
</script>
<template>
  <span
    v-if="die.result"
    class="die rolled"
    :class="{ success: die.isSuccess === true, failure: die.isSuccess === false }"
    >{{ die.result }}</span
  >
  <span v-else class="die">?</span>
</template>

<style>
.die {
  display: inline-block;
  height: var(--die-size);
  width: var(--die-size);
  line-height: var(--die-size);
  font-weight: bold;
  color: var(--die-text);
  background-color: var(--die-bg);
}

.dice li .die {
  margin-left: 0.5em;
}

.dice li:first-of-type .die {
  margin-left: 0;
}

.die.rolled {
  background-color: var(--rolled-bg);
}

.challenge .success {
  background-color: var(--success-bg);
}

.challenge .failure {
  background-color: var(--failure-bg);
}
</style>

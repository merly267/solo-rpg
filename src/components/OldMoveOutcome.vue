<script setup>
import { computed } from 'vue'
import { actionDie, challengeDice } from '@/composables/useDiceStore'
const props = defineProps({
  failures: {
    type: Array
  },
  outcomes: {
    type: Object
  }
})

const outcome = computed(() => {
  if (actionDie.value.result) {
    switch (props.failures.length) {
      case 0:
        return props.outcomes.strong
      case 1:
        return props.outcomes.weak
      case 2:
        return props.outcomes.miss
    }
    return null
  } else {
    return null
  }
})

const match = computed(() => {
  if (challengeDice.value[0].result) {
    const toMatch = challengeDice.value[0].result
    const matches = challengeDice.value.filter((die) => die.result === toMatch)
    if (matches.length > 1) {
      if (toMatch === 10) {
        return ' and a match on 10, the worst possible result...'
      } else {
        return ' and a match!'
      }
    } else {
      return null
    }
  } else {
    return null
  }
})
</script>

<template>
  <h3>Move outcome</h3>
  <h4>{{ outcome.type }}{{ match }}</h4>
  <div v-if="outcome.message">
    {{ outcome.message }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { actionDie, challengeDice } from '../composables/diceStore.js'
const props = defineProps({
  failures: {
    type: Array
  }
})

const outcome = computed(() => {
  if (actionDie.value.result) {
    switch (props.failures.length) {
      case 0:
        return 'Strong hit'
      case 1:
        return 'Weak hit'
      case 2:
        return 'Miss'
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
  <p>{{ outcome }}{{ match }}</p>
</template>

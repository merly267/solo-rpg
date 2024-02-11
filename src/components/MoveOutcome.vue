<script setup>
import { computed } from 'vue'
import { actionDie, challengeDice } from '../composables/diceStore.js'
const props = defineProps({
  successes: {
    type: Array
  }
})

const outcome = computed(() => {
  if (actionDie.value.result) {
    switch (props.successes.length) {
      case 0:
        return 'Miss'
      case 1:
        return 'Weak hit'
      case 2:
        return 'Strong hit'
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

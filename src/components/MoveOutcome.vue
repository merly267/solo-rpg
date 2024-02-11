<script setup>
import { computed } from 'vue'
import { actionDie } from '../composables/diceStore.js'
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
</script>

<template>
  <h4>Move outcome</h4>
  <p>{{ outcome }}</p>
</template>

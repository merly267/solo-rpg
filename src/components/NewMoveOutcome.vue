<script setup>
import { computed } from 'vue'
import { actionDie, challengeDice } from '@/composables/useDiceStore.js'

const failures = computed(() => {
  return challengeDice.value.filter((die) => die.isSuccess === false)
})

const outcome = computed(() => {
  if (actionDie.value.result) {
    switch (failures.value.length) {
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
</script>
<template>
  <div v-if="actionDie.result">
    <h3>{{ outcome }}</h3>
  </div>
</template>

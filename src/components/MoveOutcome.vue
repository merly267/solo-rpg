<script setup lang="ts">
import { computed } from 'vue'
import { challengeDice } from '@/composables/useDiceStore'
import { outcomeList } from '@/constants'

const outcomes = outcomeList

const failures = computed(() => {
  return challengeDice.value.filter((die) => die.isSuccess === false)
})

const outcome = computed(() => {
  switch (failures.value.length) {
    case 0:
      return outcomes.strong.label
    case 1:
      return outcomes.weak.label
    case 2:
      return outcomes.miss.label
  }
  return null
})

defineExpose({ outcome })

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
  <div>
    <h3>{{ outcome }}{{ match }}</h3>
    <slot name="strong" v-if="failures.length == 0"></slot>
    <slot name="weak" v-if="failures.length == 1"></slot>
    <slot name="miss" v-if="failures.length == 2"></slot>
  </div>
</template>

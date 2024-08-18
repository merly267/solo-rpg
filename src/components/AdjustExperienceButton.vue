<script setup lang="ts">
import { useExperienceStore } from '@/stores/ExperienceStore'

type Operation = 'mark' | 'spend'

type PropTypes = {
  operation: Operation
  amount: number
  disabled?: boolean
}

const props = defineProps<PropTypes>()

const experienceStore = useExperienceStore()
</script>

<template>
  <button
    v-if="props.operation == 'mark'"
    type="button"
    :disabled="props.disabled"
    @click="experienceStore.markExperience(props.amount)"
  >
    Mark {{ props.amount }} experience
  </button>
  <span v-else-if="props.operation == 'spend'">
    <button type="button" :disabled="props.disabled || experienceStore.experience == 0">
      Spend {{ props.amount }} experience
    </button>
  </span>
</template>

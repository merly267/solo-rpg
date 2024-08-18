<script setup lang="ts">
import ChallengeDice from '@/components/ChallengeDice.vue'
type PropTypes = {
  title: string
}

const props = defineProps<PropTypes>()
</script>
<template>
  <h2>{{ props.title }}</h2>
  <slot></slot>
  <ChallengeDice />
</template>

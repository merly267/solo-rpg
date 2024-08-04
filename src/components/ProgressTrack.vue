<script setup lang="ts">
type PropTypes = {
  progress: number
}

const props = defineProps<PropTypes>()
</script>

<template>Progress is {{ progress }}</template>

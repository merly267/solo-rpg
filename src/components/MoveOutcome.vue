<script setup>
const props = defineProps({
  playerScore: {
    type: Number
  }
})
</script>

<template>
  <h4>Move outcome</h4>
  <p>{{ props.playerScore }}</p>
</template>

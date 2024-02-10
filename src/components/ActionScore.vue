<script setup>
import ActionDie from './ActionDie.vue'
defineProps({
  selectedStat: {
    type: Object
  }
})
</script>
<template>
  <h3>ActionScore</h3>
  <ActionDie />
  + <span v-if="selectedStat.score">{{ selectedStat.score }}</span>
  <span v-else>?</span>
  + <span class="add">?</span> =
</template>

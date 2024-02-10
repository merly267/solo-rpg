<script setup>
import { computed } from 'vue'
import { actionDie } from '../composables/diceStore.js'
import ActionDie from './ActionDie.vue'
const props = defineProps({
  selectedStat: {
    type: Object
  }
})
const actionScore = computed(() => actionDie.value.result + props.selectedStat.score)
</script>
<template>
  <h3>ActionScore</h3>
  <ActionDie />
  + <span v-if="props.selectedStat.score">{{ props.selectedStat.score }}</span>
  <span v-else>?</span>
  + <span class="add">?</span> = <span v-if="actionScore">{{ actionScore }}</span>
  <span v-else>?</span>
</template>

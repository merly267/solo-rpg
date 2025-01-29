<script setup lang="ts">
import { ref } from 'vue'
import MakeLogEntry from '@/components/MakeLogEntry.vue'
import MoveSearch from '@/components/MoveSearch.vue'

const visibleTab = ref('Journal')
</script>
<template>
  <div class="next-action">
    <button
      aria-label="logText"
      @click="visibleTab = 'Journal'"
      :class="{ visible: visibleTab === 'Journal' }"
    >
      Journal</button
    ><button
      aria-label="moveSearch"
      @click="visibleTab = 'Move'"
      :class="{ visible: visibleTab === 'Move' }"
    >
      Move
    </button>
    <div class="tabs">
      <MakeLogEntry v-if="visibleTab === 'Journal'" />
      <MoveSearch v-if="visibleTab === 'Move'" />
    </div>
  </div>
</template>

<style scoped>
.next-action {
  min-height: 11em;
}
button {
  position: relative;
  margin-bottom: 0;
  padding-bottom: 0;
  opacity: 0.7;
  border-bottom-width: 0;
  border-radius: 0.25em 0.25em 0 0;
  z-index: 2;
  &:first-child {
    margin-left: 0;
  }
  &.visible {
    background-color: var(--form-bg);
    opacity: 1;
  }
}
</style>

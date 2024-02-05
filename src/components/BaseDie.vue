<script>
export default {
  props: {
    die: {
      type: Object,
      required: true
    }
  }
}
</script>
<template>
  <span v-if="die.result" class="die rolled">{{ die.result }}</span>
  <span v-else class="die">?</span>
</template>

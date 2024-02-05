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
  <span
    v-if="die.result"
    class="die rolled"
    :class="{ success: die.isSuccess === true, failure: die.isSuccess === false }"
    >{{ die.result }}</span
  >
  <span v-else class="die">?</span>
</template>

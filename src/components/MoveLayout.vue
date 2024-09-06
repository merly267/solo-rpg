<template>
  <div class="text">
    <slot name="text" />
  </div>
  <div class="outcome">
    <slot name="outcome" />
  </div>
</template>

<style scoped>
.text {
  h2 {
    margin-bottom: 0.5rem;
  }
  h2 + p {
    margin-top: 0.5rem;
  }
}
</style>

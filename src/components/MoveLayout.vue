<template>
  <!-- used in all moves -->
  <div class="text">
    <slot name="text" />
  </div>
  <!-- only used in GenericActionMove -->
  <div class="stats">
    <slot name="stats" />
  </div>
  <div class="playerScore">
    <slot name="playerScore" />
  </div>
  <div class="challengeScore">
    <slot name="challengeScore" />
  </div>
  <div class="actions">
    <slot name="actions" />
  </div>
  <div class="momentum">
    <slot name="momentum" />
  </div>
  <!-- used in all moves -->
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

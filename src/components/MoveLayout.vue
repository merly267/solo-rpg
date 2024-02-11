<template>
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
  <div class="outcome">
    <slot name="outcome" />
  </div>
</template>

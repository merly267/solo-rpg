<template>
  <h2>Moves</h2>

  <h3>Gather information</h3>
  <p>
    When you <strong>search an area</strong>, <strong>ask questions</strong>,
    <strong>conduct an investigation</strong>, or <strong>follow a track</strong>, roll +wits.
  </p>

  <p>
    If you act within a community or ask questions of a person with whom you share a bond, add +1.
  </p>

  <button>Gather information</button>
</template>

<!-- gather information button should :
setSelectedStat(wits)
then do and show everything at the bottom of ActionMove.vue (except roll and clear buttons)
swapping out its own move outcome texts

Or $emit selected stat to an adapted ActionMove component

Could nested routes be useful here? And/or layout slot things?
 -->

<script setup>
import ActionDie from '@/components/ActionDie.vue'
import ChallengeDice from '@/components/ChallengeDice.vue'
const props = defineProps({
  title: {
    type: String
  },
  stat: {
    type: Number
  },
  adds: {
    type: Number
  }
})
</script>
<template>
  <h2>{{ title }}</h2>
  <slot></slot>
  <h3>Action Score</h3>
  <ActionDie />
  + <span v-if="stat">{{ stat }}</span>
  <span v-else>?</span>
  + <span v-if="adds > 0">{{ adds }}</span>
  <span v-else>?</span>
  =
  <span v-if="actionScore"
    ><strong>{{ actionScore }}</strong></span
  >
  <span v-else>?</span>
  <ChallengeDice />
</template>

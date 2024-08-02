<script setup lang="ts">
import { ref } from 'vue'
import { progressRanksList } from '@/constants'

const vow = ref({
  name: '',
  rank: 0
})
</script>

<template>
  <pre>{{ vow }}</pre>
  <p>
    <label for="vowName">Vow: </label>
    <input type="text" id="vowName" v-model="vow.name" />
  </p>
  <fieldset>
    <legend>Rank:</legend>
    <div v-for="(rank, index) in progressRanksList" :key="`rank-${index}`">
      <input type="radio" :id="rank.name" :value="rank.level" v-model="vow.rank" />
      <label :for="rank.name">{{ rank.name }}</label>
    </div>
  </fieldset>
</template>

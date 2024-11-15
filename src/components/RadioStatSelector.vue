<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import type { StatName, StatToSelect } from '@/types'

type PropTypes = {
  stats: StatToSelect[]
  cleared?: boolean
}

const props = defineProps<PropTypes>()

watch(() => props.cleared, () => {
  selectedStatName.value = ''
})

const findStat = (statToFind: StatName) => statsList.value.find((stat) => stat.name === statToFind)

let selectedStatName = ref<string>('')

const selectedStat = computed(() => {
  if (selectedStatName.value.length) {
    return findStat(selectedStatName.value as StatName)
  }
  return {
    name: '',
    score: 0
  }
})

defineExpose({selectedStat})

</script>
<template>
  <fieldset>
    <div v-for="(stat, index) in props.stats" :key="`stat-${index}`" >
      <input 
        type="radio" 
        name="chooseStat"
        :id="stat.value" 
        :value="stat.value"
        v-model="selectedStatName"
      />
      <label :for="stat.value">{{ stat.label }}: roll +{{ stat.value }} ({{ findStat(stat.value)?.score }})</label>
    </div>
  </fieldset>
</template>
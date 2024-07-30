<script setup lang="ts">
import { computed, ref } from 'vue'
import { stats as statsList } from '@/composables/useCharacterStats.js'
import { useMomentumStore } from '@/stores/MomentumStore'
import ActionMove from '@/components/ActionMove.vue'
import MoveOutcome from '@/components/MoveOutcome.vue'
import MoveLayout from '@/components/MoveLayout.vue'
import type { StatName } from '@/types'
import { movesList } from '@/moves'

const move = movesList.faceDanger

let selectedStatName = ref<String>('')

const selectedStat = computed(() => {
  if (selectedStatName.value.length) {
    const thisStat = statsList.value.find((stat) => stat.name === selectedStatName.value)
    return thisStat
  }
  return {
    name: '',
    score: 0
  }
})

const matchInstruction = (statName: StatName) => {
  switch (statName) {
    case 'Edge':
      return 'With speed, agility, or precision:'
    case 'Heart':
      return 'With charm, loyalty, or courage:'
    case 'Iron':
      return 'With aggressive action, forceful defense, strength, or endurance:'
    case 'Shadow':
      return 'With deception, stealth, or trickery'
    case 'Wits':
      return 'With expertise, insight, or observation'
  }
}

const annotatedStatList = statsList.value.map((stat) => ({
  ...stat,
  instructions: matchInstruction(stat.name)
}))

const moveAdds = 0
const momentumStore = useMomentumStore()
</script>

<template>
  <MoveLayout>
    <template #text>
      <ActionMove
        v-if="selectedStat"
        :title="move.title"
        :stat="selectedStat.score"
        :adds="moveAdds"
        :disabled="!selectedStatName.length"
      >
        <p>
          When you <strong>attempt something risky</strong> or
          <strong>react to an imminent threat</strong>, envision your action and roll. If you act...
        </p>
        <fieldset>
          <div v-for="(stat, index) in annotatedStatList" :key="`stat-${index}`">
            <input type="radio" :id="stat.name" :value="stat.name" v-model="selectedStatName" />
            <label :for="stat.name"
              >{{ stat.instructions }} Roll +{{ stat.name }}({{ stat.score }})</label
            >
          </div>
        </fieldset>
      </ActionMove>
    </template>
    <template #outcome>
      <MoveOutcome>
        <template v-slot:strong>
          <p>
            You are successful.
            <button
              type="button"
              :disabled="momentumStore.momentum == momentumStore.maxMomentum"
              @click="momentumStore.addMomentum(1)"
            >
              Take +1 momentum
            </button>
          </p>
        </template>
        <template v-slot:weak>
          <p>
            You succeed, but face a troublesome cost. Choose one.
            <ul>
              <li>
                You are delayed, lose advantage, or face a new danger: 
                <button
                  type="button"
                  :disabled="momentumStore.momentum == momentumStore.maxMomentum"
                  @click="momentumStore.loseMomentum(1)"
                >
                Suffer -1 momentum</button
                >
              </li>
              <li>You are tired or hurt: Endure Harm (1 harm).</li>
              <li>You are dispirited or afraid: Endure Stress (1 stress).</li>
              <li>You sacrifice resources: Suffer -1 supply</li>
            </ul>
            
          </p>
        </template>
        <template v-slot:miss>
          <p>
            You fail, or your progress is undermined by a dramatic and costly turn of events. Pay
            the Price.
          </p>
        </template>
      </MoveOutcome>
    </template>
  </MoveLayout>
</template>

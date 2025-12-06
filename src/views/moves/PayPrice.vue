<script setup lang="ts">
import MoveLayout from '@/components/MoveLayout.vue'
import { movesList } from '@/moves'
import OracleDie from '@/components/OracleDie.vue'
import { useDiceStore } from '@/stores/DiceStore'

const move = movesList.payPrice
const diceStore = useDiceStore()

const roll = () => diceStore.roll(diceStore.oracleDie)
</script>

<template>
  <MoveLayout>
    <template #text>
      <h2>{{ move.title }}</h2>
      <div>
        <p>
          When you <strong>{{ move.trigger }}</strong
          >, choose one.
        </p>
        <ul>
          <li>Make the most obvious negative outcome happen.</li>
          <li>
            Ask the Oracle for inspiration. Interpret the answer as a hardship or complication
            appropriate to the situation.
          </li>
          <li>
            <button type="button" @click="roll()">Roll</button> on the table below. If the result
            doesn’t fit the situation, roll again.
          </li>
        </ul>
        <OracleDie />
      </div>
    </template>
  </MoveLayout>
</template>

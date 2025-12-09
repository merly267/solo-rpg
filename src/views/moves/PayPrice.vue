<script setup lang="ts">
import { computed } from 'vue'
import MoveLayout from '@/components/MoveLayout.vue'
import OracleDie from '@/components/OracleDie.vue'
import payPriceTable from '@/tables/moves/payPrice'
import { useDiceStore } from '@/stores/DiceStore'
import { movesList } from '@/moves'

const move = movesList.payPrice
const diceStore = useDiceStore()

const roll = () => {
  diceStore.roll(diceStore.oracleDie)
}

const tableResult = computed(() => {
  return payPriceTable.find(
    (row) => row.min <= diceStore.oracleDie.result && row.max >= diceStore.oracleDie.result
  )
})

const clear = () => {
  diceStore.clear(diceStore.oracleDie)
}
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
        <span class="table-result" v-if="tableResult">{{ tableResult.text }}</span>
        <button class="clear-result" type="button" @click="clear()" :disabled="!tableResult">
          Clear
        </button>
      </div>
    </template>
  </MoveLayout>
</template>

<style scoped>
.table-result {
  margin-left: 0.5rem;
}
.clear-result {
  display: block;
  margin-top: 1rem;
}
</style>

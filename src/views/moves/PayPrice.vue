<script setup lang="ts">
import MoveLayout from '@/components/MoveLayout.vue'
import { movesList } from '@/moves'
import OracleDie from '@/components/OracleDie.vue'
import { useDiceStore } from '@/stores/DiceStore'
import type { Die, TableRow } from '@/types'

const move = movesList.payPrice
const diceStore = useDiceStore()

const checkResult = (die: Die, table: TableRow[]) => {
  const tableResult = table.find((row) => row.min <= die.result && row.max >= die.result)
  console.log(tableResult?.res)
}

const roll = () => {
  diceStore.roll(diceStore.oracleDie)
  checkResult(diceStore.oracleDie, payPriceTable)
}

const payPriceTable = [
  {
    min: 1,
    max: 33,
    res: 'A trusted individual or community acts against you'
  },
  {
    min: 34,
    max: 66,
    res: 'Something of value is lost or destroyed'
  },
  {
    min: 67,
    max: 100,
    res: 'Roll twice'
  }
]
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
        <MoveOutcome> </MoveOutcome>
      </div>
    </template>
  </MoveLayout>
</template>

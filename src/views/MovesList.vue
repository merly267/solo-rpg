<script setup lang="ts">
import { ref } from 'vue'
import { movesList } from '@/moves'
import { moveTypeList } from '@/constants'
import type { MoveType } from '@/types'

let visibleSections = ref<MoveType[]>([])
</script>
<template>
  <h2>Moves</h2>
  <button @click="visibleSections = [...new Set([...visibleSections, ...moveTypeList])]">
    Show all
  </button>
  <button @click="visibleSections = []">Hide all</button>
  <div v-for="moveType in moveTypeList" :key="moveType">
    <h3>
      {{ moveType }}
      <button
        v-if="visibleSections.includes(moveType)"
        @click="visibleSections = visibleSections.filter((item) => item !== moveType)"
      >
        Hide</button
      ><button v-else @click="visibleSections.push(moveType)">Show</button>
    </h3>
    <div v-show="visibleSections.includes(moveType)">
      <dl v-for="(move, index) in movesList" :key="`move-${index}`">
        <div v-if="move.moveType === moveType">
          <dt>
            <router-link :to="{ path: `/moves/${move.slug}` }" class="move">{{
              move.title
            }}</router-link>
          </dt>
          <dd class="trigger">{{ move.trigger }}.</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style scoped>
dl {
  margin: 0;
}
.trigger {
  display: inline-block;
  font-size: 0.95rem;
  margin: 0.5rem 0;
}

.trigger::first-letter {
  text-transform: capitalize;
}

@media (min-width: 768px) {
  dt,
  .trigger {
    display: inline;
  }
  .trigger:before {
    content: ' - ';
  }
}
</style>

<script>
import CharacterSheet from './components/CharacterSheet.vue'
import GenericMove from './components/GenericMove.vue'
export default {
  components: {
    CharacterSheet,
    GenericMove
  }
}
</script>

<template>
  <h1>Solo RPG</h1>

  <CharacterSheet />

  <GenericMove />
  <MoveLayout>
    <template #stats>
      <StatsList :selected="selectedStat" @setSelected="setSelectedStat" />
    </template>
    <template #dice>
      <button type="button" @click="rollAllDice">
        <h2>Action score</h2>
        <p>
          <BaseDie :die="actionDie" />
          +
          <span v-if="selectedStat.score">{{ selectedStat.score }}</span>
          <span v-else>?</span>
          + <span class="add">?</span> =
          <span v-if="actionScore">{{ actionScore }}</span>
          <span v-else>?</span>
        </p>
        <div class="challenge">
          <h2>Challenge dice</h2>
          <ul class="dice">
            <li v-for="die in challengeDice" :key="die.id">
              <BaseDie :die="die" />
            </li>
          </ul>
        </div>
      </button>
    </template>
  </MoveLayout>
</template>

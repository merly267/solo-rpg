<script>
import BaseDie from './components/BaseDie.vue'
import StatsList from './components/StatsList.vue'
export default {
  components: {
    BaseDie,
    StatsList
  },
  data: () => ({
    selectedStat: {
      name: '',
      score: null
    },
    actionDie: {
      id: 'actionDie',
      max: 6,
      result: null
    },
    challengeDice: [
      {
        id: 'challengeDie-0',
        max: 10,
        result: null,
        isSuccess: null
      },
      {
        id: 'challengeDie-1',
        max: 10,
        result: null,
        isSuccess: null
      }
    ]
  }),
  computed: {
    actionScore() {
      if (this.actionDie.result) {
        return this.actionDie.result + this.selectedStat.score
      } else {
        return null
      }
    },
    successes() {
      return this.challengeDice.filter((die) => die.isSuccess === true)
    },
    outcome() {
      if (this.actionDie.result) {
        switch (this.successes.length) {
          case 0:
            return 'Miss'
          case 1:
            return 'Weak hit'
          case 2:
            return 'Strong hit'
        }
        return null
      } else {
        return null
      }
    },
    match() {
      if (this.challengeDice[0].result) {
        const toMatch = this.challengeDice[0].result
        const matches = this.challengeDice.filter((die) => die.result === toMatch)
        if (matches.length > 1) {
          if (toMatch === 10) {
            return ' and a match on 10, the worst possible result...'
          } else {
            return ' and a match!'
          }
        } else {
          return null
        }
      } else {
        return null
      }
    }
  },
  methods: {
    checkSuccess() {
      this.challengeDice.forEach((die) => {
        if (this.actionScore > die.result) {
          die.isSuccess = true
        } else {
          die.isSuccess = false
        }
      })
    },
    setSelectedStat(stat) {
      this.selectedStat = stat
      this.clearAllDice()
    },
    clearSelectedStat() {
      this.selectedStat = {
        name: '',
        score: null
      }
    },
    roll(die) {
      die.result = Math.ceil(Math.random() * die.max)
    },
    clearDie(die) {
      die.result = null
    },
    rollChallenge() {
      this.challengeDice.forEach((die) => {
        this.roll(die)
      })
    },
    clearChallenge() {
      this.challengeDice.forEach((die) => {
        this.clearDie(die)
      })
    },
    rollAllDice() {
      this.rollChallenge()
      this.roll(this.actionDie)
      this.checkSuccess()
    },
    clearAllDice() {
      this.clearChallenge()
      this.clearDie(this.actionDie)
    },
    clearAll() {
      this.clearSelectedStat()
      this.clearAllDice()
    }
  }
}
</script>

<template>
  <h1>Solo RPG</h1>
  <StatsList :selected="selectedStat" @setSelected="setSelectedStat" />

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
  <p class="outcome">{{ outcome }}{{ match }}</p>
  <button type="button" id="clear" @click="clearAll">Clear</button>
</template>

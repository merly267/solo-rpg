<script>
export default {
  data: () => ({
    statsList: [
      {
        name: 'Edge',
        score: 3
      },
      {
        name: 'Heart',
        score: 2
      },
      {
        name: 'Iron',
        score: 1
      },
      {
        name: 'Shadow',
        score: 2
      },
      {
        name: 'Wits',
        score: 1
      }
    ],
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
    setSelectedStat(s) {
      this.selectedStat = s
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
  <h2>Stats</h2>
  <p v-if="statsList.length === 0">Please select your character's stats</p>
  <ul v-else>
    <li v-for="(stat, index) in statsList" :key="`stat-${index}`">
      <button
        type="button"
        class="aspect"
        @click="setSelectedStat(stat)"
        :class="{ chosen: stat.name === selectedStat.name }"
      >
        <span class="name">{{ stat.name }}</span
        >:
        <span class="stat">{{ stat.score }}</span>
      </button>
    </li>
  </ul>

  <button type="button" @click="rollAllDice">
    <h2>Action score</h2>
    <p>
      <span v-if="actionDie.result" class="die rolled">{{ actionDie.result }}</span>
      <span v-else class="die">?</span>
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
          <span
            v-if="die.result"
            class="die rolled"
            :class="{ success: die.isSuccess === true, failure: die.isSuccess === false }"
          >
            {{ die.result }}
          </span>
          <span v-else class="die">?</span>
        </li>
      </ul>
    </div>
  </button>
  <p class="outcome">{{ outcome }}{{ match }}</p>
  <button type="button" id="clear" @click="clearAll">Clear</button>
</template>

import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { maxHealth, maxSupply } from '@/constants'

export const useCharacterStore = defineStore('characterStore', {
  state: () => ({
    name: useLocalStorage('name', ''),
    health: useLocalStorage('health', 5),
    spirit: useLocalStorage('spirit', 5),
    supply: useLocalStorage('supply', 5),
    hold: useLocalStorage('hold', 5)
  }),
  actions: {
    takeHealth(x: number) {
      if (this.health == maxHealth) {
        return
      }
      if (this.health + x > maxHealth) {
        return (this.health = maxHealth)
      }
      this.health += x
    },
    loseHealth(x: number) {
      if (this.health == 0) {
        return
      } else {
        this.health -= x
      }
    },
    takeHoldSupply(x: number) {
      if (this.hold == maxSupply) {
        return
      }
      if (this.hold + x > maxSupply) {
        return (this.hold = maxSupply)
      }
      this.hold += x
    },
    loseHoldSupply(x: number) {
      if (this.hold == 0) {
        return
      } else {
        this.hold -= x
      }
    },
    takeSupply(x: number) {
      if (this.supply == maxSupply) {
        return
      }
      if (this.supply + x > maxSupply) {
        return (this.supply = maxSupply)
      }
      this.supply += x
    },
    loseSupply(x: number) {
      if (this.supply == 0) {
        return
      } else {
        this.supply -= x
      }
    }
  }
})

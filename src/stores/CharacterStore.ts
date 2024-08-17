import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { maxHealth, maxSupply } from '@/constants'

export const useCharacterStore = defineStore('characterStore', {
  state: () => ({
    name: '',
    health: useLocalStorage('health', 5),
    spirit: 5,
    supply: useLocalStorage('supply', 5)
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

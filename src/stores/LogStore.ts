import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { useMoveOutcomeStore } from '@/stores/MoveOutcomeStore'
import type { LogEntry } from '@/types'

type State = {
  log: RemovableRef<LogEntry[]>
}

const moveOutcomeStore = useMoveOutcomeStore()

export const useLogStore = defineStore('progressLogStore', {
  state: (): State => ({
    log: useLocalStorage('log', [])
  }),
  actions: {
    addEntry(entryText: string) {
      this.log.push({
        timestamp: Math.floor(Date.now()),
        setupText: entryText,
      })
    },
    addMoveEntry(setupLog: string, name: string, stat: string) {
      this.log.push({
        timestamp: Math.floor(Date.now()),
        setupText: setupLog,
        move: name,
        stat: stat,
        outcome: moveOutcomeStore.outcomeLabel,
        match: moveOutcomeStore.matchMessage ? moveOutcomeStore.matchMessage : ''
      })
    }
  }
})
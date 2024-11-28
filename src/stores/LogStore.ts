import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import type { LogEntry } from '@/types'

type State = {
  log: RemovableRef<LogEntry[]>
}

export const useLogStore = defineStore('progressLogStore', {
  state: (): State => ({
    log: useLocalStorage('log', [])
  }),
  actions: {
    addEntry(entry: LogEntry) {
      this.log.push(entry)
    }
  }
})
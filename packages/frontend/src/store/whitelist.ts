import { defineStore } from 'pinia'

export const useWhitelistStore = defineStore('whitelist', {
  state: () => ({
    exists: false,
    signature: '',
  }),
  actions: {
    async find(address: string) {
      this.signature = ''
      this.exists = false
    },
    reset() {
      this.exists = false
      this.signature = ''
    },
  },
})

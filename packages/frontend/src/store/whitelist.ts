import { defineStore } from 'pinia'
import { whitelistRef } from '@/firebase/firestore'
import { query, where, getDocs } from 'firebase/firestore'

export const useWhitelistStore = defineStore('whitelist', {
  state: () => ({
    exists: false,
    signature: '',
  }),
  actions: {
    async find(address: string) {
      const q = query(whitelistRef, where('address', '==', address))
      const { docs, empty } = await getDocs(q)

      if (empty) return this.reset()

      const [doc] = docs
      const { signature } = doc.data()

      this.signature = signature
      this.exists = true
    },
    reset() {
      this.exists = false
      this.signature = ''
    },
  },
})

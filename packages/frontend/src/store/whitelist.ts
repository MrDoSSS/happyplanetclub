import { defineStore } from 'pinia'
import { whitelistRef } from '@/firebase/firestore'
import {
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore'
import { web3 } from '@/web3'
import { useWalletStore } from './wallet'

export const useWhitelistStore = defineStore('whitelist', {
  state: (): {
    exists: boolean
    signature: string
    docs: Record<string, HPC.WhitelistDocData>
    fetched: boolean
  } => ({
    exists: false,
    signature: '',
    docs: {},
    fetched: false,
  }),
  actions: {
    async fetch() {
      if (this.fetched) return

      onSnapshot(
        whitelistRef,
        { includeMetadataChanges: true },
        (querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === 'removed') {
              delete this.docs[change.doc.id]
            } else {
              this.docs[change.doc.id] = change.doc.data()
            }
          })
        },
        console.error,
        () => (this.fetched = true)
      )
    },
    async find(address: string) {
      const q = query(whitelistRef, where('address', '==', address))
      const { docs, empty } = await getDocs(q)

      if (empty) return this.reset()

      const [doc] = docs
      const { signature } = doc.data()

      this.signature = signature
      this.exists = true
    },
    async add(address: string) {
      address = address.toLowerCase()
      const walletStore = useWalletStore()

      const signature = await web3.eth.personal.sign(
        web3.utils.keccak256(address),
        walletStore.currentAccount!,
        ''
      )

      return addDoc(whitelistRef, { address, signature })
    },
    remove(id: string) {
      deleteDoc(doc(whitelistRef, id))
    },
    reset() {
      this.exists = false
      this.signature = ''
    },
  },
})

import { useWhitelistStore } from '@/store/whitelist'
import { useAuthStore } from '@/store/auth'
import { defineStore } from 'pinia'
import { ethereum } from '@/ethereum'
import { initWeb3 } from '@/web3'
import { useContractStore } from './contract'

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    metaMaskDetected: false,
    currentAccount: '',
  }),
  getters: {
    connected(state) {
      return !!state.currentAccount
    },
  },
  actions: {
    async init() {
      if (!ethereum) return

      this.metaMaskDetected = ethereum.isMetaMask

      ethereum.on('chainChanged', () => window.location.reload())
      ethereum.on('accountsChanged', () => this.handleAccountsChanged())
    },
    async connect() {
      if (!ethereum) return

      try {
        await ethereum.request?.({ method: 'eth_requestAccounts' })

        this.setCurrentAccount()

        if (this.connected) {
          initWeb3(this.currentAccount)

          const whitelistStore = useWhitelistStore()
          const contractStore = useContractStore()

          await whitelistStore.find(this.currentAccount)
          await contractStore.init(this.currentAccount)
        }
      } catch (e) {
        console.error(e)
      }
    },
    async disconnect() {
      const authStore = useAuthStore()
      const whitelistStore = useWhitelistStore()

      this.currentAccount = ''

      whitelistStore.reset()

      if (authStore.loggedIn) await authStore.signOut()
    },
    async handleAccountsChanged() {
      await this.disconnect()
    },
    async checkAccount() {
      if (!ethereum) return

      try {
        await ethereum.request({ method: 'eth_accounts' })
        this.setCurrentAccount()
      } catch (e) {
        console.error(e)
      }
    },
    setCurrentAccount() {
      if (!ethereum) return

      this.currentAccount = ethereum.selectedAddress?.toLowerCase() || ''

      if (this.currentAccount) {
        // contract.options.from = state.currentAccount
      }
    },
  },
})

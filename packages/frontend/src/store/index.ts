import { createPinia } from 'pinia'
import { useWalletStore } from './wallet'
import { setInbrowserProvider } from '@/ethereum'
import { useWhitelistStore } from './whitelist'
import { useContractStore } from './contract'
import { initWeb3 } from '@/web3'

export const pinia = createPinia()

export const initStore: {
  ready: boolean
  readyHandlers: (() => void)[]
  install: () => Promise<void>
  isReady: () => Promise<void>
} = {
  ready: false,
  readyHandlers: [],
  async install() {
    try {
      const walletStore = useWalletStore()

      setInbrowserProvider()

      walletStore.init()
      await walletStore.checkAccount()

      if (walletStore.connected) {
        initWeb3(walletStore.currentAccount)
        const whitelistStore = useWhitelistStore()
        const contractStore = useContractStore()
        await whitelistStore.find(walletStore.currentAccount)
        await contractStore.init(walletStore.currentAccount)
      } else {
        walletStore.disconnect()
      }
    } finally {
      this.ready = true

      this.readyHandlers.forEach((resolve) => resolve())
    }
  },
  isReady() {
    if (this.ready) return Promise.resolve()

    return new Promise((resolve) => {
      this.readyHandlers.push(resolve)
    })
  },
}

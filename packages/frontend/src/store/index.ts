import { createPinia } from 'pinia'
import { useAuthStore } from './auth'
import { useWalletStore } from './wallet'
import { setInbrowserProvider } from '@/ethereum'
import { useWhitelistStore } from './whitelist'
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
    const walletStore = useWalletStore()
    const authStore = useAuthStore()

    setInbrowserProvider()

    walletStore.init()
    await walletStore.checkAccount()
    await authStore.checkAuth(walletStore.currentAccount)

    if (
      authStore.loggedIn &&
      walletStore.connected &&
      authStore.address === walletStore.currentAccount
    ) {
      initWeb3(walletStore.currentAccount)
      const whitelistStore = useWhitelistStore()
      await whitelistStore.find(walletStore.currentAccount)
    } else {
      walletStore.disconnect()
    }

    this.ready = true

    this.readyHandlers.forEach((resolve) => resolve())
  },
  isReady() {
    if (this.ready) return Promise.resolve()

    return new Promise((resolve) => {
      this.readyHandlers.push(resolve)
    })
  },
}

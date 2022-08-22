import { defineStore } from 'pinia'
import { getUser, createUser, getAuthToken } from '@/firebase/functions'
import { signIn as firebaseSignIn, signOut } from '@/firebase/auth'
import { web3 } from '@/web3'

interface AuthStateTree {
  admin: boolean
  address: string
  loggedIn: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStateTree => ({
    admin: false,
    address: '',
    loggedIn: false,
  }),
  actions: {
    async signIn(address: string) {
      if (!address) return Promise.reject()

      return new Promise((resolve, reject) => {
        getUser({ publicAddress: address })
          .catch(() => createUser({ publicAddress: address }))
          .then(({ data }) => {
            const { publicAddress, nonce } = data
            return web3.eth.personal.sign(
              web3.utils.utf8ToHex(`I am signing my nonce: ${nonce}`),
              publicAddress,
              ''
            )
          })
          .then((signature) =>
            getAuthToken({ publicAddress: address, signature })
          )
          .then(({ data }) => firebaseSignIn(data))
          .then(async ({ user }) => {
            const { claims } = await user.getIdTokenResult()
            this.admin = claims.admin as unknown as boolean
            this.address = user.uid
            this.loggedIn = true
            resolve(true)
          })
          .catch((e) => reject(e))
      })
    },
    signOut() {
      return signOut()
    },
  },
})

import { defineStore } from 'pinia'
import { getUser, createUser, getAuthToken } from '@/firebase/functions'
import {
  signIn as firebaseSignIn,
  signOut,
  authStateChanged,
} from '@/firebase/auth'
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
    async checkAuth(address: string) {
      return new Promise((resolve) => {
        authStateChanged(async (user) => {
          if (!user) return resolve(false)

          const { claims } = await user.getIdTokenResult()
          this.admin = claims.admin as unknown as boolean
          this.address = user.uid
          this.loggedIn = true

          resolve(true)
        })
      })
    },
    async signIn(address: string) {
      return new Promise(async (resolve, reject) => {
        try {
          await getUser({ publicAddress: address })
            .catch(() => createUser({ publicAddress: address }))
            .then(({ data }) => {
              const { publicAddress, nonce, admin } = data

              if (admin) {
                return web3.eth.personal.sign(
                  web3.utils.utf8ToHex(`I am signing my nonce: ${nonce}`),
                  publicAddress,
                  ''
                )
              } else {
                return Promise.resolve('')
              }
            })
            .then((signature) =>
              getAuthToken({ publicAddress: address, signature })
            )
            .then(({ data }) => firebaseSignIn(data))

          authStateChanged(async (user) => {
            if (!user) return resolve(false)

            const { claims } = await user.getIdTokenResult()
            this.admin = claims.admin as unknown as boolean
            this.address = user.uid
            this.loggedIn = true

            resolve(true)
          })
        } catch (e) {
          reject(e)
        }
      })
    },
    signOut() {
      return signOut()
    },
  },
})

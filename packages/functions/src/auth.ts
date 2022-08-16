import * as functions from 'firebase-functions'
import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import * as firebase from 'firebase-admin'
import { utf8ToHex } from 'web3-utils'
import { generateNonce } from './utils'
import { getAccount } from './web3'

const app = firebase.app()
const auth = app.auth()

export const getUser = functions.https.onCall(async (data) => {
  try {
    const { publicAddress } = data
    const user = await auth.getUser(publicAddress)

    return {
      publicAddress,
      nonce: user.customClaims?.custonNonce,
      admin: user.customClaims?.admin,
    }
  } catch {
    throw new functions.https.HttpsError('not-found', '')
  }
})

export const createUser = functions
  .runWith({ secrets: ['OWNER_ADDRESS', 'OWNER_PK'] })
  .https.onCall(async (data) => {
    const account = getAccount()
    const { publicAddress } = data
    const custonNonce = generateNonce()
    const admin = account.address.toLowerCase() === publicAddress.toLowerCase()

    await auth.createUser({ uid: publicAddress })
    await auth.setCustomUserClaims(publicAddress, { custonNonce, admin })

    return {
      publicAddress,
      nonce: custonNonce,
      admin,
    }
  })

export const getAuthToken = functions
  .runWith({ secrets: ['OWNER_ADDRESS', 'OWNER_PK'] })
  .https.onCall(async (data) => {
    const account = getAccount()
    const { publicAddress, signature } = data
    const user = await auth.getUser(publicAddress)

    if (!user) throw new functions.https.HttpsError('not-found', '')

    const admin = account.address.toLowerCase() === publicAddress.toLowerCase()

    if (admin) {
      const msg = `I am signing my nonce: ${user.customClaims?.custonNonce}`
      const address = recoverPersonalSignature({
        data: utf8ToHex(msg),
        signature,
      })

      if (address.toLowerCase() === publicAddress.toLowerCase()) {
        const token = await auth.createCustomToken(publicAddress)
        await auth.setCustomUserClaims(publicAddress, {
          custonNonce: generateNonce(),
          admin,
        })
        return token
      } else {
        throw new functions.https.HttpsError('unauthenticated', '')
      }
    }

    const token = await auth.createCustomToken(publicAddress)
    return token
  })

import * as functions from 'firebase-functions'
import * as firebase from 'firebase-admin'
import { web3, getAccount } from './web3'
import { deleteCollection } from './utils'

export const importWhitelist = functions
  .runWith({ secrets: ['OWNER_ADDRESS', 'OWNER_PK'] })
  .https.onCall(async (data, context) => {
    if (!context.auth?.token?.admin) {
      throw new functions.https.HttpsError('unauthenticated', '')
    }

    const app = firebase.app()
    const db = app.firestore()

    const account = getAccount()

    const { addresses } = data as { addresses: string[] }
    const batch = db.batch()

    addresses.forEach((address) => {
      const { signature } = account.sign(
        web3.utils.keccak256(web3.utils.encodePacked(address)!)
      )

      const doc = db.collection('whitelist').doc()

      batch.create(doc, { address, signature })
    })

    await batch.commit()
  })

export const deleteAllFromWhitelist = functions.https.onCall(
  async (data, context) => {
    if (!context.auth?.token?.admin) {
      throw new functions.https.HttpsError('unauthenticated', '')
    }

    const app = firebase.app()
    const db = app.firestore()

    await deleteCollection(db, 'whitelist', 400)
  }
)

export const signatureForAll = functions
  .runWith({ secrets: ['OWNER_ADDRESS', 'OWNER_PK'] })
  .https.onCall(async (address, context) => {
    const account = getAccount()

    const { signature } = account.sign(
      web3.utils.keccak256(web3.utils.encodePacked(address)!)
    )

    return signature
  })

import { FirestoreDataConverter } from 'firebase/firestore'

export const whitelistConverter: FirestoreDataConverter<HPC.WhitelistDocData> =
  {
    toFirestore(modelObject) {
      return modelObject
    },
    fromFirestore(snapshot, options) {
      const { address, signature } = snapshot.data(options)
      return {
        address,
        signature,
      }
    },
  }

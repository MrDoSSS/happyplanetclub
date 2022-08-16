import { db } from './index'
import { collection, QuerySnapshot, DocumentData } from 'firebase/firestore'
import * as converters from './converters'

export const whitelistRef = collection(db, 'whitelist').withConverter(
  converters.whitelistConverter
)

export const serializeDocs = <T = DocumentData>(snapshot: QuerySnapshot<T>) => {
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

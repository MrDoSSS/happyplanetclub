import { httpsCallable } from 'firebase/functions'
import { functions } from './index'

export const getUser = httpsCallable<
  { publicAddress: string },
  { publicAddress: string; nonce: number; admin: boolean }
>(functions, 'getUser')

export const createUser = httpsCallable<
  { publicAddress: string },
  { publicAddress: string; nonce: number; admin: boolean }
>(functions, 'createUser')

export const getAuthToken = httpsCallable<
  { publicAddress: string; signature: string },
  string
>(functions, 'getAuthToken')

export const importWhitelist = httpsCallable<{ addresses: string[] }, void>(
  functions,
  'importWhitelist'
)

export const deleteAllFromWhitelist = httpsCallable<void, void>(
  functions,
  'deleteAllFromWhitelist'
)

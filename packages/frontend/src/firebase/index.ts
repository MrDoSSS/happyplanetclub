import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCX2ylFuWPX9URMaJBaylOTvgEdq9BOeos',
  authDomain: 'happy-planet-club.firebaseapp.com',
  projectId: 'happy-planet-club',
  storageBucket: 'happy-planet-club.appspot.com',
  messagingSenderId: '397914167613',
  appId: '1:397914167613:web:73d078ebd6a55340a78d54',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const functions = getFunctions(app)
export const db = getFirestore(app)

// if (import.meta.env.DEV) {
//   connectAuthEmulator(auth, 'http://192.168.31.85:9099', {
//     disableWarnings: true,
//   })
//   connectFunctionsEmulator(functions, '192.168.31.85', 5001)
//   connectFirestoreEmulator(db, '192.168.31.85', 8080)
// }

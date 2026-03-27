import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from './config'

const provider = new GoogleAuthProvider()

provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, provider)
  } catch (err) {
    console.error('Sign in error:', err)
  }
}

export const logOut = () => signOut(auth)

export const onAuthChange = (callback) => onAuthStateChanged(auth, callback)

export { getRedirectResult }
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from './config'

const provider = new GoogleAuthProvider()

// Force account selection every time
provider.setCustomParameters({ prompt: 'select_account' })

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

export const signInWithGoogle = async () => {
  try {
    if (isMobile) {
      await signInWithRedirect(auth, provider)
    } else {
      await signInWithPopup(auth, provider)
    }
  } catch (err) {
    console.error('Sign in error:', err)
  }
}

export const logOut = () => signOut(auth)

export const onAuthChange = (callback) => onAuthStateChanged(auth, callback)

export { getRedirectResult }
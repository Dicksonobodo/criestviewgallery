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
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

export const signInWithGoogle = async () => {
  if (isMobile) {
    await signInWithRedirect(auth, provider)
  } else {
    await signInWithPopup(auth, provider)
  }
}

export const logOut = () => signOut(auth)

export const onAuthChange = (callback) => onAuthStateChanged(auth, callback)

export { getRedirectResult }
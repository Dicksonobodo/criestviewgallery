import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth } from './config'

const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

export const signInWithGoogle = () => {
  if (isMobile) return signInWithRedirect(auth, provider)
  return signInWithPopup(auth, provider)
}

export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const signUpWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

export const logOut = () => signOut(auth)
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback)
export { getRedirectResult, onAuthStateChanged }
import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthChange, getRedirectResult } from '../firebase/auth'
import { auth } from '../firebase/config'

const AuthContext = createContext(null)

const ADMIN_EMAILS = ['obododickson7@gmail.com', 'giuliagallary36@gmail.com']

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Handle redirect result on mobile
  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result?.user) setUser(result.user)
    })
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const isAdmin = user && ADMIN_EMAILS.includes(user.email)

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
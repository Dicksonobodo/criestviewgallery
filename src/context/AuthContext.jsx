import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthChange } from '../firebase/auth'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Your admin email — change this to your Google account email
  const ADMIN_EMAIL = ['obododickson7@gmail.com', 'giuliagallary36@gmail.com']

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const isAdmin = user && ADMIN_EMAIL.includes(user.email)

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
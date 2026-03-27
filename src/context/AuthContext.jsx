import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthChange } from '../firebase/auth'
import { getRedirectResult } from 'firebase/auth'
import { auth } from '../firebase/config'

const AuthContext = createContext(null)

const ADMIN_EMAILS = ['obododickson7@gmail.com', 'giuliagallary36@gmail.com']

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe = () => {}

    const init = async () => {
      // Check redirect result first on page load
      try {
        const result = await getRedirectResult(auth)
        if (result?.user) {
          setUser(result.user)
        }
      } catch (err) {
        console.error('Redirect result error:', err)
      }

      // Then start the persistent auth listener
      unsubscribe = onAuthChange((currentUser) => {
        setUser(currentUser)
        setLoading(false)
      })
    }

    init()

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
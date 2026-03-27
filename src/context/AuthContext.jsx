import { createContext, useContext, useEffect, useState } from 'react'
import { getRedirectResult, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'

const AuthContext = createContext(null)

const ADMIN_EMAILS = ['obododickson7@gmail.com', 'giuliagallary36@gmail.com']

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe = () => {}

    const init = async () => {
      let redirectUser = null

      // 1. Await redirect result first
      try {
        const result = await getRedirectResult(auth)
        if (result?.user) {
          redirectUser = result.user
          setUser(result.user)
        }
      } catch (err) {
        console.error('Redirect result error:', err)
      }

      // 2. Start auth listener
      let firstEmission = true

      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (firstEmission && redirectUser) {
          // Firebase hasn't caught up yet after redirect — trust redirectUser
          firstEmission = false
          setLoading(false)
          return
        }
        firstEmission = false
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
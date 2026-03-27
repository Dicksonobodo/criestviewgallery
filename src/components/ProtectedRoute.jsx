import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, requireAuth = false }) => {
  const { user, isAdmin } = useAuth()

  // Just needs to be logged in (e.g. checkout)
  if (requireAuth && !user) {
    return <Navigate to="/login" replace />
  }

  // Needs to be admin
  if (!requireAuth && (!user || !isAdmin)) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
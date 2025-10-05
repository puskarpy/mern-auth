import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedLayout = ({ children }) => {
    const { user } = useSelector( state => state.user)
    if (!user) {
        return <Navigate to={'/login'} replace/>
    }
  return children
}

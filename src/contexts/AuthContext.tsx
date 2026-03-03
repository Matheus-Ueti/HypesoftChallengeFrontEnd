import { createContext, useContext } from 'react'

interface AuthContextValue {
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextValue>({ logout: () => {}, isAuthenticated: false })
export const useAuthContext = () => useContext(AuthContext)

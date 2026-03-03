import { keycloak } from '../lib/keycloak'
import type { User } from '../types/auth'

// Keycloak já foi inicializado no main.tsx — só lemos o estado
export const useAuth = () => {
  const isAuthenticated = keycloak.authenticated ?? false

  const user: User | null = keycloak.tokenParsed
    ? {
        id:    keycloak.tokenParsed.sub   ?? '',
        name:  keycloak.tokenParsed.name  ?? '',
        email: keycloak.tokenParsed.email ?? '',
        roles: keycloak.realmAccess?.roles ?? [],
      }
    : null

  const logout = () => keycloak.logout()

  return { user, isAuthenticated, isLoading: false, logout }
}
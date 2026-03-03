import axios from 'axios'
import { keycloak } from './keycloak'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000',
})

// Injeta o token em todo request
api.interceptors.request.use(async (config) => {
  if (keycloak.authenticated) {
    try {
      await keycloak.updateToken(30)
    } catch {
      // Token não renovável — segue com o token atual (pode expirar)
    }
    config.headers.Authorization = `Bearer ${keycloak.token}`
  }
  return config
})

// Se a API retornar 401, tenta renovar o token e retentar uma vez
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await keycloak.updateToken(30)
        originalRequest.headers.Authorization = `Bearer ${keycloak.token}`
        return api(originalRequest)
      } catch {
        // Não conseguiu renovar — propaga o erro sem redirecionar
      }
    }
    return Promise.reject(error)
  }
)
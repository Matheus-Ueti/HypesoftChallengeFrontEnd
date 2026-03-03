import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { keycloak } from './lib/keycloak'
import './index.css'
import { App } from './App.tsx'

// Inicializa o Keycloak UMA vez antes de montar o React
// Isso evita o double-init causado pelo StrictMode
keycloak
  .init({ onLoad: 'login-required' })
  .then((authenticated) => {
    if (!authenticated) {
      keycloak.login()
      return
    }

    createRoot(document.getElementById('root')!).render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )
  })
  .catch(() => {
    // Keycloak indisponível (dev local sem servidor) — monta sem auth
    createRoot(document.getElementById('root')!).render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )
  })
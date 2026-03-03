import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import { Products } from './pages/Product'
import { Categories } from './pages/Categories'
import { Settings } from './pages/Settings'
import { AuthContext } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'

export const App = () => {
  const { isAuthenticated, isLoading, logout } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Carregando...</p>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ logout, isAuthenticated }}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route element={<MainLayout />}>
              <Route path="/"           element={<Dashboard />} />
              <Route path="/products"   element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/settings"   element={<Settings />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-[#fff8c7] font-display text-5xl text-black">Loading session...</div>
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}

import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { TasksPage } from './pages/TasksPage'
import { UserDetailsPage } from './pages/UserDetailsPage'
import { UsersPage } from './pages/UsersPage'
import { LandingPage } from './pages/LandingPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LandingPage initialAuthMode="login" />} />
        <Route path="/signup" element={<LandingPage initialAuthMode="signup" />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<TasksPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:userId" element={<UserDetailsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App

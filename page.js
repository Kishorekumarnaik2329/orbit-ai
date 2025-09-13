'use client'
import { useAuth } from '@/contexts/AuthContext'
import LoginPage from '@/components/auth/LoginPage'
import Dashboard from '@/components/Dashboard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return user ? <Dashboard /> : <LoginPage />
}
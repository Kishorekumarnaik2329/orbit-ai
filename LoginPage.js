'use client'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await login()
    } catch (error) {
      console.error('Login error:', error)
      alert('Failed to sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🌌</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ORBIT AI
            </h1>
            <p className="text-gray-600 mb-8">
              All-in-One Student Productivity & Skill Ecosystem
            </p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 rounded-md px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="text-xl" />
            <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
          </button>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Why Google-only?</p>
            <ul className="mt-2 space-y-1 text-xs">
              <li>✅ Seamless - No extra forms</li>
              <li>✅ Secure - OAuth handled by Google</li>
              <li>✅ Familiar - You already have an account</li>
              <li>✅ Personalized - All data tied to your profile</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
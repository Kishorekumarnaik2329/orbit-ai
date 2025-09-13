import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginPage from '@/components/auth/LoginPage'
import { AuthProvider } from '@/contexts/AuthContext'

// Mock Firebase
jest.mock('@/lib/firebase', () => ({
  auth: {},
  googleProvider: {},
  signInWithPopup: jest.fn(),
}))

const MockAuthProvider = ({ children, mockUser = null }) => (
  <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn(), loading: false }}>
    {children}
  </AuthProvider>
)

describe('Authentication', () => {
  test('renders login page when user not authenticated', () => {
    render(
      <MockAuthProvider>
        <LoginPage />
      </MockAuthProvider>
    )

    expect(screen.getByText('ORBIT AI')).toBeInTheDocument()
    expect(screen.getByText('Continue with Google')).toBeInTheDocument()
  })

  test('shows loading state during sign in', async () => {
    render(
      <MockAuthProvider>
        <LoginPage />
      </MockAuthProvider>
    )

    const signInButton = screen.getByText('Continue with Google')
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(screen.getByText('Signing in...')).toBeInTheDocument()
    })
  })
})
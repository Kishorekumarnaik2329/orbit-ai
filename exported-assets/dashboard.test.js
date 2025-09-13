import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Dashboard from '@/components/Dashboard'
import { AuthProvider } from '@/contexts/AuthContext'

const MockAuthProvider = ({ children, mockUser = { displayName: 'Test User' } }) => (
  <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn(), loading: false }}>
    {children}
  </AuthProvider>
)

describe('Dashboard', () => {
  test('renders dashboard with all modules', () => {
    render(
      <MockAuthProvider>
        <Dashboard />
      </MockAuthProvider>
    )

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Resume Builder')).toBeInTheDocument()
    expect(screen.getByText('Code IDE')).toBeInTheDocument()
    expect(screen.getByText('Voice Assistant')).toBeInTheDocument()
  })
})
# Create Next.js App Structure
nextjs_structure = {
    # App directory structure (Next.js 13+ App Router)
    "app/layout.js": """import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from '@/components/ui/Toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ORBIT AI - Student Productivity Platform',
  description: 'All-in-One Student Productivity & Skill Ecosystem',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}""",

    "app/page.js": """'use client'
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
}""",

    "app/globals.css": """@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif';
  background-color: #f8fafc;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

a {
  color: inherit;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}

.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}""",

    # Context Providers
    "contexts/AuthContext.js": """'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged 
} from '@/lib/firebase'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user document exists, create if not
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
          })
        } else {
          // Update last login
          await setDoc(doc(db, 'users', user.uid), {
            lastLoginAt: serverTimestamp(),
          }, { merge: true })
        }
      }
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return result.user
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}""",

    # Firebase Configuration
    "lib/firebase.js": """import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const functions = getFunctions(app)

// Auth providers
export const googleProvider = new GoogleAuthProvider()

// Re-export auth functions for convenience
export { signInWithPopup, signOut, onAuthStateChanged }

export default app""",

    # Main Dashboard Component
    "components/Dashboard.js": """'use client'
import { useState } from 'react'
import Sidebar from './layout/Sidebar'
import TopBar from './layout/TopBar'
import DashboardHome from './modules/DashboardHome'
import ResumeBuilder from './modules/ResumeBuilder'
import PortfolioGenerator from './modules/PortfolioGenerator'
import DocumentDesigner from './modules/DocumentDesigner'
import PresentationDesigner from './modules/PresentationDesigner'
import InvoiceGenerator from './modules/InvoiceGenerator'
import ChatRooms from './modules/ChatRooms'
import AIChat from './modules/AIChat'
import CodeIDE from './modules/CodeIDE'
import VoiceAssistant from './modules/VoiceAssistant'

export default function Dashboard() {
  const [currentModule, setCurrentModule] = useState('dashboard')

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <DashboardHome onNavigate={setCurrentModule} />
      case 'resume':
        return <ResumeBuilder />
      case 'portfolio':
        return <PortfolioGenerator />
      case 'documents':
        return <DocumentDesigner />
      case 'presentations':
        return <PresentationDesigner />
      case 'invoices':
        return <InvoiceGenerator />
      case 'chat':
        return <ChatRooms />
      case 'ai-chat':
        return <AIChat />
      case 'code':
        return <CodeIDE />
      case 'voice':
        return <VoiceAssistant />
      default:
        return <DashboardHome onNavigate={setCurrentModule} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentModule={currentModule} onNavigate={setCurrentModule} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  )
}""",

    # Login Component
    "components/auth/LoginPage.js": """'use client'
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
}""",

    # Layout Components
    "components/layout/Sidebar.js": """'use client'
import { 
  HomeIcon, 
  DocumentTextIcon, 
  PresentationChartBarIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  MicrophoneIcon,
  BriefcaseIcon,
  UserCircleIcon 
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: 'dashboard', icon: HomeIcon },
  { name: 'Resume Builder', href: 'resume', icon: DocumentTextIcon },
  { name: 'Portfolio', href: 'portfolio', icon: UserCircleIcon },
  { name: 'Documents', href: 'documents', icon: DocumentTextIcon },
  { name: 'Presentations', href: 'presentations', icon: PresentationChartBarIcon },
  { name: 'Invoices', href: 'invoices', icon: BriefcaseIcon },
  { name: 'Chat Rooms', href: 'chat', icon: ChatBubbleLeftRightIcon },
  { name: 'AI Assistant', href: 'ai-chat', icon: ChatBubbleLeftRightIcon },
  { name: 'Code IDE', href: 'code', icon: CodeBracketIcon },
  { name: 'Voice Practice', href: 'voice', icon: MicrophoneIcon },
]

export default function Sidebar({ currentModule, onNavigate }) {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">🌌 ORBIT AI</h1>
      </div>
      <nav className="mt-5">
        <div className="px-2">
          {navigation.map((item) => {
            const isActive = currentModule === item.href
            return (
              <button
                key={item.name}
                onClick={() => onNavigate(item.href)}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}""",

    "components/layout/TopBar.js": """'use client'
import { useAuth } from '@/contexts/AuthContext'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function TopBar() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Welcome back, {user?.displayName?.split(' ')[0] || 'Student'}!
            </h2>
          </div>
          
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center space-x-3 text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.photoURL || '/default-avatar.png'}
                    alt=""
                  />
                  <span className="hidden md:block text-gray-700 font-medium">
                    {user?.displayName}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  )
}""",
}

# Create directories and write files
import os

# Create directory structure
directories = [
    'app', 'contexts', 'lib', 'components', 
    'components/auth', 'components/layout', 'components/modules', 
    'components/ui', 'hooks', 'utils', 'tests'
]

for directory in directories:
    os.makedirs(directory, exist_ok=True)

# Write Next.js files
for filepath, content in nextjs_structure.items():
    with open(filepath, 'w') as f:
        f.write(content)

print("✅ Created Next.js app structure and core components")
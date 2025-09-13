'use client'
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
}
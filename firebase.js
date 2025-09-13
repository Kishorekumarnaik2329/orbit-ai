import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.AIzaSyBVipti42UJ66SMiK5gESpLx3ExFQzzab8,
  authDomain: process.env.orbit-ai-e7b03.firebaseapp.com,
  projectId: process.env.orbit-ai-e7b03,
  storageBucket: process.env.orbit-ai-e7b03.firebasestorage.app,
  messagingSenderId: process.env.721877008669,
  appId: process.env.1:721877008669:web:8c7244e814de656dcc61f4,
  measurementId: process.env.G-5TP9ESX5EF
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

export default app

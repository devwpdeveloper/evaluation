import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../lib/firebase'

type AuthContextValue = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(Boolean(auth))

  useEffect(() => {
    if (!auth) {
      return undefined
    }

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  const value: AuthContextValue = {
    user,
    loading,
    async login(email, password) {
      if (!auth || !isFirebaseConfigured) {
        throw new Error('Firebase is not configured. Add your VITE_FIREBASE_* values to a local .env file.')
      }
      await signInWithEmailAndPassword(auth, email, password)
    },
    async signup(email, password) {
      if (!auth || !isFirebaseConfigured) {
        throw new Error('Firebase is not configured. Add your VITE_FIREBASE_* values to a local .env file.')
      }
      await createUserWithEmailAndPassword(auth, email, password)
    },
    async logout() {
      if (auth) {
        await signOut(auth)
      }
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }

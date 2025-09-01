"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { auth, type User } from "@/lib/api-client"

interface AuthContextType {
  isAuthenticated: boolean
  isAdmin: boolean
  user: User | null
  sendLoginCode: (email: string) => Promise<boolean>
  verifyLoginCode: (email: string, code: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if there's a valid token and validate it
        const response = await auth.validateToken()
        if (response.success) {
          // Get current user data
          const userResponse = await auth.getCurrentUser()
          if (userResponse.success && userResponse.data) {
            setUser(userResponse.data)
            setIsAuthenticated(true)
            setIsAdmin(userResponse.data.role === "admin")
          }
        }
      } catch (error) {
        console.log("No valid authentication found")
        // Clear any invalid tokens
        await auth.logout()
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  // Send login code using backend API
  const sendLoginCode = async (email: string): Promise<boolean> => {
    try {
      const response = await auth.sendCode(email)
      return response.success
    } catch (error) {
      console.error("Error sending login code:", error)
      return false
    }
  }

  // Verify the code entered by the user using backend API
  const verifyLoginCode = async (email: string, code: string): Promise<boolean> => {
    try {
      const response = await auth.verifyCode(email, code)
      
      if (response.success && response.data) {
        const { user: userData } = response.data
        setUser(userData)
        setIsAuthenticated(true)
        setIsAdmin(userData.role === "admin")
        return true
      } else {
        console.error('Verification failed:', response.message)
        return false
      }
    } catch (error) {
      console.error('Error verifying code:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      await auth.logout()
    } catch (error) {
      console.error("Error during logout:", error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
      setIsAdmin(false)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, sendLoginCode, verifyLoginCode, logout, loading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

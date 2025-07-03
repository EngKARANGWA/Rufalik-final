"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  isAdmin: boolean
  user: { username: string; role: string } | null
  sendLoginCode: (email: string) => boolean
  verifyLoginCode: (email: string, code: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const [loginCode, setLoginCode] = useState<string | null>(null)
  const [codeSentAt, setCodeSentAt] = useState<number | null>(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("rugalika_user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
      setIsAdmin(userData.role === "admin")
    }
  }, [])

  // Generate a 6-digit code
  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString()

  // Simulate sending code to email (in production, use email service)
  const sendLoginCode = (email: string): boolean => {
    if (email === "karangwacyrille@gmail.com") {
      const code = generateCode()
      setLoginCode(code)
      setCodeSentAt(Date.now())
      // Simulate sending email (replace with real email logic)
      // For now, just log the code
      console.log(`Login code for admin: ${code}`)
      return true
    }
    return false
  }

  // Verify the code entered by the user
  const verifyLoginCode = (email: string, code: string): boolean => {
    if (
      email === "karangwacyrille@gmail.com" &&
      loginCode &&
      code === loginCode &&
      codeSentAt &&
      Date.now() - codeSentAt < 5 * 60 * 1000 // 5 minutes expiry
    ) {
      const userData = { username: "Admin", role: "admin" }
      setUser(userData)
      setIsAuthenticated(true)
      setIsAdmin(true)
      localStorage.setItem("rugalika_user", JSON.stringify(userData))
      setLoginCode(null)
      setCodeSentAt(null)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
    localStorage.removeItem("rugalika_user")
    setLoginCode(null)
    setCodeSentAt(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, sendLoginCode, verifyLoginCode, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

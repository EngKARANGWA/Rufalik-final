"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  isAdmin: boolean
  user: { username: string; role: string } | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)

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

  const login = (username: string, password: string): boolean => {
    // Simple authentication - in production, this would be handled by a backend
    if (username === "Admin" && password === "123") {
      const userData = { username: "Admin", role: "admin" }
      setUser(userData)
      setIsAuthenticated(true)
      setIsAdmin(true)
      localStorage.setItem("rugalika_user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
    localStorage.removeItem("rugalika_user")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

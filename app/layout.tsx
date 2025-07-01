import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"

export const metadata: Metadata = {
  title: "Rugalika News",
  description: "Created by Dev.Karangwa",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="rw">
      <head />
      <body className="bg-white font-sans min-h-screen flex flex-col">
        <AuthProvider>
          <main className="flex-1 px-4 md:px-8 lg:px-16 py-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}

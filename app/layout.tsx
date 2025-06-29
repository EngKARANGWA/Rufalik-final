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
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

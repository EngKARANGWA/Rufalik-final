"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")
  const { sendLoginCode, verifyLoginCode } = useAuth()
  const router = useRouter()

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setInfo("")
    const sent = sendLoginCode(email)
    if (sent) {
      setStep(2)
      setInfo("Kode yo kwinjira yoherejwe kuri email (reba console)")
    } else {
      setError("Email ntikwiye cyangwa ntabwo wemerewe kwinjira")
    }
  }

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setInfo("")
    const success = verifyLoginCode(email, code)
    if (success) {
      router.push("/admin")
    } else {
      setError("Kode yinjiza siyo cyangwa yararenze igihe")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="flex justify-center items-center min-h-[600px]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Kwinjira mu Sisitemu</CardTitle>
              <p className="text-muted-foreground">Injira ukoresheje email ya admin</p>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <form onSubmit={handleSendCode} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
                  )}
                  {info && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">{info}</div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email ya Admin</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Ohereza Kode
                  </Button>
                </form>
              )}
              {step === 2 && (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
                  )}
                  {info && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">{info}</div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="code">Injiza Kode Wahawe</Label>
                    <div className="relative">
                      <Input
                        id="code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="pl-3"
                        required
                        maxLength={6}
                        pattern="[0-9]{6}"
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Kwinjira
                  </Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={() => { setStep(1); setCode(""); setInfo(""); setError("") }}>
                    Subira inyuma
                  </Button>
                </form>
              )}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Ufite ikibazo? Hamagara: <strong>0788123456</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

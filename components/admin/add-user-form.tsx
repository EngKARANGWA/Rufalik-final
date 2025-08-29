"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { UserPlus, User, Phone, CreditCard, Users, Crown } from "lucide-react"

const employmentStatuses = [
  { label: "Arakora", value: "employed", icon: User },
  { label: "Ntabwo akora", value: "unemployed", icon: User },
  { label: "Umuyobozi", value: "leader", icon: Crown },
]

const mutualStatuses = [
  { label: "Yarashatse", value: "registered" },
  { label: "Ntiyashatse", value: "not_registered" },
]

export function AddUserForm({ onUserAdded, onClose, user }: { onUserAdded?: (user: any) => void, onClose?: () => void, user?: any }) {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [nationalId, setNationalId] = useState("")
  const [phone, setPhone] = useState("")
  const [mutualStatus, setMutualStatus] = useState(mutualStatuses[0].value)
  const [employmentStatus, setEmploymentStatus] = useState(employmentStatuses[0].value)
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [nationalIdError, setNationalIdError] = useState("")

  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(" ") : ["", ""]
      setFirstName(nameParts[0] || "")
      setLastName(nameParts.slice(1).join(" ") || "")
      setEmail(user.email || "")
      setNationalId(user.nationalId || "")
      setPhone(user.phone || "")
      setMutualStatus(user.mutualStatus || mutualStatuses[0].value)
      setEmploymentStatus(user.employmentStatus || employmentStatuses[0].value)
    } else {
      setFirstName("")
      setLastName("")
      setEmail("")
      setNationalId("")
      setPhone("")
      setMutualStatus(mutualStatuses[0].value)
      setEmploymentStatus(employmentStatuses[0].value)
    }
  }, [user])

  const validateEmail = (value: string) => {
    if (!value) return "Email irakenewe."
    // Simple email regex
    if (!/^\S+@\S+\.\S+$/.test(value)) return "Shyiramo email nyayo."
    return ""
  }

  const validateNationalId = (value: string) => {
    if (!value) return "National ID irakenewe."
    if (value.length !== 16) return "National ID igomba kuba inyuguti 16."
    if (!/^\d{16}$/.test(value)) return "National ID igomba kuba imibare gusa."
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email
    const emailErr = validateEmail(email)
    setEmailError(emailErr)
    
    // Validate National ID
    const nationalIdErr = validateNationalId(nationalId)
    setNationalIdError(nationalIdErr)
    
    if (emailErr || nationalIdErr) return
    setLoading(true)
    
    try {
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: employmentStatus === "leader" ? "admin" : "citizen",
        phone: phone,
        nationalId: nationalId,
        employmentStatus: employmentStatus
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (data.success) {
        const newUser = {
          id: user?.id || Date.now(),
          name: `${firstName} ${lastName}`,
          email: email,
          phone: phone,
          role: employmentStatus === "leader" ? "admin" : "citizen",
          status: "active",
          joinDate: user?.joinDate || new Date().toISOString().split('T')[0],
          lastLogin: user?.lastLogin || new Date().toISOString().split('T')[0],
          nationalId: nationalId,
          mutualStatus: mutualStatus,
          employmentStatus: employmentStatus,
        }
        
        if (onUserAdded) {
          onUserAdded(newUser)
        }
        if (onClose) {
          onClose()
        }
        alert(user ? "Umuturage yahinduwe neza!" : "Umuturage yongeyeho neza!")
             } else {
         // Handle validation errors
         if (data.errors && data.errors.length > 0) {
           const errorMessages = data.errors.map((error: any) => `${error.field}: ${error.message}`).join('\n')
           alert(`Hari amakosa:\n${errorMessages}`)
         } else if (data.message) {
           // Handle specific error messages like "nationalId already exists"
           if (data.message.includes("nationalId already exists")) {
             alert("National ID iyo yarashyizwemo. Koresha National ID indi.")
             setNationalId("") // Clear the national ID field
           } else {
             alert(data.message)
           }
         } else {
           alert("Hari ikibazo cyo kohereza umuturage")
         }
       }
    } catch (error) {
      console.error('Error creating user:', error)
      alert("Hari ikibazo cyo kohereza umuturage. Ongera ugerageze.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-card rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <UserPlus className="h-6 w-6" />
        {user ? "Hindura Umuturage" : "Ongeraho Umuturage"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Amazina y'ibanze</label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Andika amazina y'ibanze"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Amazina y'inyuma</label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Andika amazina y'inyuma"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Andika email"
            required
          />
          {emailError && <p className="text-xs text-red-600 mt-1">{emailError}</p>}
        </div>
                 <div>
           <label className="block mb-1 font-medium flex items-center gap-2">
             <CreditCard className="h-4 w-4" />
             National ID
           </label>
           <Input
             value={nationalId}
             onChange={(e) => {
               const value = e.target.value.replace(/\D/g, '').slice(0, 16) // Only allow digits, max 16
               setNationalId(value)
               setNationalIdError("") // Clear error when user types
             }}
             placeholder="Andika National ID (16 imibare)"
             required
             maxLength={16}
             pattern="[0-9]{16}"
           />
           {nationalIdError && <p className="text-xs text-red-600 mt-1">{nationalIdError}</p>}
         </div>
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Telefoni
          </label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Andika numero ya telefoni"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Mutual Status
          </label>
          <Select value={mutualStatus} onValueChange={setMutualStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Hitamo Mutual Status" />
            </SelectTrigger>
            <SelectContent>
              {mutualStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Uko akora</label>
          <Select value={employmentStatus} onValueChange={setEmploymentStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Hitamo uko akora" />
            </SelectTrigger>
            <SelectContent>
              {employmentStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  <div className="flex items-center gap-2">
                    <status.icon className="h-4 w-4" />
                    {status.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (user ? "Kohereza..." : "Kohereza...") : (user ? "Hindura Umuturage" : "Ohereza Umuturage")}
        </Button>
      </form>
    </div>
  )
} 
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
  const [nationalId, setNationalId] = useState("")
  const [phone, setPhone] = useState("")
  const [mutualStatus, setMutualStatus] = useState(mutualStatuses[0].value)
  const [employmentStatus, setEmploymentStatus] = useState(employmentStatuses[0].value)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(" ") : ["", ""]
      setFirstName(nameParts[0] || "")
      setLastName(nameParts.slice(1).join(" ") || "")
      setNationalId(user.nationalId || "")
      setPhone(user.phone || "")
      setMutualStatus(user.mutualStatus || mutualStatuses[0].value)
      setEmploymentStatus(user.employmentStatus || employmentStatuses[0].value)
    } else {
      setFirstName("")
      setLastName("")
      setNationalId("")
      setPhone("")
      setMutualStatus(mutualStatuses[0].value)
      setEmploymentStatus(employmentStatuses[0].value)
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const newUser = {
      id: user?.id || Date.now(),
      name: `${firstName} ${lastName}`,
      email: user?.email || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: phone,
      role: employmentStatus === "leader" ? "admin" : "citizen",
      status: "active",
      joinDate: user?.joinDate || new Date().toISOString().split('T')[0],
      lastLogin: user?.lastLogin || new Date().toISOString().split('T')[0],
      nationalId: nationalId,
      mutualStatus: mutualStatus,
      employmentStatus: employmentStatus,
    }
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      if (onUserAdded) {
        onUserAdded(newUser)
      }
      if (onClose) {
        onClose()
      }
      alert(user ? "Umuturage yahinduwe neza!" : "Umuturage yongeyeho neza!")
    }, 1000)
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
          <label className="block mb-1 font-medium flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            National ID
          </label>
          <Input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            placeholder="Andika National ID"
            required
          />
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
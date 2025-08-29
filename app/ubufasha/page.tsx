"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { NewsTabs } from "@/components/news/news-tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, HelpCircle, Beef, Trees, Mountain, Users, Home, Apple, Heart } from "lucide-react"

const departments = [
  {
    name: "Ubuvuzi bw'Amatungo",
    description: "Serivisi z'ubuvuzi bw'amatungo n'ubworozi",
    contact: "0788123456",
    email: "amatungo@rugalika.gov.rw",
    services: ["Guvura amatungo", "Inama z'ubworozi", "Gukurikirana ubuzima bw'amatungo"],
    iconComponent: Beef,
  },
  {
    name: "Amashyamba",
    description: "Serivisi z'amashyamba n'ibidukikije",
    contact: "0788123457",
    email: "amashyamba@rugalika.gov.rw",
    services: ["Kurinda amashyamba", "Gutera ibiti", "Inama z'ibidukikije"],
    iconComponent: Trees,
  },
  {
    name: "Ubutaka",
    description: "Serivisi z'ubutaka n'ubwubatsi",
    contact: "0788123458",
    email: "ubutaka@rugalika.gov.rw",
    services: ["Kwandikisha ubutaka", "Gukemura amakimbirane y'ubutaka", "Gutanga impapuro z'ubutaka"],
    iconComponent: Mountain,
  },
  {
    name: "Irangamimerere",
    description: "Serivisi z'uburinganire n'iterambere ry'abagore",
    contact: "0788123459",
    email: "irangamimerere@rugalika.gov.rw",
    services: ["Gushyigikira abagore", "Amahugurwa y'uburinganire", "Kurwanya ubugizi bwa nabi"],
    iconComponent: Users,
  },
  {
    name: "Imibereho Myiza",
    description: "Serivisi z'imibereho myiza n'iterambere ry'abaturage",
    contact: "0788123460",
    email: "imibereho@rugalika.gov.rw",
    services: ["Guteza imbere imibereho", "Amahugurwa y'ubuzima", "Serivisi z'imibereho myiza"],
    iconComponent: Heart,
  },
  {
    name: "Imiturire",
    description: "Serivisi z'intungamubiri n'imirire myiza",
    contact: "0788123461",
    email: "imiturire@rugalika.gov.rw",
    services: ["Inama z'intungamubiri", "Gukurikirana imirire y'abana", "Amahugurwa y'imirire myiza"],
    iconComponent:Home,
  },
]

export default function UbufashaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [formData, setFormData] = useState({
    names: "",
    email: "",
    telephone: "",
    department: "",
    description: "",
  })
  const [emailError, setEmailError] = useState("")

  const validateEmail = (value: string) => {
    if (!value) return "Email irakenewe."
    if (!/^\S+@\S+\.\S+$/.test(value)) return "Shyiramo email nyayo."
    return ""
  }

  const handleDepartmentChange = (value: string) => {
    setFormData((prev) => {
      let newEmail = prev.email
      if (value === "Ubutaka") {
        newEmail = "kararangwacyrille@gmail.com"
      } else if (prev.department === "Ubutaka" && value !== "Ubutaka") {
        newEmail = ""
      }
      return { ...prev, department: value, email: newEmail }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateEmail(formData.email)
    setEmailError(err)
    if (err) return
    // Here you would typically send the email to the department leader
    console.log("Form submitted:", formData)
    alert("Ubutumwa bwawe bwoherejwe neza! Tuzagusubiza vuba.")
    setIsModalOpen(false)
    setFormData({ names: "", email: "", telephone: "", department: "", description: "" })
    setEmailError("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NewsTabs />

      <main className="px-4 md:px-8 lg:px-16 py-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Ubufasha n'Amasezerano</h1>
          <p className="text-muted-foreground text-lg">
            Hitamo ishami ukeneye ubufasha kandi uzasanga amakuru y'ingenzi n'uburyo bwo kuvugana n'abayobozi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept, index) => {
            const IconComponent = dept.iconComponent

            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span>{dept.name}</span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{dept.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Serivisi:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {dept.services.map((service, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{dept.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{dept.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Rugalika, Kamonyi</span>
                    </div>
                  </div>

                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-4" onClick={() => setSelectedDepartment(dept.name)}>
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Saba Ubufasha
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Saba Ubufasha - {selectedDepartment}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="names">Amazina yawe *</Label>
                          <Input
                            id="names"
                            value={formData.names}
                            onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                          {emailError && <p className="text-xs text-red-600 mt-1">{emailError}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telephone">Telefoni *</Label>
                          <Input
                            id="telephone"
                            type="tel"
                            value={formData.telephone}
                            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Hitamo Ishami *</Label>
                          <Select
                            value={formData.department}
                            onValueChange={handleDepartmentChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Hitamo ishami" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept, idx) => {
                                const IconComponent = dept.iconComponent
                                return (
                                  <SelectItem key={idx} value={dept.name}>
                                    <div className="flex items-center gap-2">
                                      <IconComponent className="h-4 w-4" />
                                      <span>{dept.name}</span>
                                    </div>
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Sobanura ubufasha ukeneye *</Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          <Mail className="h-4 w-4 mr-2" />
                          Ohereza Ubutumwa
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}

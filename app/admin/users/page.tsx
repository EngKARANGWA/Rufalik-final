"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, UserPlus, Edit, Trash2, Mail, Phone } from "lucide-react"

const usersData = [
  {
    id: 1,
    name: "Jean Baptiste Uwimana",
    email: "jean@example.com",
    phone: "0788123456",
    role: "citizen",
    status: "active",
    joinDate: "2024-01-10",
    lastLogin: "2024-01-15",
  },
  {
    id: 2,
    name: "Marie Claire Mukamana",
    email: "marie@example.com",
    phone: "0788123457",
    role: "citizen",
    status: "active",
    joinDate: "2024-01-08",
    lastLogin: "2024-01-14",
  },
  {
    id: 3,
    name: "Paul Kagame Nzeyimana",
    email: "paul@example.com",
    phone: "0788123458",
    role: "citizen",
    status: "inactive",
    joinDate: "2024-01-05",
    lastLogin: "2024-01-10",
  },
  {
    id: 4,
    name: "Admin User",
    email: "admin@rugalika.gov.rw",
    phone: "0788123459",
    role: "admin",
    status: "active",
    joinDate: "2023-12-01",
    lastLogin: "2024-01-15",
  },
]

export default function UsersManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Kuyobora Abaturage</h1>
            <p className="text-muted-foreground">Kuyobora abaturage bose bakoresha sisitemu</p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Ongeraho Umukoresha
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{usersData.length}</p>
                <p className="text-sm text-muted-foreground">Abaturage Bose</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {usersData.filter((u) => u.status === "active").length}
                </p>
                <p className="text-sm text-muted-foreground">Bakora</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {usersData.filter((u) => u.status === "inactive").length}
                </p>
                <p className="text-sm text-muted-foreground">Ntibakora</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {usersData.filter((u) => u.role === "admin").length}
                </p>
                <p className="text-sm text-muted-foreground">Abayobozi</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Shakisha abaturage..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Abaturage Bose ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Umukoresha</TableHead>
                  <TableHead>Aderesi</TableHead>
                  <TableHead>Telefoni</TableHead>
                  <TableHead>Uruhare</TableHead>
                  <TableHead>Uko bimeze</TableHead>
                  <TableHead>Kwinjira Bwa Nyuma</TableHead>
                  <TableHead>Ibikorwa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">Kwinjiye: {user.joinDate}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{user.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role === "admin" ? "Umuyobozi" : "Umuturage"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? "Akora" : "Ntakora"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

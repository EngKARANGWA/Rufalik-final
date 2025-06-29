"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, Eye, CheckCircle, Clock, AlertCircle, Send } from "lucide-react"

const helpRequestsData = [
  {
    id: 1,
    name: "Jean Baptiste Uwimana",
    phone: "0788123456",
    department: "Ubutaka",
    description: "Ndashaka gusaba impapuro z'ubutaka bwanjye",
    status: "pending",
    date: "2024-01-15",
    priority: "high",
  },
  {
    id: 2,
    name: "Marie Claire Mukamana",
    phone: "0788123457",
    department: "Ubuvuzi bw'Amatungo",
    description: "Inka yanjye irwaye, ndashaka ubufasha bwo kuyivura",
    status: "in_progress",
    date: "2024-01-14",
    priority: "urgent",
  },
  {
    id: 3,
    name: "Paul Kagame Nzeyimana",
    phone: "0788123458",
    department: "Imiturire",
    description: "Ndashaka inama ku bijyanye n'imirire myiza y'abana",
    status: "completed",
    date: "2024-01-13",
    priority: "normal",
  },
  {
    id: 4,
    name: "Alice Uwimana",
    phone: "0788123459",
    department: "Irangamimerere",
    description: "Ndashaka ubufasha mu gukemura ikibazo cy'uburinganire",
    status: "pending",
    date: "2024-01-12",
    priority: "normal",
  },
]

export default function HelpRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [response, setResponse] = useState("")

  const filteredRequests = helpRequestsData.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || request.status === selectedStatus
    const matchesDepartment = selectedDepartment === "all" || request.department === selectedDepartment
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Bitegereje
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="default">
            <AlertCircle className="h-3 w-3 mr-1" />
            Birakozwe
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline">
            <CheckCircle className="h-3 w-3 mr-1" />
            Byarangiye
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600"
      case "high":
        return "text-orange-600"
      case "normal":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Ubufasha Bwasabwe</h1>
          <p className="text-muted-foreground">Kuyobora ubufasha bwasabwe n'abaturage</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{helpRequestsData.length}</p>
                <p className="text-sm text-muted-foreground">Byose</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {helpRequestsData.filter((r) => r.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Bitegereje</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {helpRequestsData.filter((r) => r.status === "in_progress").length}
                </p>
                <p className="text-sm text-muted-foreground">Birakozwe</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {helpRequestsData.filter((r) => r.status === "completed").length}
                </p>
                <p className="text-sm text-muted-foreground">Byarangiye</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Shakisha ubufasha..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Uko bimeze" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Byose</SelectItem>
                  <SelectItem value="pending">Bitegereje</SelectItem>
                  <SelectItem value="in_progress">Birakozwe</SelectItem>
                  <SelectItem value="completed">Byarangiye</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Ishami" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Amashami Yose</SelectItem>
                  <SelectItem value="Ubutaka">Ubutaka</SelectItem>
                  <SelectItem value="Ubuvuzi bw'Amatungo">Ubuvuzi bw'Amatungo</SelectItem>
                  <SelectItem value="Imiturire">Imiturire</SelectItem>
                  <SelectItem value="Irangamimerere">Irangamimerere</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Ubufasha Bwasabwe ({filteredRequests.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Uwasabye</TableHead>
                  <TableHead>Ishami</TableHead>
                  <TableHead>Ikibazo</TableHead>
                  <TableHead>Uko bimeze</TableHead>
                  <TableHead>Itariki</TableHead>
                  <TableHead>Ibikorwa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-muted-foreground">{request.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.department}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{request.description}</div>
                      <div className={`text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority === "urgent"
                          ? "Byihutirwa"
                          : request.priority === "high"
                            ? "Byingenzi"
                            : "Bisanzwe"}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedRequest(request)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Ubufasha Bwasabwe</DialogTitle>
                          </DialogHeader>
                          {selectedRequest && (
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold">Uwasabye:</h4>
                                <p>{selectedRequest.name}</p>
                                <p className="text-sm text-muted-foreground">{selectedRequest.phone}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Ishami:</h4>
                                <p>{selectedRequest.department}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Ikibazo:</h4>
                                <p>{selectedRequest.description}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Subiza:</h4>
                                <Textarea
                                  value={response}
                                  onChange={(e) => setResponse(e.target.value)}
                                  placeholder="Andika igisubizo..."
                                  rows={4}
                                />
                              </div>
                              <Button className="w-full">
                                <Send className="h-4 w-4 mr-2" />
                                Ohereza Igisubizo
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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

"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, ThumbsUp, MessageCircle, Eye, CheckCircle, X } from "lucide-react"

const feedbackData = [
  {
    id: 1,
    author: "Jean Baptiste",
    title: "Gushyiraho ahantu h'imikino y'abana",
    content:
      "Ndatekereza ko dukeneye gushyiraho ahantu h'imikino y'abana mu karere kacu. Ibi bizafasha abana kwishimira no gukina mu buryo bwiza.",
    date: "2024-01-15",
    likes: 15,
    comments: 3,
    status: "approved",
  },
  {
    id: 2,
    author: "Marie Claire",
    title: "Amashuri y'ubumenyi bw'ikoranabuhanga",
    content: "Twakeneye amashuri y'ubumenyi bw'ikoranabuhanga kugira ngo abana bacu bige tekinoroji igezweho.",
    date: "2024-01-14",
    likes: 23,
    comments: 7,
    status: "pending",
  },
  {
    id: 3,
    author: "Paul Kagame",
    title: "Guhindura imihanda",
    content: "Imihanda y'akarere kacu ikeneye gusanwa no guhindurwa kugira ngo ikorere neza.",
    date: "2024-01-13",
    likes: 31,
    comments: 12,
    status: "approved",
  },
  {
    id: 4,
    author: "Alice Uwimana",
    title: "Serivisi z'amazi meza",
    content: "Dukeneye serivisi z'amazi meza mu turere twose tw'akarere.",
    date: "2024-01-12",
    likes: 8,
    comments: 2,
    status: "rejected",
  },
]

export default function FeedbackManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesSearch =
      feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || feedback.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="default">
            <CheckCircle className="h-3 w-3 mr-1" />
            Byemewe
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">Bitegereje</Badge>
      case "rejected":
        return (
          <Badge variant="destructive">
            <X className="h-3 w-3 mr-1" />
            Byanze
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Ibitekerezo by'Abaturage</h1>
          <p className="text-muted-foreground">Kuyobora ibitekerezo byatanzwe n'abaturage</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{feedbackData.length}</p>
                <p className="text-sm text-muted-foreground">Ibitekerezo Byose</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {feedbackData.filter((f) => f.status === "approved").length}
                </p>
                <p className="text-sm text-muted-foreground">Byemewe</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {feedbackData.filter((f) => f.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Bitegereje</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {feedbackData.filter((f) => f.status === "rejected").length}
                </p>
                <p className="text-sm text-muted-foreground">Byanze</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Shakisha ibitekerezo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedStatus === "all" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("all")}
                >
                  Byose
                </Button>
                <Button
                  variant={selectedStatus === "pending" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("pending")}
                >
                  Bitegereje
                </Button>
                <Button
                  variant={selectedStatus === "approved" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("approved")}
                >
                  Byemewe
                </Button>
                <Button
                  variant={selectedStatus === "rejected" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("rejected")}
                >
                  Byanze
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Cards */}
        <div className="space-y-4">
          {filteredFeedback.map((feedback) => (
            <Card key={feedback.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {feedback.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{feedback.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feedback.author} • {feedback.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">{getStatusBadge(feedback.status)}</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{feedback.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{feedback.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{feedback.comments}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {feedback.status === "pending" && (
                      <>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Kwemera
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <X className="h-3 w-3 mr-1" />
                          Kwanga
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="ghost">
                      <Eye className="h-3 w-3 mr-1" />
                      Reba
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFeedback.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Nta bitekerezo biboneka</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}

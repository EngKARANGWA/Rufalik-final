"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { NewsTabs } from "@/components/news/news-tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThumbsUp, MessageCircle, Share2, Plus } from "lucide-react"

const sampleIdeas = [
  {
    id: 1,
    author: "Jean Baptiste",
    date: "2024-01-15",
    title: "Gushyiraho ahantu h'imikino y'abana",
    content:
      "Ndatekereza ko dukeneye gushyiraho ahantu h'imikino y'abana mu karere kacu. Ibi bizafasha abana kwishimira no gukina mu buryo bwiza.",
    likes: 15,
    comments: 3,
  },
  {
    id: 2,
    author: "Marie Claire",
    date: "2024-01-14",
    title: "Amashuri y'ubumenyi bw'ikoranabuhanga",
    content: "Twakeneye amashuri y'ubumenyi bw'ikoranabuhanga kugira ngo abana bacu bige tekinoroji igezweho.",
    likes: 23,
    comments: 7,
  },
  {
    id: 3,
    author: "Paul Kagame",
    date: "2024-01-13",
    title: "Guhindura imihanda",
    content: "Imihanda y'umurenge wacu ikeneye gusanwa no guhindurwa kugira ngo ikorere neza.",
    likes: 31,
    comments: 12,
  },
]

export default function IbitekerozoPage() {
  const [ideas, setIdeas] = useState(sampleIdeas)
  const [showForm, setShowForm] = useState(false)
  const [newIdea, setNewIdea] = useState({
    author: "",
    title: "",
    content: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const idea = {
      id: ideas.length + 1,
      ...newIdea,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      comments: 0,
    }
    setIdeas([idea, ...ideas])
    setNewIdea({ author: "", title: "", content: "" })
    setShowForm(false)
  }

  const handleLike = (id: number) => {
    setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, likes: idea.likes + 1 } : idea)))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NewsTabs />

      <main className="container py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">Ibitekerezo by'Abaturage</h1>
            <p className="text-muted-foreground text-lg">
              Tanga ibitekerezo byawe kandi ushyigikire ibya abandi abaturage.
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Tanga Igitekerezo
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tanga Igitekerezo Gishya</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Amazina yawe *</Label>
                  <Input
                    id="author"
                    value={newIdea.author}
                    onChange={(e) => setNewIdea({ ...newIdea, author: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Umutwe w'igitekerezo *</Label>
                  <Input
                    id="title"
                    value={newIdea.title}
                    onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Sobanura igitekerezo ryawe *</Label>
                  <Textarea
                    id="content"
                    value={newIdea.content}
                    onChange={(e) => setNewIdea({ ...newIdea, content: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Ohereza Igitekerezo</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Kuraguza
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {ideas.map((idea) => (
            <Card key={idea.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {idea.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{idea.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {idea.author} • {idea.date}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{idea.content}</p>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={() => handleLike(idea.id)}>
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {idea.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {idea.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Gusangira
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

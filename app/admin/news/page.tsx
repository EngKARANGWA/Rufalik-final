"use client"

import React, { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { AddNewsForm } from "@/components/admin/add-news-form"
import { useSearchParams, useRouter } from "next/navigation"

const initialNewsData = [
  {
    id: 1,
    title: "Inyubako nshya z'ibiro by'umurenge zarangiye",
    category: "AMATANGAZO",
    author: "Admin",
    date: "2024-01-15",
    status: "published",
    views: 245,
  },
  {
    id: 2,
    title: "Serivisi z'ubuzima ku bana ziyongerewe",
    category: "UBUZIMA",
    author: "Dr. Marie Claire",
    date: "2024-01-14",
    status: "published",
    views: 189,
  },
  {
    id: 3,
    title: "Isoko rishya ry'imbuto n'amaboga ryagutse",
    category: "UBUKUNGU",
    author: "Jean Baptiste",
    date: "2024-01-13",
    status: "draft",
    views: 0,
  },
  {
    id: 4,
    title: "Umushinga w'inyubako nshya z'ishuri",
    category: "UBUREZI",
    author: "Paul Kagame",
    date: "2024-01-12",
    status: "published",
    views: 156,
  },
]

export default function NewsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [newsData, setNewsData] = useState(initialNewsData)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [editNews, setEditNews] = useState<any | null>(null)
  const [viewNews, setViewNews] = useState<any | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()

  // Open modal if ?add=1 is present
  React.useEffect(() => {
    if (searchParams.get("add") === "1") {
      setIsEditModalOpen(true)
    } else {
      setIsEditModalOpen(false)
    }
  }, [searchParams])

  const handleOpenChange = (isOpen: boolean) => {
    setIsEditModalOpen(isOpen)
    if (!isOpen) {
      // Remove ?add=1 from URL when modal closes
      const params = new URLSearchParams(searchParams)
      params.delete("add")
      router.replace(`/admin/news${params.toString() ? `?${params}` : ""}`)
    }
  }

  const filteredNews = newsData.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || news.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || news.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleEditNews = (news: any) => {
    setEditNews(news)
    setIsEditModalOpen(true)
  }

  const handleViewNews = (news: any) => {
    setViewNews(news)
    setIsViewModalOpen(true)
  }

  const handleDeleteNews = (id: number) => {
    if (window.confirm("Urashaka koko gusiba iyi nkuru?")) {
      setNewsData(prev => prev.filter(n => n.id !== id))
    }
  }

  const handleNewsSaved = (updatedNews: any) => {
    if (editNews) {
      setNewsData(prev => prev.map(n => n.id === updatedNews.id ? updatedNews : n))
    } else {
      setNewsData(prev => [updatedNews, ...prev])
    }
    setIsEditModalOpen(false)
    setEditNews(null)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditNews(null)
  }

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false)
    setViewNews(null)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Kuyobora Amakuru</h1>
            <p className="text-muted-foreground">Kuyobora amakuru yose y'umurenge</p>
          </div>
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditNews(null); setIsEditModalOpen(true) }}>
                <Plus className="h-4 w-4 mr-2" />
                Ongeraho Amakuru
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>{editNews ? "Hindura Inkuru" : "Ongeraho Inkuru"}</DialogTitle>
              <AddNewsForm news={editNews} onNewsSaved={handleNewsSaved} onClose={handleCloseEditModal} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Shakisha amakuru..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Icyiciro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Byose</SelectItem>
                  <SelectItem value="UBUREZI">Uburezi</SelectItem>
                  <SelectItem value="UBUKUNGU">Ubukungu</SelectItem>
                  <SelectItem value="UBUZIMA">Ubuzima</SelectItem>
                  <SelectItem value="AMATANGAZO">Amatangazo</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Uko bimeze" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Byose</SelectItem>
                  <SelectItem value="published">Byatangajwe</SelectItem>
                  <SelectItem value="draft">Biteganyijwe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* News Table */}
        <Card>
          <CardHeader>
            <CardTitle>Amakuru Yose ({filteredNews.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Umutwe</TableHead>
                  <TableHead>Icyiciro</TableHead>
                  <TableHead>Uwanditse</TableHead>
                  <TableHead>Itariki</TableHead>
                  <TableHead>Uko bimeze</TableHead>
                  <TableHead>Abasomye</TableHead>
                  <TableHead>Ibikorwa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.map((news) => (
                  <TableRow key={news.id}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{news.title}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{news.category}</Badge>
                    </TableCell>
                    <TableCell>{news.author}</TableCell>
                    <TableCell>{news.date}</TableCell>
                    <TableCell>
                      <Badge variant={news.status === "published" ? "default" : "secondary"}>
                        {news.status === "published" ? "Byatangajwe" : "Biteganyijwe"}
                      </Badge>
                    </TableCell>
                    <TableCell>{news.views}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewNews(news)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditNews(news)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteNews(news.id)}>
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
        {/* View News Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent>
            <DialogTitle>Reba Inkuru</DialogTitle>
            {viewNews && (
              <div>
                <h2 className="text-xl font-bold mb-2">{viewNews.title}</h2>
                <p className="mb-2"><b>Icyiciro:</b> {viewNews.category}</p>
                <p className="mb-2"><b>Uwanditse:</b> {viewNews.author}</p>
                <p className="mb-2"><b>Itariki:</b> {viewNews.date}</p>
                <p className="mb-2"><b>Ibisobanuro:</b> {viewNews.content || "N/A"}</p>
                {viewNews.files && viewNews.files.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Amafoto, Video cyangwa PDF byatanzwe:</h3>
                    <div className="space-y-4">
                      {viewNews.files.map((f: any, idx: number) => (
                        <div key={idx} className="flex flex-col gap-2 border rounded p-2 bg-muted">
                          <div className="flex items-center gap-4">
                            {f.type && f.type.startsWith("image/") && (
                              <img src={f.url} alt={f.name} className="h-16 w-16 object-cover rounded" />
                            )}
                            {f.type && f.type.startsWith("video/") && (
                              <video src={f.url} controls className="h-16 w-16 rounded" />
                            )}
                            {f.type === "application/pdf" && (
                              <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{f.name}</a>
                            )}
                            <span className="text-xs text-muted-foreground truncate max-w-[120px]">{f.name}</span>
                          </div>
                          {f.explanation && (
                            <div className="text-xs text-muted-foreground">{f.explanation}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

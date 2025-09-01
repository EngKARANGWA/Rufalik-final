"use client"

import React, { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Eye, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { AddNewsForm } from "@/components/admin/add-news-form"
import { useSearchParams, useRouter } from "next/navigation"
import { news, type News } from "@/lib/api-client"

// News data will be fetched from backend

export default function NewsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [newsData, setNewsData] = useState<News[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [editNews, setEditNews] = useState<News | null>(null)
  const [viewNews, setViewNews] = useState<News | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalNews, setTotalNews] = useState(0)
  const [limit] = useState(10)

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

  // Remove this duplicate declaration

  const handleEditNews = (news: News) => {
    setEditNews(news)
    setIsEditModalOpen(true)
  }

  const handleViewNews = (news: News) => {
    setViewNews(news)
    setIsViewModalOpen(true)
  }

  const handleDeleteNews = (id: string) => {
    if (window.confirm("Urashaka koko gusiba iyi nkuru?")) {
      setNewsData(prev => prev.filter(n => n._id !== id))
    }
  }

  const handleNewsSaved = (updatedNews: News) => {
    if (editNews) {
      setNewsData(prev => prev.map(n => n._id === updatedNews._id ? updatedNews : n))
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

  // Fetch news from backend
  const fetchNews = async () => {
    setIsLoading(true)
    setError("")
    
    try {
      const params: any = {
        page: currentPage,
        limit: limit,
        status: "published"
      }
      
      // Add category filter if not "all"
      if (selectedCategory !== "all") {
        params.category = selectedCategory
      }
      
      const response = await news.getAll(params)
      
      if (response.success && response.data) {
        setNewsData(response.data.data || [])
        setTotalNews(response.data.total || 0)
      } else {
        setError("Ntibyashoboye gusubiramo amakuru")
        setNewsData([])
        setTotalNews(0)
      }
    } catch (error) {
      console.error("Error fetching news:", error)
      setError("Hari ikibazo cyo gusubiramo amakuru")
      setNewsData([])
      setTotalNews(0)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch news when component mounts or filters change
  useEffect(() => {
    fetchNews()
  }, [currentPage, selectedCategory, selectedStatus])

  // Filter news based on search term
  const filteredNews = newsData?.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  }) || []

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Kuyobora Amakuru</h1>
            <p className="text-muted-foreground">Kuyobora amakuru yose y'umurenge</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchNews} disabled={isLoading}>
              <Loader2 className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Subiramo
            </Button>
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
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={fetchNews}>
              Ongera ugerageze
            </Button>
          </div>
        )}

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
                  <SelectItem value="IBITEKEREZO">Ibitekerezo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* News Table */}
        <Card>
          <CardHeader>
            <CardTitle>Amakuru Yose ({filteredNews?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span>Kohereza amakuru...</span>
              </div>
            ) : (
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
                  {filteredNews && filteredNews.length > 0 ? (
                    filteredNews.map((news) => (
                      <TableRow key={news._id}>
                        <TableCell className="font-medium max-w-xs">
                          <div className="truncate">{news.title}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{news.category}</Badge>
                        </TableCell>
                        <TableCell>{news.author}</TableCell>
                        <TableCell>{new Date(news.createdAt).toLocaleDateString('rw-RW')}</TableCell>
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
                            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteNews(news._id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        {isLoading ? "Kohereza amakuru..." : "Nta makuru yabonetse"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
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
                <p className="mb-2"><b>Itariki:</b> {new Date(viewNews.createdAt).toLocaleDateString('rw-RW')}</p>
                <p className="mb-2"><b>Ibisobanuro:</b> {viewNews.excerpt || "N/A"}</p>
                {viewNews.subContents && viewNews.subContents.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Ibikoresho byatanzwe:</h3>
                    <div className="space-y-4">
                      {viewNews.subContents.map((content, idx) => (
                        <div key={content._id} className="flex flex-col gap-2 border rounded p-2 bg-muted">
                          <div className="flex items-center gap-4">
                            {content.type === 'image' && content.mediaUrl && (
                              <img src={content.mediaUrl} alt={content.title} className="h-16 w-16 object-cover rounded" />
                            )}
                            {content.type === 'video' && content.mediaUrl && (
                              <video src={content.mediaUrl} controls className="h-16 w-16 rounded" />
                            )}
                            {content.type === 'pdf' && content.mediaUrl && (
                              <a href={content.mediaUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{content.title}</a>
                            )}
                            <span className="text-xs text-muted-foreground truncate max-w-[120px]">{content.title}</span>
                          </div>
                          {content.explanation && (
                            <div className="text-xs text-muted-foreground">{content.explanation}</div>
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

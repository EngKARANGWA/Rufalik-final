"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"

const newsData = [
  {
    id: 1,
    title: "Inyubako nshya z'ibiro by'akarere zarangiye",
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

  const filteredNews = newsData.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || news.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || news.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Kuyobora Amakuru</h1>
            <p className="text-muted-foreground">Kuyobora amakuru yose y'akarere</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ongeraho Amakuru
          </Button>
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
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
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

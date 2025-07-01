"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { NewsTabs } from "@/components/news/news-tabs"
import { NewsCard } from "@/components/news/news-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const educationNews = [
  {
    id: 1,
    title: "Umushinga w'inyubako nshya z'ishuri mu murenge",
    excerpt:
      "Umushinga w'inyubako nshya z'ishuri mu murenge wa Rugalika uzatangira mu kwezi gutaha. Uyu mushinga uzafasha abana benshi kubona amahirwe yo kwiga.",
    category: "UBUREZI",
    author: "Umuyobozi w'Uburezi",
    date: "2024-01-15",
    image: "/images/development-project.jpeg",
    featured: true,
  },
  {
    id: 2,
    title: "Amahugurwa y'abarimu bashya yarangiye",
    excerpt: "Umurenge wa Rugalika karangije amahugurwa y'abarimu bashya bagamije kunoza ubushobozi bwabo mu kwigisha.",
    category: "UBUREZI",
    author: "Marie Claire",
    date: "2024-01-14",
    image: "/images/sector-office.jpeg",
  },
  {
    id: 3,
    title: "Ibikoresho by'amashuri byongerewe",
    excerpt: "Amashuri yose y'umurenge yahawe ibikoresho bishya by'ubwiyigishe bizafasha mu kunoza uburezi.",
    category: "UBUREZI",
    author: "Paul Kagame",
    date: "2024-01-13",
    image: "/images/modern-building.jpeg",
  },
]

export default function UbureziPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredNews, setFilteredNews] = useState(educationNews)

  const handleSearch = () => {
    if (searchTerm) {
      const filtered = educationNews.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredNews(filtered)
    } else {
      setFilteredNews(educationNews)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NewsTabs />

      <main className="px-4 md:px-8 lg:px-16 py-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Amakuru y'Uburezi</h1>
          <p className="text-muted-foreground text-lg">Amakuru yose yerekeye uburezi mu murenge wa Rugalika</p>
        </div>

        {/* Search Section */}
        <div className="mb-8 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Shakisha amakuru y'uburezi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch}>Shakisha</Button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nta makuru y'uburezi aboneka</p>
          </div>
        )}
      </main>
    </div>
  )
}

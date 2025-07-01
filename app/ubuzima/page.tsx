"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { NewsTabs } from "@/components/news/news-tabs"
import { NewsCard } from "@/components/news/news-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const healthNews = [
  {
    id: 1,
    title: "Serivisi z'ubuzima ku bana ziyongerewe",
    excerpt:
      "Ikigo cy'ubuzima cya Rugalika cyatangije serivisi nshya z'ubuvuzi bw'abana n'inkurukurikirana y'ubuzima bwabo. Izi serivisi zizafasha abana kubona ubuvuzi bwiza.",
    category: "UBUZIMA",
    author: "Dr. Marie Claire",
    date: "2024-01-15",
    image: "/images/healthcare-child.jpeg",
    featured: true,
  },
  {
    id: 2,
    title: "Ubugenzuzi bw'ubuzima bw'abaturage",
    excerpt: "Umurenge wa Rugalika watangije gahunda y'ubugenzuzi bw'ubuzima bw'abaturage bose.",
    category: "UBUZIMA",
    author: "Dr. Jean Baptiste",
    date: "2024-01-14",
    image: "/images/sector-office.jpeg",
  },
  {
    id: 3,
    title: "Amahugurwa y'ubuzima ku baturage",
    excerpt: "Abaturage b'umurenge wa Rugalika bahawe amahugurwa ku bijyanye n'ubuzima n'isuku.",
    category: "UBUZIMA",
    author: "Nurse Paul",
    date: "2024-01-13",
    image: "/images/community-cleanup.jpeg",
  },
]

export default function UbuzimaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredNews, setFilteredNews] = useState(healthNews)

  const handleSearch = () => {
    if (searchTerm) {
      const filtered = healthNews.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredNews(filtered)
    } else {
      setFilteredNews(healthNews)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NewsTabs />

      <main className="px-4 md:px-8 lg:px-16 py-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Amakuru y'Ubuzima</h1>
          <p className="text-muted-foreground text-lg">Amakuru yose yerekeye ubuzima n'ubuvuzi mu murenge wa Rugalika</p>
        </div>

        {/* Search Section */}
        <div className="mb-8 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Shakisha amakuru y'ubuzima..."
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
            <p className="text-muted-foreground text-lg">Nta makuru y'ubuzima aboneka</p>
          </div>
        )}
      </main>
    </div>
  )
}

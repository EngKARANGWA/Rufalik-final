"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { NewsTabs } from "@/components/news/news-tabs"
import { NewsCard } from "@/components/news/news-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const announcementNews = [
  {
    id: 1,
    title: "Inyubako nshya z'ibiro by'akarere zarangiye",
    excerpt:
      "Inyubako nshya z'ibiro by'akarere za Rugalika zarangiye kandi zizatangira gukoreshwa mu kwezi gutaha. Abaturage bashobora kuzasura kugira ngo babone serivisi zitandukanye.",
    category: "AMATANGAZO",
    author: "Umuyobozi w'Akarere",
    date: "2024-01-15",
    image: "/images/sector-office.jpeg",
    featured: true,
  },
  {
    id: 2,
    title: "Ubusabane bw'abaturage mu gusukura ibidukikije",
    excerpt: "Abaturage b'akarere ka Rugalika bafatanije mu gusukura ibidukikije no kurinda ubwiza bw'akarere kabo.",
    category: "AMATANGAZO",
    author: "Umuyobozi w'Ibidukikije",
    date: "2024-01-14",
    image: "/images/community-cleanup.jpeg",
  },
  {
    id: 3,
    title: "Inama y'akarere izabera ku wa gatanu",
    excerpt: "Inama y'akarere izabera ku wa gatanu tariki ya 25/01/2024 saa sita z'umugoroba mu biro by'akarere.",
    category: "AMATANGAZO",
    author: "Umunyamabanga w'Akarere",
    date: "2024-01-13",
    image: "/images/modern-building.jpeg",
  },
]

export default function AmatangazoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredNews, setFilteredNews] = useState(announcementNews)

  const handleSearch = () => {
    if (searchTerm) {
      const filtered = announcementNews.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredNews(filtered)
    } else {
      setFilteredNews(announcementNews)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NewsTabs />

      <main className="px-4 md:px-8 lg:px-16 py-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Amatangazo</h1>
          <p className="text-muted-foreground text-lg">Amatangazo yose y'akarere ka Rugalika</p>
        </div>

        {/* Search Section */}
        <div className="mb-8 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Shakisha amatangazo..."
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
            <p className="text-muted-foreground text-lg">Nta matangazo aboneka</p>
          </div>
        )}
      </main>
    </div>
  )
}

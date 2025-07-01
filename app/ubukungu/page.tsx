"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { NewsTabs } from "@/components/news/news-tabs"
import { NewsCard } from "@/components/news/news-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const economyNews = [
  {
    id: 1,
    title: "Isoko rishya ry'imbuto n'amaboga ryagutse",
    excerpt:
      "Umurenge wa Rugalika wagize isoko rishya ry'imbuto n'amaboga mu rwego rwo guteza imbere ubucuruzi bw'abaturage no kongera umusaruro w'ubuhinzi.",
    category: "UBUKUNGU",
    author: "Umuyobozi w'Ubucuruzi",
    date: "2024-01-15",
    image: "/images/kimironko-market.jpeg",
    featured: true,
  },
  {
    id: 2,
    title: "Amahugurwa y'ubucuruzi ku baturage",
    excerpt: "Umurenge watangije amahugurwa y'ubucuruzi agamije guteza imbere ubushobozi bw'abaturage mu bucuruzi.",
    category: "UBUKUNGU",
    author: "Jean Baptiste",
    date: "2024-01-14",
    image: "/images/fruit-market.jpeg",
  },
  {
    id: 3,
    title: "Inyandiko z'ubucuruzi zororoshwe",
    excerpt:
      "Inzira z'ubandikishaji bw'ubucuruzi zahinduwe kugira ngo zikoroshwe abaturage bashaka gutangira ubucuruzi.",
    category: "UBUKUNGU",
    author: "Marie Claire",
    date: "2024-01-13",
    image: "/images/rdb-certificate.jpeg",
  },
  {
    id: 4,
    title: "Ubwiyunge bw'abaturage mu bucuruzi",
    excerpt: "Abaturage b'umurenge wa Rugalika bagiye bwiyongera mu bucuruzi bw'imbuto n'amaboga.",
    category: "UBUKUNGU",
    author: "Paul Kagame",
    date: "2024-01-12",
    image: "/images/modern-building.jpeg",
  },
]

export default function UbukunguPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredNews, setFilteredNews] = useState(economyNews)

  const handleSearch = () => {
    if (searchTerm) {
      const filtered = economyNews.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredNews(filtered)
    } else {
      setFilteredNews(economyNews)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NewsTabs />

      <main className="px-4 md:px-8 lg:px-16 py-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Amakuru y'Ubukungu</h1>
          <p className="text-muted-foreground text-lg">
            Amakuru yose yerekeye ubukungu n'ubucuruzi mu karere ka Rugalika
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Shakisha amakuru y'ubukungu..."
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
            <p className="text-muted-foreground text-lg">Nta makuru y'ubukungu aboneka</p>
          </div>
        )}
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/hero/hero-section"
import { NewsTabs } from "@/components/news/news-tabs"
import { NewsCard } from "@/components/news/news-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

// Sample news data
const sampleNews = [
  {
    id: 1,
    title: "Inyubako nshya z'ibiro by'akarere za Rugalika zarangiye",
    excerpt:
      "Inyubako nshya z'ibiro by'akarere za Rugalika zarangiye kandi zizatangira gukoreshwa mu kwezi gutaha. Izi nyubako zizafasha mu gutanga serivisi nziza ku baturage.",
    category: "AMATANGAZO",
    author: "Umuyobozi w'Akarere",
    date: "2024-01-15",
    image: "/images/sector-office.jpeg",
    featured: true,
  },
  {
    id: 2,
    title: "Serivisi z'ubuzima ku bana ziyongerewe mu karere",
    excerpt:
      "Ikigo cy'ubuzima cya Rugalika cyatangije serivisi nshya z'ubuvuzi bw'abana n'inkurukurikirana y'ubuzima bwabo.",
    category: "UBUZIMA",
    author: "Dr. Marie Claire",
    date: "2024-01-14",
    image: "/images/healthcare-child.jpeg",
  },
  {
    id: 3,
    title: "Isoko ry'imbuto n'amaboga ryagutse mu karere",
    excerpt:
      "Akarere ka Rugalika kagize isoko rishya ry'imbuto n'amaboga rizafasha abaturage mu gucuruza no kubona ibicuruzwa byiza.",
    category: "UBUKUNGU",
    author: "Jean Baptiste",
    date: "2024-01-13",
    image: "/images/fruit-market.jpeg",
  },
  {
    id: 4,
    title: "Ubusabane bw'abaturage mu gusukura ibidukikije",
    excerpt: "Abaturage b'akarere ka Rugalika bafatanije mu gusukura ibidukikije no kurinda ubwiza bw'akarere kabo.",
    category: "AMATANGAZO",
    author: "Umuyobozi w'Ibidukikije",
    date: "2024-01-12",
    image: "/images/community-cleanup.jpeg",
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredNews, setFilteredNews] = useState(sampleNews)

  const handleFilter = () => {
    let filtered = sampleNews

    if (searchTerm) {
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((news) => news.category === selectedCategory)
    }

    setFilteredNews(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="container py-8">
          <HeroSection />
        </section>

        {/* Advertisement Section */}
        <section className="bg-muted/50 py-8">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg text-center">
                <h3 className="font-bold text-lg mb-2">Serivisi za Leta</h3>
                <p className="text-sm opacity-90">Shakisha serivisi zose za leta hano</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg text-center">
                <h3 className="font-bold text-lg mb-2">Ubufasha</h3>
                <p className="text-sm opacity-90">Saba ubufasha ku byo ukeneye</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg text-center">
                <h3 className="font-bold text-lg mb-2">Ibitekerezo</h3>
                <p className="text-sm opacity-90">Tanga ibitekerezo byawe</p>
              </div>
            </div>
          </div>
        </section>

        {/* News Tabs */}
        <NewsTabs />

        {/* Search and Filter Section */}
        <section className="container py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
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
                <SelectValue placeholder="Hitamo icyiciro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Byose</SelectItem>
                <SelectItem value="UBUREZI">Uburezi</SelectItem>
                <SelectItem value="UBUKUNGU">Ubukungu</SelectItem>
                <SelectItem value="UBUZIMA">Ubuzima</SelectItem>
                <SelectItem value="AMATANGAZO">Amatangazo</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleFilter}>
              <Filter className="h-4 w-4 mr-2" />
              Shakisha
            </Button>
          </div>
        </section>

        {/* News Grid */}
        <section className="container pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Nta makuru aboneka</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Share2, Play } from "lucide-react"
import Image from "next/image"

// Extended news data structure with sub-contents
const newsData = [
  {
    id: 1,
    title: "Inyubako nshya z'ibiro by'umurenge wa Rugalika zarangiye",
    excerpt: "Inyubako nshya z'ibiro by'umurenge wa Rugalika zarangiye kandi zizatangira gukoreshwa mu kwezi gutaha. Izi nyubako zizafasha mu gutanga serivisi nziza ku baturage.",
    category: "AMATANGAZO",
    author: "Umuyobozi w'Umurenge",
    date: "2024-01-15",
    image: "/images/sector-office.jpeg",
    featured: true,
    mainContent: `
      Inyubako nshya z'ibiro by'umurenge wa Rugalika zarangiye nyuma y'igihe cy'amezi atatu y'ubwubatsi. 
      Izi nyubako zubatswe hakurikijwe ibisabwa by'iki gihe kandi zizatanga serivisi nziza ku baturage.
      
      Izi nyubako zizaba zifite ibigo bitandukanye byatanga serivisi zitandukanye ku baturage nka serivisi 
      z'ubunyangamugayo, serivisi z'irangamimerere, n'izindi serivisi za Leta.
    `,
    subContents: [
      {
        id: 1,
        title: "Ibishusho by'inyubako nshya",
        content: "Reba ibishusho byerekana inyubako nshya z'ibiro by'umurenge",
        image: "/images/sector-office.jpeg",
        type: "image"
      },
      {
        id: 2,
        title: "Serivisi zitangwa",
        content: `Izi nyubako nshya zizatanga serivisi zikurikira:
        • Serivisi z'ubunyangamugayo
        • Serivisi z'irangamimerere
        • Serivisi z'ubucuruzi
        • Serivisi z'uburezi
        • Serivisi z'ubuzima`,
        type: "text"
      },
      {
        id: 3,
        title: "Amahugurwa y'abakozi",
        content: "Abakozi bazatanga izi serivisi bahugurwa ku buryo bwo gutanga serivisi nziza ku baturage",
        video: "/videos/training-video.mp4",
        type: "video"
      }
    ]
  },
  {
    id: 2,
    title: "Serivisi z'ubuzima ku bana ziyongerewe mu karere",
    excerpt: "Ikigo cy'ubuzima cya Rugalika cyatangije serivisi nshya z'ubuvuzi bw'abana n'inkurukurikirana y'ubuzima bwabo.",
    category: "UBUZIMA",
    author: "Dr. Marie Claire",
    date: "2024-01-14",
    image: "/images/healthcare-child.jpeg",
    mainContent: `
      Ikigo cy'ubuzima cya Rugalika cyatangije serivisi nshya z'ubuvuzi bw'abana n'inkurukurikirana y'ubuzima bwabo.
      Izi serivisi zirangwa no kugira ibikoresho bishya by'ubuvuzi n'abaganga b'inzobere mu buvuzi bw'abana.
      
      Serivisi zishya zizafasha abana bose bo mu karere kugira uburyo bwo kubona ubuvuzi bwiza.
    `,
    subContents: [
      {
        id: 1,
        title: "Ibikoresho bishya by'ubuvuzi",
        content: "Ikigo cyashyizeho ibikoresho bishya by'ubuvuzi bw'abana",
        image: "/images/medical-equipment.jpeg",
        type: "image"
      },
      {
        id: 2,
        title: "Abaganga b'inzobere",
        content: "Abaganga bashya b'inzobere mu buvuzi bw'abana bazatanga ubuvuzi bwiza",
        type: "text"
      }
    ]
  }
]

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [news, setNews] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const newsId = parseInt(params.id as string)
    const foundNews = newsData.find(item => item.id === newsId)
    setNews(foundNews)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Kuraguza amakuru...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Amakuru ntabonetse</h1>
            <Button onClick={() => router.push('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Garuka ku rukurikirane
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Back Button */}
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Garuka
        </Button>

        {/* Main Article */}
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">{news.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
            
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(news.date).toLocaleDateString('rw-RW')}</span>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Sangira
              </Button>
            </div>

            {/* Main Image */}
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>
          </header>

          {/* Main Content */}
          <div className="prose max-w-none mb-12">
            <div className="text-lg leading-relaxed whitespace-pre-line">
              {news.mainContent}
            </div>
          </div>

          {/* Sub Contents */}
          {news.subContents && news.subContents.length > 0 && (
            <section className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">Amakuru y'inyongera</h2>
              
              <div className="space-y-8">
                {news.subContents.map((subContent: any) => (
                  <div key={subContent.id} className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">{subContent.title}</h3>
                    
                    {/* Text Content */}
                    {subContent.type === 'text' && (
                      <div className="text-base leading-relaxed whitespace-pre-line">
                        {subContent.content}
                      </div>
                    )}
                    
                    {/* Image Content */}
                    {subContent.type === 'image' && subContent.image && (
                      <div>
                        <p className="mb-4">{subContent.content}</p>
                        <div className="relative h-[250px] rounded-lg overflow-hidden">
                          <Image
                            src={subContent.image}
                            alt={subContent.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Video Content */}
                    {subContent.type === 'video' && subContent.video && (
                      <div>
                        <p className="mb-4">{subContent.content}</p>
                        <div className="relative bg-black rounded-lg overflow-hidden h-[250px] flex items-center justify-center">
                          <Button variant="outline" size="lg">
                            <Play className="h-6 w-6 mr-2" />
                            Kina Video
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </div>
  )
}

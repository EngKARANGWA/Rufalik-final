import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import Image from "next/image"

interface NewsCardProps {
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  image: string
  featured?: boolean
}

export function NewsCard({ title, excerpt, category, author, date, image, featured = false }: NewsCardProps) {
  const categoryColors = {
    UBUREZI: "bg-blue-100 text-blue-800",
    UBUKUNGU: "bg-green-100 text-green-800",
    UBUZIMA: "bg-red-100 text-red-800",
    AMATANGAZO: "bg-purple-100 text-purple-800",
  }

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${featured ? "md:col-span-2" : ""}`}>
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={featured ? 800 : 400}
          height={featured ? 400 : 200}
          className="h-48 w-full object-cover"
        />
        <Badge
          className={`absolute top-2 left-2 ${categoryColors[category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"}`}
        >
          {category}
        </Badge>
      </div>
      <CardHeader>
        <h3 className={`font-bold leading-tight ${featured ? "text-xl" : "text-lg"}`}>{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

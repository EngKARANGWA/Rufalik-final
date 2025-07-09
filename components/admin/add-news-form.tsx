"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Image as ImageIcon, Video as VideoIcon, FileText, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import React from "react"

const categories = [
  { label: "Ubukungu", value: "ubukungu" },
  { label: "Uburezi", value: "uburezi" },
  { label: "Ubuzima", value: "ubuzima" },
  { label: "Amatangazo", value: "amatangazo" },
]

export function AddNewsForm({ news, onNewsSaved, onClose }: { news?: any, onNewsSaved?: (news: any) => void, onClose?: () => void }) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState(categories[0].value)
  const [media, setMedia] = useState<File[]>([])
  const [mediaExplanations, setMediaExplanations] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (news) {
      setTitle(news.title || "")
      setContent(news.content || "")
      setCategory(news.category || categories[0].value)
      // For simplicity, editing does not prefill media
      setMedia(news.files?.map((f: any) => f.file) || [])
      setMediaExplanations(news.files?.map((f: any) => f.explanation) || [])
    } else {
      setTitle("")
      setContent("")
      setCategory(categories[0].value)
      setMedia([])
      setMediaExplanations([])
    }
  }, [news])

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setMedia((prev) => {
        const existing = prev.map(f => f.name + f.size)
        const newFiles = files.filter(f => !existing.includes(f.name + f.size))
        return [...prev, ...newFiles]
      })
      setMediaExplanations((prev) => [...prev, ...Array(files.length).fill("")])
    }
  }

  const handleExplanationChange = (index: number, value: string) => {
    setMediaExplanations((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const handleRemoveMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index))
    setMediaExplanations((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const newNews = {
      id: news?.id || Date.now(),
      title,
      content,
      category,
      author: news?.author || "Admin",
      date: news?.date || new Date().toISOString().split('T')[0],
      status: news?.status || "published",
      views: news?.views || 0,
      files: media.map((file, idx) => ({
        file,
        explanation: mediaExplanations[idx] || "",
        url: URL.createObjectURL(file),
        type: file.type,
        name: file.name,
      })),
    }
    setTimeout(() => {
      setLoading(false)
      if (onNewsSaved) onNewsSaved(newNews)
      if (onClose) onClose()
      alert(news ? "Inkuru yahinduwe neza!" : "Inkuru yongeyeho neza!")
    }, 1000)
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-card rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">{news ? "Hindura Inkuru" : "Ongeraho Inkuru"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Ikiciro</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Hitamo ikiciro" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Umutwe w'inkuru</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Andika umutwe w'inkuru"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Ibisobanuro</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Andika ibisobanuro by'inkuru"
            rows={5}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            Shyiraho Amafoto, Video cyangwa PDF
            <Button type="button" size="icon" variant="outline" onClick={handleAddClick} className="ml-2" title="Ongeraho Media">
              <Plus className="h-5 w-5" />
            </Button>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf,video/*"
            multiple
            onChange={handleMediaChange}
            className="hidden"
          />
          {media.length > 0 && (
            <div className="mt-2 space-y-4">
              {media.map((file, idx) => (
                <div key={idx} className="flex flex-col gap-2 border rounded p-2 bg-muted relative">
                  <div className="flex items-center gap-4">
                    {/* Icon preview */}
                    {file.type.startsWith("image/") && (
                      <span className="flex items-center justify-center h-10 w-10 bg-white rounded border">
                        <ImageIcon className="h-6 w-6 text-blue-500" />
                      </span>
                    )}
                    {file.type.startsWith("video/") && (
                      <span className="flex items-center justify-center h-10 w-10 bg-white rounded border">
                        <VideoIcon className="h-6 w-6 text-purple-500" />
                      </span>
                    )}
                    {file.type === "application/pdf" && (
                      <span className="flex items-center justify-center h-10 w-10 bg-white rounded border">
                        <FileText className="h-6 w-6 text-red-500" />
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground truncate max-w-[120px]">{file.name}</span>
                    {/* Remove button */}
                    <Button type="button" variant="ghost" size="icon" className="ml-auto" onClick={() => handleRemoveMedia(idx)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <Input
                    value={mediaExplanations[idx] || ""}
                    onChange={(e) => handleExplanationChange(idx, e.target.value)}
                    placeholder="Sobanura muri make kuri iyi media..."
                    className="text-xs"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (news ? "Kohereza..." : "Kohereza...") : (news ? "Hindura Inkuru" : "Ohereza Inkuru")}
        </Button>
      </form>
    </div>
  )
}

export function AddNewsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ongeraho Amakuru
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle>Ongeraho Amakuru</DialogTitle>
        <AddNewsForm />
      </DialogContent>
    </Dialog>
  )
}
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Murakaza neza ku rubuga rwa Rugalika",
      subtitle: "Habona amakuru yose y'umurenge wacu",
      image: "/images/sector-office.jpeg",
      description: "Koresha sisitemu yacu ngo ubone amakuru y'ingenzi y'umurenge wa Rugalika",
    },
    {
      title: "Serivisi z'Uburezi",
      subtitle: "Amakuru y'uburezi mu Murenge wa Rugalika",
      image: "/images/rugalika2.webp",
      description: "Shakisha amakuru y'amashuri n'indi serivisi z'uburezi",
    },
    {
      title: "Ubuzima bw'Abaturage",
      subtitle: "Serivisi z'ubuzima zirahari",
      image: "/images/youth.png",
      description: "Menya aho usanga serivisi z'ubuzima mu karere kacu",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[500px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
          
          {/* Transparent Color Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-green-600/70" />
          
          {/* Content */}
          <div className="relative flex h-full items-center justify-center text-center text-white z-10">
            <div className="max-w-4xl px-4">
              <h1 className="mb-4 text-5xl font-bold md:text-7xl animate-fade-in drop-shadow-lg">{slide.title}</h1>
              <p className="mb-6 text-2xl md:text-3xl animate-fade-in-delay drop-shadow-md">{slide.subtitle}</p>
              <p className="mb-8 text-xl opacity-90 animate-fade-in-delay-2 drop-shadow-md">{slide.description}</p>
              <Button size="lg" className="animate-fade-in-delay-3 shadow-lg">
                Tangira Gukoresha
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

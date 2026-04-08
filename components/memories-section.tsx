"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Music, Sparkles, Gift, Heart } from "lucide-react"

const memories = [
  {
    icon: Calendar,
    title: "Our First Christmas Together",
    description: "The moment I knew you were special. Celebrating Christmas with you felt so magical and right.",
    color: "text-red-500 dark:text-red-400",
  },
  {
    icon: Gift,
    title: "That Amazing Holiday Trip",
    description: "Exploring new places during the holidays with you, making Christmas memories that will last forever.",
    color: "text-green-500 dark:text-green-400",
  },
  {
    icon: Music,
    title: "Dancing to Christmas Songs",
    description: "Those spontaneous moments singing and dancing to Christmas carols that make life magical with you.",
    color: "text-red-500 dark:text-red-400",
  },
  {
    icon: Heart,
    title: "Every Christmas Moment",
    description: "All the small things that add up to our beautiful Christmas story together. You make every day feel like Christmas.",
    color: "text-green-500 dark:text-green-400",
  },
]

export function MemoriesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-memory-card]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-green-50/30 dark:from-green-950/10 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <span className="text-3xl sm:text-4xl mb-3 block">❄️</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 to-green-600 dark:from-red-400 dark:to-green-400 bg-clip-text text-transparent text-balance">
            Our Beautiful Christmas Moments
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {memories.map((memory, index) => {
            const Icon = memory.icon
            return (
              <Card
                key={index}
                data-memory-card
                data-index={index}
                className={`p-6 sm:p-7 md:p-8 bg-card hover:shadow-xl border-2 border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600 transition-all duration-500 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Icon className={`${memory.color} mb-3 sm:mb-4`} size={32} />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 text-balance">{memory.title}</h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed text-pretty">{memory.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

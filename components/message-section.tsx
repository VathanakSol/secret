"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Gift } from "lucide-react"

export function MessageSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("message-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="message-section" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-background to-red-50/30 dark:to-red-950/10">
      <div className="max-w-4xl mx-auto">
        <Card
          className={`p-5 sm:p-6 md:p-8 lg:p-12 bg-card shadow-lg border-2 border-red-200 dark:border-red-800 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6 md:mb-8">
            <Gift className="text-red-500 dark:text-red-400 flex-shrink-0" size={32} />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-green-600 dark:from-red-400 dark:to-green-400 bg-clip-text text-transparent text-balance">
              My Dearest Love
            </h2>
          </div>
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 leading-relaxed">
            <p className="text-pretty">
              This Christmas, I wanted to create something special just for you. Every day with you feels like the most wonderful gift, and I wanted to show you how much you mean to me during this magical season.
            </p>
            <p className="text-pretty">
              You make my world brighter, my days merrier, and my heart fuller. This Christmas and every day, I'm grateful for the incredible person you are and for choosing to share your life with me.
            </p>
            <p className="text-pretty font-semibold bg-gradient-to-r from-red-600 to-green-600 dark:from-red-400 dark:to-green-400 bg-clip-text text-transparent text-base sm:text-lg md:text-xl lg:text-2xl pt-2 sm:pt-3 md:pt-4">
              Merry Christmas, my love! 🎄❄️🎁
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}

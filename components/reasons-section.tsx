"use client"

import { useEffect, useState } from "react"

const reasons = [
  "Your beautiful smile that lights up my world like Christmas lights",
  "The way you make me laugh, bringing joy to every day",
  "Your kindness and compassion that makes you the best gift I've ever received",
  "How you believe in me and support my dreams like a true partner",
  "Your incredible strength and resilience that inspires me daily",
  "The little notes and surprises you leave - my favorite Christmas presents",
  "How you make ordinary moments feel like Christmas magic",
  "Your intelligence and the wonderful conversations we share",
  "The way you understand me like no one else ever has",
  "Simply being you - the most perfect Christmas gift I could ask for",
]

export function ReasonsSection() {
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
      { threshold: 0.2 },
    )

    const elements = document.querySelectorAll("[data-reason-item]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-red-50/30 dark:from-red-950/10 to-green-50/30 dark:to-green-950/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <span className="text-3xl sm:text-4xl mb-3 block">🎄</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 to-green-600 dark:from-red-400 dark:to-green-400 bg-clip-text text-transparent text-balance">
            Reasons I Love You This Christmas
          </h2>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {reasons.map((reason, index) => (
            <div
              key={index}
              data-reason-item
              data-index={index}
              className={`group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-xl bg-secondary/60 hover:bg-secondary border border-primary/10 hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-md ${
                visibleItems.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-xs sm:text-sm shadow-sm">
                {index + 1}
              </span>
              <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed pt-0.5 text-pretty flex-1">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

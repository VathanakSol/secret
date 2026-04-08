"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DollarSign, Heart, ArrowRight } from "lucide-react"

export function NavigationSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.querySelector("[data-navigation-section]")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      data-navigation-section
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-purple-50/30 dark:from-purple-950/10 to-pink-50/30 dark:to-pink-950/10"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <span className="text-3xl sm:text-4xl mb-3 block">🔗</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent text-balance mb-4">
            Explore More
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Discover different aspects of our journey together 💕
          </p>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Financial Page Link */}
          <Link href="/financial" className="group">
            <Card className="p-6 sm:p-8 h-full bg-gradient-to-br from-green-500/10 to-emerald-600/5 border-green-500/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    Our Financial Journey
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/70 mb-4">
                    Track our finances and savings goals together
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="group-hover:bg-green-500/10 group-hover:border-green-500/40 transition-colors"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </Link>

          {/* Placeholder for future sections */}
          <Card className="p-6 sm:p-8 h-full bg-gradient-to-br from-pink-500/10 to-red-600/5 border-pink-500/20 opacity-60">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  More Coming Soon
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 mb-4">
                  More special features to explore our love story
                </p>
              </div>
              <Button variant="outline" disabled>
                Coming Soon
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

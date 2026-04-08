"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Gift, Snowflake } from "lucide-react"

export function ClosingSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("closing-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const createSnowflake = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setHearts((prev) => [...prev, { id, x, y }])

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id))
    }, 2000)
  }

  return (
    <section id="closing-section" className="relative py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-red-600 to-green-600 dark:from-red-700 dark:to-green-700 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      {/* Christmas gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-600/90 via-red-600/80 to-green-600/90 dark:from-red-700/90 dark:via-red-700/80 dark:to-green-700/90 pointer-events-none" />

      <div
        className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex justify-center gap-4 mb-6 sm:mb-8">
          <Gift className="text-white animate-bounce" size={48} style={{ animationDelay: '0s' }} />
          <Snowflake className="text-white animate-spin" size={48} style={{ animationDuration: '3s' }} />
          <Gift className="text-white animate-bounce" size={48} style={{ animationDelay: '0.2s' }} />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 text-balance px-2 sm:px-0">
          Merry Christmas, My Love!
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-10 md:mb-12 leading-relaxed text-balance px-2 sm:px-0">
          This Christmas and every day, I'm forever grateful for you. You deserve all the joy and magic in the world, and I promise to keep showing you how much you mean to me, every single day.
        </p>
        <Button
          size="lg"
          onClick={createSnowflake}
          className="bg-white text-red-600 hover:bg-white/90 dark:bg-white dark:text-red-600 dark:hover:bg-white/90 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Merry Christmas! 🎄❄️🎁
        </Button>
      </div>

      {/* Click snowflakes and hearts animation */}
      {hearts.map((heart, index) => {
        const Icon = index % 2 === 0 ? Snowflake : Heart
        return (
          <Icon
            key={heart.id}
            className="absolute text-white animate-heart-float pointer-events-none z-20"
            style={{
              left: heart.x,
              top: heart.y,
              transform: 'translate(-50%, -50%)',
            }}
            size={28}
            fill={index % 2 === 0 ? "none" : "currentColor"}
          />
        )
      })}

      <style jsx>{`
        @keyframes heart-float {
          0% {
            transform: translate(-50%, -50%) translateY(0) scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) translateY(-75px) scale(1.2) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) translateY(-150px) scale(1.5) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-heart-float {
          animation: heart-float 2s ease-out forwards;
        }
        
        @media (max-width: 640px) {
          .animate-heart-float {
            animation-duration: 1.5s;
          }
        }
      `}</style>
    </section>
  )
}

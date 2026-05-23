"use client"

import { useEffect, useState } from "react"
import { Sparkles, Heart, Trophy, Cake } from "lucide-react"

export function Celebration200Section() {
  const [isVisible, setIsVisible] = useState(false)
  const [confettiCount, setConfettiCount] = useState(20)

  useEffect(() => {
    setIsVisible(true)
    // Set confetti count based on window width
    const count = typeof window !== "undefined" && window.innerWidth < 768 ? 10 : 20
    setConfettiCount(count)
  }, [])

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden bg-linear-to-b from-purple-50 via-pink-50 to-purple-50 dark:from-purple-950/20 dark:via-background dark:to-purple-950/20 py-8 sm:py-12 md:py-20">
      {/* Animated confetti background - reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(confettiCount)].map((_, i) => (
          <div
            key={`confetti-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `bounce ${2 + Math.random() * 2}s infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Sparkles className="text-purple-400 dark:text-purple-300 opacity-60" size={16} />
            ) : i % 3 === 1 ? (
              <Heart className="text-pink-400 dark:text-pink-300 opacity-60" size={16} />
            ) : (
              <Cake className="text-yellow-400 dark:text-yellow-300 opacity-60" size={16} />
            )}
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />

      <div
        className={`relative z-10 w-full text-center px-3 sm:px-4 md:px-8 transition-all duration-1000 max-w-4xl mx-auto ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Trophy Icon */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center">
          <div className="relative inline-block">
            <Trophy className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-yellow-500 dark:text-yellow-400 animate-bounce" />
            <Sparkles className="absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-500 dark:text-purple-400 animate-spin" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4 bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent animate-pulse leading-tight">
          200 Days
        </h1>
        <p className="text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
          of Amazing Moments Together
        </p>

        {/* Celebration Message */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2 sm:px-0">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-4 sm:mb-6">
            We've reached this incredible milestone! 200 days of laughter, love, and unforgettable memories. 💜
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Here's to many more days of celebrating together, creating new adventures, and cherishing every moment with you.
          </p>
        </div>

        {/* Decorative Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-12 px-2 sm:px-0">
          <div className="p-4 sm:p-6 rounded-lg bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-purple-200 dark:border-purple-700 hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 dark:text-pink-400 mx-auto mb-2 sm:mb-3" />
            <h3 className="font-semibold text-sm sm:text-base text-purple-700 dark:text-purple-300 mb-1 sm:mb-2">200 Days</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">of love and laughter</p>
          </div>
          <div className="p-4 sm:p-6 rounded-lg bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-pink-200 dark:border-pink-700 hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 dark:text-yellow-400 mx-auto mb-2 sm:mb-3" />
            <h3 className="font-semibold text-sm sm:text-base text-pink-700 dark:text-pink-300 mb-1 sm:mb-2">Countless</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">unforgettable memories</p>
          </div>
          <div className="p-4 sm:p-6 rounded-lg bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-purple-200 dark:border-purple-700 hover:scale-105 transition-transform">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 dark:text-yellow-500 mx-auto mb-2 sm:mb-3" />
            <h3 className="font-semibold text-sm sm:text-base text-purple-700 dark:text-purple-300 mb-1 sm:mb-2">Forever</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">and beyond together</p>
          </div>
        </div>

        {/* Celebration CTA */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">Here's to us! 🎉💜</p>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  )
}

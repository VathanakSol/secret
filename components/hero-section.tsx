"use client"

import { useEffect, useState } from "react"
import { Snowflake, Star } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-red-50 via-white to-green-50 dark:from-red-950/20 dark:via-background dark:to-green-950/20">
      {/* Enhanced floating snowflakes and stars animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Snowflake
            key={`snow-${i}`}
            className="absolute text-blue-300/40 dark:text-blue-400/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${5 + Math.random() * 4}s`,
            }}
            size={15 + Math.random() * 20}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <Star
            key={`star-${i}`}
            className="absolute text-yellow-300/50 dark:text-yellow-400/40 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
            size={12 + Math.random() * 15}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Christmas gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-green-500/5 pointer-events-none" />

      <div
        className={`relative z-10 text-center px-4 sm:px-6 md:px-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Girlfriend's Image */}
        <div className="mt-4 sm:mt-6 md:mt-8 mb-6 sm:mb-8 md:mb-10 flex justify-center">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-2 sm:border-4 border-red-500 dark:border-red-400 ring-2 sm:ring-4 ring-green-500/30 dark:ring-green-400/30">
            <Image
              src="/gf.jpg"
              alt="My Beautiful Girlfriend"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold bg-gradient-to-r from-red-600 to-green-600 dark:from-red-400 dark:to-green-400 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 text-balance leading-tight px-4">
          Merry Christmas!
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-foreground/80 max-w-2xl mx-auto text-balance px-4 sm:px-6 leading-relaxed">
          A special Christmas surprise just for you, my love ❄️🎄
        </p>
        <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🎄</span>
          <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>❄️</span>
          <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎁</span>
        </div>

        {/* Video Preview */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 max-w-4xl mx-auto w-full px-3 sm:px-4">
          <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-red-500 dark:border-red-400 ring-2 sm:ring-4 ring-green-500/30 dark:ring-green-400/30 bg-black/50 backdrop-blur-sm">
            <video
              src="/gf.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] object-contain pointer-events-none"
              preload="auto"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-foreground/70 italic px-2">
            A special moment captured just for you 🎥✨
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(-100vh) rotate(180deg) scale(1.2);
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) rotate(360deg) scale(0.8);
          }
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
        .animate-twinkle {
          animation: twinkle 2s infinite ease-in-out;
        }
        
        /* Hide video controls */
        video::-webkit-media-controls {
          display: none !important;
        }
        video::-webkit-media-controls-enclosure {
          display: none !important;
        }
        video::-webkit-media-controls-panel {
          display: none !important;
        }
        video::-webkit-media-controls-play-button {
          display: none !important;
        }
        video::-webkit-media-controls-current-time-display {
          display: none !important;
        }
        video::-webkit-media-controls-time-remaining-display {
          display: none !important;
        }
        video::-webkit-media-controls-timeline {
          display: none !important;
        }
        video::-webkit-media-controls-volume-slider {
          display: none !important;
        }
        video::-webkit-media-controls-mute-button {
          display: none !important;
        }
        video::-webkit-media-controls-fullscreen-button {
          display: none !important;
        }
        
        @media (max-width: 640px) {
          .animate-float {
            animation-duration: 5s;
          }
        }
      `}</style>
    </section>
  )
}





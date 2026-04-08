"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Heart, Sparkles } from "lucide-react";
import Image from "next/image";

interface TimeCount {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

export function TimeCounterSection() {
  const [timeCount, setTimeCount] = useState<TimeCount>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  // Relationship start date: November 5th, 2025
  const startDate = new Date("2025-11-05T00:00:00");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    const section = document.querySelector("[data-time-counter-section]");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      // Calculate total days
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

      // Calculate time components
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      // Calculate years, months, days
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let daysInMonth = now.getDate() - startDate.getDate();

      if (daysInMonth < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        daysInMonth += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      setTimeCount({
        years,
        months,
        days: daysInMonth,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
        totalDays,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-time-counter-section
      className="py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-red-50/50 dark:from-red-950/20 to-white dark:to-gray-950"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Our Time Together
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every moment with you is precious
          </p>
        </div>

        {/* Profile Photos */}
        <div
          className={`flex justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-14 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {/* Your Profile */}
          <div className="flex flex-col items-center group">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl border-2 sm:border-4 border-white dark:border-gray-800 ring-2 sm:ring-4 ring-red-500/20 group-hover:scale-105 transition-all duration-300">
              <Image
                src="/bf.jpg"
                alt="Me"
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">
              NAK
            </p>
          </div>

          {/* Heart Icon */}
          <div className="flex flex-col items-center px-2 sm:px-4 md:px-8">
            <div className="relative">
              <Heart
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-red-500 dark:text-red-400 animate-pulse"
                fill="currentColor"
              />
              
            </div>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
              Together
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
              {timeCount.totalDays} Days
            </p>
          </div>

          {/* Girlfriend's Profile */}
          <div className="flex flex-col items-center group">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl border-2 sm:border-4 border-white dark:border-gray-800 ring-2 sm:ring-4 ring-red-500/20 group-hover:scale-105 transition-all duration-300">
              <Image
                src="/gf.jpg"
                alt="You"
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">
              VON
            </p>
          </div>
        </div>

        {/* Anniversary Date Card */}
        <div
          className={`mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Card className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-white to-red-50/30 dark:from-gray-900 dark:to-red-950/20 border-2 border-red-200/50 dark:border-red-800/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-semibold uppercase tracking-wider mb-1">
                    We Started Dating
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-black dark:from-white dark:to-red-300 bg-clip-text text-transparent">
                    November 5th, 2025
                  </p>
                  <div className="mt-2 w-16 sm:w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto sm:mx-0"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Time Counter Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Card className="p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 dark:text-red-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {timeCount.years}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {timeCount.years === 1 ? "Year" : "Years"}
            </p>
          </Card>

          <Card className="p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {timeCount.months}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {timeCount.months === 1 ? "Month" : "Months"}
            </p>
          </Card>

          <Card className="p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {timeCount.days}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {timeCount.days === 1 ? "Day" : "Days"}
            </p>
          </Card>

          <Card className="p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {timeCount.hours}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {timeCount.hours === 1 ? "Hour" : "Hours"}
            </p>
          </Card>

          <Card className="p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {timeCount.minutes}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {timeCount.minutes === 1 ? "Minute" : "Minutes"}
            </p>
          </Card>

          <Card className="p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 dark:text-red-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {timeCount.seconds}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {timeCount.seconds === 1 ? "Second" : "Seconds"}
            </p>
          </Card>
        </div>

        {/* Love Message */}
        <div
          className={`transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Card className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10 border border-red-200 dark:border-red-800/30">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-red-500 mb-4 sm:mb-5 md:mb-6">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Every Second Counts
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-5 md:mb-6">
                Since November 5th, 2025, every moment with you has been a
                blessing. Time flies when I'm with you, but every second is
                treasured in my heart. Here's to many more years, months, days,
                hours, minutes, and seconds together!
              </p>
              <div className="flex justify-center items-center gap-2 sm:gap-3">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500 flex items-center justify-center animate-bounce"
                  style={{ animationDelay: "0s" }}
                >
                  <span className="text-white text-lg sm:text-xl">💑</span>
                </div>
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-400 flex items-center justify-center animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="text-white text-lg sm:text-xl">💕</span>
                </div>
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex items-center justify-center animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                >
                  <span className="text-white text-lg sm:text-xl">⏰</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

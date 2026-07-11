"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Heart, Sparkles, Target } from "lucide-react";
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

interface Milestone {
  date: Date;
  title: string;
  titleKh: string;
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
  const [isMounted, setIsMounted] = useState(false);

  // Relationship start date: November 5th, 2025
  const startDate = new Date("2025-11-05T00:00:00");

  // Milestone dates
  const milestones: Milestone[] = [
    { date: new Date("2026-11-05T00:00:00"), title: "1 Year", titleKh: "ឆ្នាំទី 1" },
    { date: new Date("2027-11-05T00:00:00"), title: "2 Years", titleKh: "ឆ្នាំទី 2" },
    { date: new Date("2028-11-05T00:00:00"), title: "3 Years", titleKh: "ឆ្នាំទី 3" },
    { date: new Date("2030-11-05T00:00:00"), title: "5 Years", titleKh: "ឆ្នាំទី 5" },
    { date: new Date("2035-11-05T00:00:00"), title: "10 Years", titleKh: "ឆ្នាំទី 10" },
  ];

  const [nextMilestone, setNextMilestone] = useState<Milestone>(milestones[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);

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

      // Calculate next milestone and progress
      const currentTime = now.getTime();
      let next = milestones[0];
      let prevMilestoneTime = startDate.getTime();

      for (const milestone of milestones) {
        if (currentTime < milestone.date.getTime()) {
          next = milestone;
          break;
        }
        prevMilestoneTime = milestone.date.getTime();
      }

      setNextMilestone(next);

      // Calculate progress percentage
      const totalDuration = next.date.getTime() - prevMilestoneTime;
      const elapsed = currentTime - prevMilestoneTime;
      const progressPercent = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
      setProgress(progressPercent);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-time-counter-section
      className="py-20 px-4 sm:px-6 md:px-8 dark:to-gray-950"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            ពេលវេលាជាមួយគ្នា
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            រាល់គ្រប់ពេលវេលាជាមួយគ្នាសុទ្ធតែមានតម្លៃ
          </p>
        </div>

        {/* Profile Photos */}
        <div
          className={`flex justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-14 md:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
        >
          {/* Your Profile */}
          <div className="flex flex-col items-center group">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl border-2 sm:border-4 border-white dark:border-gray-800 ring-2 sm:ring-4 ring-red-500/20 group-hover:scale-105 transition-all duration-300">
              <Image
                src="/nak.png"
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
              ស្រឡាញ់គ្នា
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
              {timeCount.totalDays} ថ្ងៃ
            </p>
          </div>

          {/* Girlfriend's Profile */}
          <div className="flex flex-col items-center group">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl border-2 sm:border-4 border-white dark:border-gray-800 ring-2 sm:ring-4 ring-red-500/20 group-hover:scale-105 transition-all duration-300">
              <Image
                src="/von.png"
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
          className={`mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
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
                    ពួកយើងបានទាក់ទងគ្នា
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-black dark:from-white dark:to-red-300 bg-clip-text text-transparent">
                    វិច្ឆិកា 5th, 2025
                  </p>
                  <div className="mt-2 w-16 sm:w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto sm:mx-0"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Milestone Progress Bar - Simplified */}
        <div
          className={`mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="text-center mb-3">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              ដំណើរទៅរក <span className="font-bold text-gray-900 dark:text-white">{nextMilestone.titleKh}</span>
            </p>
          </div>

          {/* Simple Progress Bar */}
          <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Text */}
          <div className="text-center mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            សម្រេចបាន {progress.toFixed(1)}% 
          </div>
        </div>

        {/* Time Counter Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <Card className="p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 dark:text-red-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {timeCount.years}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {timeCount.years === 1 ? "Year" : "ឆ្នាំ"}
            </p>
          </Card>

          <Card className="p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {timeCount.months}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {timeCount.months === 1 ? "Month" : "ខែ"}
            </p>
          </Card>

          <Card className="p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {timeCount.days}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {timeCount.days === 1 ? "Day" : "ថ្ងៃ"}
            </p>
          </Card>

          <Card className="p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {timeCount.hours}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {timeCount.hours === 1 ? "Hour" : "ម៉ោង"}
            </p>
          </Card>

          <Card className="p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {timeCount.minutes}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {timeCount.minutes === 1 ? "Minute" : "នាទី"}
            </p>
          </Card>

          <Card className="p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 dark:text-red-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {timeCount.seconds}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              {timeCount.seconds === 1 ? "Second" : "វិនាទី"}
            </p>
          </Card>
        </div>

        {/* Love Message */}
        <div
          className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <Card className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10 border border-red-200 dark:border-red-800/30">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-red-500 mb-4 sm:mb-5 md:mb-6">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                គ្រប់វិនាទីពិតជាមានតម្លៃ
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-5 md:mb-6">
                ចាប់តាំងពីថ្ងៃទី 5 ខែវិច្ឆិកា ឆ្នាំ 2025 មក គ្រប់ពេលវេលាជាមួយអ្នកគឺជាពរជ័យដ៏អស្ចារ្យបំផុត។
                ពេលវេលាកន្លងផុតទៅលឿនណាស់នៅពេលយើងនៅក្បែរគ្នា ប៉ុន្តែគ្រប់វិនាទីទាំងអស់ត្រូវបានចងចាំ
                និងថែរក្សាយ៉ាងមានតម្លៃនៅក្នុងបេះដូងរបស់ខ្ញុំ។ ជូនពរឱ្យពួកយើងមានឆ្នាំ ខែ ថ្ងៃ ម៉ោង នាទី
                និងវិនាទីជាច្រើនរាប់មិនអស់បន្តទៀតជាមួយគ្នា!
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
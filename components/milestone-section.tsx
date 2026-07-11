"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Heart, Sparkles, Star } from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  titleKh: string;
  date: Date;
  description: string;
  descriptionKh: string;
  icon: "star" | "heart" | "sparkles";
}

export function MilestoneSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Relationship start date: November 5th, 2025
  const startDate = new Date("2025-11-05T00:00:00");

  const milestones: Milestone[] = [
    {
      id: 1,
      title: "1 Year Together",
      titleKh: "ឆ្នាំទី 1 ជាមួយគ្នា",
      date: new Date("2026-11-05T00:00:00"),
      description: "Our first year of love and adventures",
      descriptionKh: "ឆ្នាំទីមួយនៃស្នេហ៍ និងដំណើររបស់យើង",
      icon: "star",
    },
    {
      id: 2,
      title: "2 Years Together",
      titleKh: "ឆ្នាំទី 2 ជាមួយគ្នា",
      date: new Date("2027-11-05T00:00:00"),
      description: "Two years of growing stronger together",
      descriptionKh: "ឆ្នាំទីពីរដែលកំពុងរីកចម្រើនជាមួយគ្នា",
      icon: "heart",
    },
    {
      id: 3,
      title: "3 Years Together",
      titleKh: "ឆ្នាំទី 3 ជាមួយគ្នា",
      date: new Date("2028-11-05T00:00:00"),
      description: "Three years of beautiful memories",
      descriptionKh: "ឆ្នាំទីបីនៃអនុស្សាវរីយ៍ភ្ពដ៏ស្រស់ស្អាត",
      icon: "sparkles",
    },
    {
      id: 4,
      title: "5 Years Together",
      titleKh: "ឆ្នាំទី 5 ជាមួយគ្នា",
      date: new Date("2030-11-05T00:00:00"),
      description: "Half a decade of love and commitment",
      descriptionKh: "ពាក់កណ្ដាលរយ:ពេលវេលានៃស្នេហ៍ និងការប្តេជ្ញាចិត្ត",
      icon: "star",
    },
    {
      id: 5,
      title: "10 Years Together",
      titleKh: "ឆ្នាំទី 10 ជាមួយគ្នា",
      date: new Date("2035-11-05T00:00:00"),
      description: "A decade of love, laughter, and life together",
      descriptionKh: "រយ:ពេលវេលានៃស្នេហ៍ ការលួងលោម និងជីវិតជាមួយគ្នា",
      icon: "heart",
    },
  ];

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

    const section = document.querySelector("[data-milestone-section]");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const getTimeUntilMilestone = (milestoneDate: Date) => {
    const now = new Date();
    const diff = milestoneDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { text: "✨ Reached!", textKh: "✨ បានឈានដល់ហើយ!", isReached: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      const remainingMonths = months % 12;
      return {
        text: `${years} year${years > 1 ? "s" : ""} ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`,
        textKh: `${years} ឆ្នាំ ${remainingMonths} ខែ`,
        isReached: false,
      };
    } else if (months > 0) {
      const remainingDays = days % 30;
      return {
        text: `${months} month${months > 1 ? "s" : ""} ${remainingDays} day${remainingDays > 1 ? "s" : ""}`,
        textKh: `${months} ខែ ${remainingDays} ថ្ងៃ`,
        isReached: false,
      };
    } else {
      return {
        text: `${days} day${days > 1 ? "s" : ""}`,
        textKh: `${days} ថ្ងៃ`,
        isReached: false,
      };
    }
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "heart":
        return <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="currentColor" />;
      case "sparkles":
        return <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />;
      case "star":
      default:
        return <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" fill="currentColor" />;
    }
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      "from-pink-500/10 to-red-500/10 dark:from-pink-500/20 dark:to-red-500/20",
      "from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20",
      "from-red-500/10 to-orange-500/10 dark:from-red-500/20 dark:to-orange-500/20",
      "from-rose-500/10 to-pink-500/10 dark:from-rose-500/20 dark:to-pink-500/20",
      "from-pink-500/10 to-purple-500/10 dark:from-pink-500/20 dark:to-purple-500/20",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section
      data-milestone-section
      className="py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-white dark:from-gray-950 to-red-50/30 dark:to-red-950/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-500 to-pink-500 mb-4 sm:mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
          >
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2
            className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            គោលដៅអនាគត
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            គោលដៅដ៏ស្រស់ស្អាតដែលយើងចង់បានជាមួយគ្នា
          </p>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {milestones.map((milestone, index) => {
            const timeUntil = getTimeUntilMilestone(milestone.date);
            return (
              <div
                key={milestone.id}
                className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card
                  className={`p-4 sm:p-6 md:p-8 bg-gradient-to-br ${getGradientClass(index)} border-2 border-red-200/50 dark:border-red-800/30 hover:shadow-2xl hover:scale-105 transition-all duration-500 group h-full relative overflow-hidden`}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

                  {/* Icon */}
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        {getIcon(milestone.icon)}
                      </div>
                    </div>
                  </div>

                  {/* Milestone Number */}
                  <div className="text-center mb-3 sm:mb-4">
                    <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-xs sm:text-sm font-semibold">
                      #{milestone.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-center mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                    {milestone.titleKh}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center mb-3 sm:mb-4 italic">
                    {milestone.title}
                  </p>

                  {/* Date */}
                  <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
                      {milestone.date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center mb-3 sm:mb-4 leading-relaxed">
                    {milestone.descriptionKh}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 text-center italic mb-4">
                    {milestone.description}
                  </p>

                  {/* Countdown or Reached Badge */}
                  <div className="flex justify-center">
                    <div
                      className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold ${timeUntil.isReached
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse"
                        : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                        }`}
                    >
                      {timeUntil.isReached ? (
                        <>
                          <span className="mr-1">🎉</span>
                          {timeUntil.text}
                        </>
                      ) : (
                        <>
                          <span className="mr-1">⏳</span>
                          {timeUntil.textKh}
                        </>
                      )}
                    </div>
                  </div>

                  
                </Card>
              </div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
}
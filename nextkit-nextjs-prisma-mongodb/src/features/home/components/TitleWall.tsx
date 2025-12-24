"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// 示例标题数据 - 展示不同平台的热门标题
const titleRows = [
  [
    "10 Life-Changing Morning Habits That Will Transform Your 2024",
    "Why Everyone's Talking About This New AI Tool",
    "I Tried the Viral TikTok Recipe and Here's What Happened",
    "The Ultimate Guide to Passive Income in 2024",
    "This Simple Trick Doubled My Productivity Overnight",
  ],
  [
    "You Won't Believe What Happened Next...",
    "The Secret Nobody Tells You About Success",
    "How I Made $10K in One Month (Step by Step)",
    "This Changed Everything I Knew About Marketing",
    "5 Minutes Daily for Life-Changing Results",
  ],
  [
    "The Truth About Social Media Algorithms in 2024",
    "I Quit My Job to Do This Full Time - Best Decision Ever",
    "Why Your Content Isn't Going Viral (And How to Fix It)",
    "The One Strategy That Actually Works",
    "From Zero to 100K Followers: My Honest Journey",
  ],
  [
    "Stop Doing This If You Want Real Growth",
    "The Biggest Mistake Most Creators Make",
    "How to 10x Your Engagement in 30 Days",
    "This Tool Changed My Entire Content Strategy",
    "The Psychology Behind Viral Content Explained",
  ],
];

interface TitleRowProps {
  titles: string[];
  direction?: "left" | "right";
  speed?: number;
  delay?: number;
}

function TitleRow({
  titles,
  direction = "left",
  speed = 30,
  delay = 0,
}: TitleRowProps) {
  const duplicatedTitles = [...titles, ...titles, ...titles];

  return (
    <div className="relative overflow-hidden py-2 sm:py-3">
      {/* Gradient overlays - 响应式宽度 */}
      <div className="absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-gray-900 via-blue-950/80 to-transparent sm:w-24 md:w-32"></div>
      <div className="absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l from-gray-900 via-blue-950/80 to-transparent sm:w-24 md:w-32"></div>

      <motion.div
        className="flex gap-3 whitespace-nowrap sm:gap-4 md:gap-6"
        animate={{
          x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
      >
        {duplicatedTitles.map((title, index) => (
          <div
            key={index}
            className="group cursor-pointer rounded-lg border border-blue-500/20 bg-gray-800/40 px-3 py-2 backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-gray-800/60 sm:px-4 sm:py-2.5 md:px-6 md:py-3"
          >
            <span className="text-xs text-gray-300 transition-colors group-hover:text-cyan-400 sm:text-sm md:text-base">
              {title}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TitleWall() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative flex h-full min-h-[300px] w-full flex-col justify-center space-y-2 overflow-hidden py-6 sm:min-h-[400px] sm:space-y-3 sm:py-8 md:min-h-[450px] md:space-y-4 md:py-10 lg:min-h-[500px] lg:py-12">
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10"></div>

      {/* Central highlight */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-blue-500/5 blur-3xl sm:h-80 sm:w-80 md:h-96 md:w-96"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.8 }}
        className="relative w-full overflow-hidden"
      >
        <TitleRow titles={titleRows[0]} direction="left" speed={40} delay={0} />
        <TitleRow
          titles={titleRows[1]}
          direction="right"
          speed={35}
          delay={0.5}
        />
        <TitleRow titles={titleRows[2]} direction="left" speed={45} delay={1} />
        <TitleRow
          titles={titleRows[3]}
          direction="right"
          speed={38}
          delay={1.5}
        />
      </motion.div>

      {/* Center overlay with stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="xs:scale-75 pointer-events-auto scale-[0.65] rounded-2xl border border-blue-500/30 bg-gray-900/95 px-4 py-3 shadow-2xl shadow-blue-500/20 backdrop-blur-xl sm:scale-100 md:px-8 md:py-6">
          <div className="space-y-1 text-center md:space-y-2">
            <div className="text-[10px] tracking-wider text-cyan-400 uppercase md:text-sm">
              Live Title Analysis
            </div>
            <div className="text-2xl text-white md:text-4xl">500K+</div>
            <div className="text-[10px] text-gray-400 md:text-sm">
              Viral Titles Analyzed
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
              <div className="animation-delay-200 h-2 w-2 animate-pulse rounded-full bg-blue-400"></div>
              <div className="animation-delay-400 h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Corner badges - 响应式位置和大小 */}
      <div className="absolute top-1 left-1 z-20 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 sm:top-2 sm:left-2 sm:px-3 sm:py-1.5 md:top-4 md:left-4">
        <span className="text-[9px] text-cyan-400 sm:text-[10px] md:text-xs">
          🔥 Trending Now
        </span>
      </div>
      <div className="absolute top-1 right-1 z-20 rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-1 sm:top-2 sm:right-2 sm:px-3 sm:py-1.5 md:top-4 md:right-4">
        <span className="text-[9px] text-blue-400 sm:text-[10px] md:text-xs">
          ✨ AI-Powered
        </span>
      </div>
    </div>
  );
}

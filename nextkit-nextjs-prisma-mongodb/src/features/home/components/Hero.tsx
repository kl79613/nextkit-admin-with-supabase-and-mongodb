import { ArrowRight, Sparkles, TrendingUp, Target } from "lucide-react";
import TitleWall from "./TitleWall";
import Link from "next/link";
import ScrollButton from "./ScrollButton";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-black"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 rounded-full bg-blue-600 opacity-10 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 sm:px-6 md:px-8 lg:px-8 lg:py-32">
        <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="space-y-6 sm:space-y-7 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-3 py-1.5 text-cyan-400 shadow-lg shadow-blue-500/10 sm:px-4 sm:py-2">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">
                AI-Powered Content Intelligence
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Create{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  90th-Percentile
                </span>{" "}
                Content in Minutes
              </h1>

              <p className="text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl lg:text-2xl">
                AI-powered title, tag, and content direction generation based on
                {"  "}
                <span className="break-normal text-cyan-400">
                  real-time trends
                </span>{" "}
                and{" "}
                <span className="text-blue-400">your past top performers</span>.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="flex items-start gap-2.5 rounded-xl border border-gray-700/50 bg-gray-800/40 p-3 backdrop-blur-sm sm:gap-3 sm:p-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 sm:h-10 sm:w-10">
                  <TrendingUp className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </div>
                <div>
                  <div className="text-sm text-white sm:text-base">
                    Real-Time Trends
                  </div>
                  <div className="text-xs text-gray-400 sm:text-sm">
                    Live viral content analysis
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-gray-700/50 bg-gray-800/40 p-3 backdrop-blur-sm sm:gap-3 sm:p-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/30 sm:h-10 sm:w-10">
                  <Target className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </div>
                <div>
                  <div className="text-sm text-white sm:text-base">
                    Your DNA
                  </div>
                  <div className="text-xs text-gray-400 sm:text-sm">
                    Learns from your hits
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4 sm:pt-4">
              <Link
                href="/titleAi"
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm text-white transition-all hover:shadow-2xl hover:shadow-blue-500/50 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Link>

              <ScrollButton
                targetId="features"
                className="w-full rounded-xl border-2 border-gray-700 bg-gray-800/80 px-6 py-3 text-sm text-white backdrop-blur-sm transition-all hover:border-cyan-500 hover:bg-gray-800 hover:shadow-lg hover:shadow-cyan-500/20 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                See How It Works
              </ScrollButton>
            </div>

            {/* Social Proof Stats */}
            <div className="flex flex-wrap items-center gap-6 border-t border-gray-800 pt-6 sm:gap-8 sm:pt-8">
              <div>
                <div className="text-2xl text-white sm:text-3xl">10K+</div>
                <div className="text-xs text-gray-400 sm:text-sm">
                  Active Creators
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-2xl text-transparent sm:text-3xl">
                  500K+
                </div>
                <div className="text-xs text-gray-400 sm:text-sm">
                  Viral Titles Generated
                </div>
              </div>
              <div>
                <div className="text-2xl text-white sm:text-3xl">2.5x</div>
                <div className="text-xs text-gray-400 sm:text-sm">
                  Avg. CTR Boost
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Title Wall */}
          <div className="relative order-first lg:order-last">
            <div className="relative h-[300px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-blue-950/50 shadow-2xl ring-1 shadow-blue-500/20 ring-blue-500/30 backdrop-blur-sm sm:h-[400px] lg:h-auto">
              <TitleWall />
            </div>

            {/* Floating Performance Card */}
            <div className="absolute bottom-2 left-2 rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-3 shadow-2xl shadow-cyan-500/30 backdrop-blur-xl sm:bottom-4 sm:left-4 sm:p-4 md:-bottom-6 md:-left-6 md:p-5">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50 sm:h-12 sm:w-12 md:h-14 md:w-14">
                  <span className="text-lg sm:text-xl md:text-2xl">🎯</span>
                </div>
                <div>
                  <div className="text-[10px] tracking-wider text-gray-400 uppercase sm:text-xs">
                    Content Score
                  </div>
                  <div className="text-xl text-white sm:text-2xl md:text-3xl">
                    90th
                  </div>
                  <div className="text-[10px] text-cyan-400 sm:text-xs">
                    Percentile
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trend Indicator */}
            <div className="absolute top-2 right-2 rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500 to-blue-500 px-3 py-2 shadow-2xl shadow-cyan-500/50 sm:top-4 sm:right-4 sm:px-4 sm:py-2.5 md:-top-4 md:-right-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white sm:h-2 sm:w-2"></div>
                <span className="text-xs text-white sm:text-sm">
                  Live Analysis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

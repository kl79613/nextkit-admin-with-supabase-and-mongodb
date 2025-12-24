"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

const creators = [
  {
    name: "Sarah Chen",
    role: "YouTube Creator",
    avatar: "👩‍🦰",
    rating: 5,
    testimonial:
      "Title Lab helped me increase my CTR by 3x. The AI really understands what makes viewers click!",
  },
  {
    name: "Marcus Johnson",
    role: "TikTok Influencer",
    avatar: "👨‍🦱",
    rating: 5,
    testimonial:
      "I save hours every week on brainstorming titles. This tool is a game-changer for creators.",
  },
  {
    name: "Elena Rodriguez",
    role: "Instagram Creator",
    avatar: "👩‍🦳",
    rating: 5,
    testimonial:
      "The personalized suggestions based on my previous viral posts are incredibly accurate.",
  },
  {
    name: "David Kim",
    role: "Content Strategist",
    avatar: "👨‍💼",
    rating: 5,
    testimonial:
      "Best investment for my content business. The ROI has been phenomenal.",
  },
  {
    name: "Priya Patel",
    role: "LinkedIn Creator",
    avatar: "👩‍💻",
    rating: 5,
    testimonial:
      "Finally, an AI tool that actually understands professional content nuances.",
  },
  {
    name: "Alex Thompson",
    role: "Multi-Platform Creator",
    avatar: "👨‍🎤",
    rating: 5,
    testimonial:
      "Works seamlessly across all my platforms. Consistent quality every time.",
  },
];

export default function TrustSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl text-white">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              10,000+ Creators
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Join thousands of content creators who've amplified their reach
          </p>
        </div>

        {/* Scrolling Testimonials */}
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden"
            style={{ scrollBehavior: "auto" }}
          >
            {/* Duplicate the array to create seamless loop */}
            {[...creators, ...creators].map((creator, index) => (
              <div
                key={index}
                className="w-[280px] flex-shrink-0 rounded-xl border border-gray-800 bg-gray-900 p-6 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 sm:w-80"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-2xl ring-2 ring-blue-500/30">
                    {creator.avatar}
                  </div>
                  <div>
                    <div className="text-white">{creator.name}</div>
                    <div className="text-sm text-gray-400">{creator.role}</div>
                  </div>
                </div>
                <div className="mb-3 flex gap-1">
                  {[...Array(creator.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-cyan-400 text-cyan-400"
                    />
                  ))}
                </div>
                <p className="leading-relaxed text-gray-300">
                  "{creator.testimonial}"
                </p>
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent"></div>
        </div>

        {/* Platform Logos */}
        <div className="mt-16 text-center">
          <p className="mb-8 text-sm text-gray-500">
            Supporting creators across all major platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
            {/* YouTube */}
            <div className="flex items-center gap-2">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fill="#FF0000"
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </svg>
              <span className="text-lg text-gray-400">YouTube</span>
            </div>

            {/* TikTok */}
            <div className="flex items-center gap-2">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                  fill="#00F2EA"
                />
                <path
                  d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                  fill="#FF0050"
                  transform="translate(0.5, 0.5)"
                />
              </svg>
              <span className="text-lg text-gray-400">TikTok</span>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-2">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <linearGradient
                  id="instagram-gradient"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" style={{ stopColor: "#FD5949" }} />
                  <stop offset="50%" style={{ stopColor: "#D6249F" }} />
                  <stop offset="100%" style={{ stopColor: "#285AEB" }} />
                </linearGradient>
                <path
                  fill="url(#instagram-gradient)"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                />
              </svg>
              <span className="text-lg text-gray-400">Instagram</span>
            </div>

            {/* X (Twitter) */}
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fill="#E7E9EA"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
              <span className="text-lg text-gray-400">X</span>
            </div>

            {/* Facebook */}
            <div className="flex items-center gap-2">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fill="#1877F2"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              <span className="text-lg text-gray-400">Facebook</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

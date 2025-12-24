import {
  Sparkles,
  Globe,
  Lightbulb,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Sparkles,
    title: "AI Smart Title Generation",
    description:
      "Generate multiple title versions in one click, dramatically improving your content creation efficiency.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Multi-Platform Support",
    description:
      "Optimized for YouTube, TikTok, Instagram, X, LinkedIn and all major content platforms.",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: Lightbulb,
    title: "Multiple Tone Styles",
    description:
      "Choose from recommended, question-based, suspenseful, and various other style combinations.",
    gradient: "from-blue-600 to-indigo-500",
  },
  {
    icon: TrendingUp,
    title: "Trend Wall Analysis",
    description:
      "Combines real-time trending data from all platforms to generate titles that align with hot topics.",
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    icon: User,
    title: "Personalized Style Learning",
    description:
      "Learns from your historical viral content to understand and replicate your unique creative style.",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Zap,
    title: "Instant Optimization",
    description:
      "Real-time feedback on title performance with viral score predictions and improvement suggestions.",
    gradient: "from-cyan-500 to-blue-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-gray-900 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Core Features</span>
          </div>
          <h2 className="mb-6 text-4xl text-white lg:text-5xl">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Go Viral
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            Powerful AI-driven tools designed to help content creators produce
            90th-percentile titles and topics in minutes.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl border border-gray-700 bg-gray-800 p-8 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div
                  className={`h-14 w-14 bg-gradient-to-br ${feature.gradient} mb-6 flex items-center justify-center rounded-xl shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-xl text-white">{feature.title}</h3>
                <p className="leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col gap-4 sm:flex-row">
            <Link
              href="/auth/login"
              className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-white transition-all hover:shadow-xl hover:shadow-blue-500/50"
            >
              Try All Features Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import { FileText, Settings, Sparkles, Copy } from "lucide-react";
import Link from "next/link";
const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Input Content Brief",
    description:
      "Describe your content topic or paste your video script. The more context you provide, the better the results.",
  },
  {
    icon: Settings,
    number: "02",
    title: "Select Platform & Tone",
    description:
      "Choose your target platform and preferred tone style - whether it's engaging, professional, or provocative.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Generate Multiple Titles",
    description:
      "AI instantly generates dozens of optimized titles with viral score predictions for each variation.",
  },
  {
    icon: Copy,
    number: "04",
    title: "Save & Publish",
    description:
      "Bookmark your favorites and copy them directly to your publishing tools with one click.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="explore"
      className="bg-gradient-to-br from-black via-gray-900 to-blue-950 py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-cyan-400">
            <span className="text-sm">Simple Process</span>
          </div>
          <h2 className="mb-6 text-4xl text-white lg:text-5xl">
            How{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            From idea to viral title in four simple steps. Start creating better
            content in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-20 left-1/2 -z-10 hidden h-0.5 w-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30 lg:block"></div>
                )}

                <div className="rounded-2xl border border-gray-700 bg-gray-800 p-8 transition-all hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm text-white shadow-lg shadow-blue-500/50">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 ring-2 ring-blue-500/30">
                    <Icon className="h-8 w-8 text-cyan-400" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl text-white">{step.title}</h3>
                  <p className="leading-relaxed text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 px-4 text-center sm:px-0">
          <Link
            href="/titleAi"
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-white transition-all hover:shadow-xl hover:shadow-blue-500/20 sm:w-auto"
          >
            Start Creating Now →
          </Link>
        </div>
      </div>
    </section>
  );
}

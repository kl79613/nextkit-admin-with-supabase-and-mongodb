import Link from "next/link";
import { Sparkles } from "lucide-react";
import ScrollButton from "./ScrollButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex cursor-pointer items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl text-white">Title Lab</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 md:flex lg:gap-8">
            <ScrollButton
              targetId="home"
              className="cursor-pointer text-sm text-gray-300 transition-colors hover:text-cyan-400 lg:text-base"
            >
              Home
            </ScrollButton>
            <ScrollButton
              targetId="features"
              className="cursor-pointer text-sm text-gray-300 transition-colors hover:text-cyan-400 lg:text-base"
            >
              Feature
            </ScrollButton>
            <ScrollButton
              targetId="explore"
              className="cursor-pointer text-sm text-gray-300 transition-colors hover:text-cyan-400 lg:text-base"
            >
              Explore
            </ScrollButton>
            <ScrollButton
              targetId="pricing"
              className="cursor-pointer text-sm text-gray-300 transition-colors hover:text-cyan-400 lg:text-base"
            >
              Pricing
            </ScrollButton>
            <ScrollButton
              targetId="faq"
              className="cursor-pointer text-sm text-gray-300 transition-colors hover:text-cyan-400 lg:text-base"
            >
              FAQ
            </ScrollButton>
            <Link
              href=""
              className="cursor-pointer text-sm whitespace-nowrap text-gray-300 transition-colors hover:text-cyan-400 lg:text-base"
            >
              Help Center
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden items-center gap-2 md:flex lg:gap-3">
            <Link
              href="/auth/login"
              className="cursor-pointer px-3 py-2 text-sm whitespace-nowrap text-gray-300 transition-colors hover:text-white lg:px-4 lg:text-base"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="cursor-pointer rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm whitespace-nowrap text-white transition-all hover:shadow-lg hover:shadow-blue-500/50 lg:px-6 lg:text-base"
            >
              Sign up
            </Link>
          </div>

          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

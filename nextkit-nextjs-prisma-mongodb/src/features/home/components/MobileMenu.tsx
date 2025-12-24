"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 text-gray-300 hover:text-white md:hidden"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full border-b border-gray-800 bg-gray-900 py-4 md:hidden">
          <div className="flex flex-col gap-4 px-4">
            <button
              onClick={() => scrollToSection("home")}
              className="text-left text-gray-300 hover:text-cyan-400"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-left text-gray-300 hover:text-cyan-400"
            >
              Feature
            </button>
            <button
              onClick={() => scrollToSection("explore")}
              className="text-left text-gray-300 hover:text-cyan-400"
            >
              Explore
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-left text-gray-300 hover:text-cyan-400"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-left text-gray-300 hover:text-cyan-400"
            >
              FAQ
            </button>
            <Link href="/help" className="text-gray-300 hover:text-cyan-400">
              Help Center
            </Link>
            <div className="flex flex-col gap-2 border-t border-gray-800 pt-4">
              <Link
                href="/auth/login"
                className="rounded-lg border border-gray-700 px-4 py-2 text-center text-gray-300 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-center text-white shadow-lg shadow-blue-500/30"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

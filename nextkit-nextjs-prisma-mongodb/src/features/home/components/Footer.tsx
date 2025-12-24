import Link from "next/link";
import { Sparkles, Youtube, Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-black text-gray-400">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-white">Title Lab</span>
            </Link>
            <p className="mb-6 leading-relaxed text-gray-500">
              AI-powered title, tag, and content direction generation based on
              real-time trends and your past top performers — helping creators
              produce 90th-percentile content in minutes.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 transition-all hover:border-blue-500 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 transition-all hover:border-blue-500 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 transition-all hover:border-blue-500 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 transition-all hover:border-blue-500 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="mb-4 text-white">Explore</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  Title Generation Guides
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  Clickbait vs. Conversion
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  Creator Workflow & Efficiency
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  Content Format Breakdown
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  AI Creating & Future
                </a>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="mb-4 text-white">Information</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  User Agreement
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  Cookies Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  License Agreement
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cyan-400">
                  Subscription Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-600">
          <p>© {currentYear} Title Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

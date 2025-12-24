import { routeConfig } from "../../constants/route-config";
import { Metadata } from "next";
import Hero from "@/features/home/components/Hero";
import TrustSection from "@/features/home/components/TrustSection";
import Features from "@/features/home/components/Features";
import HowItWorks from "@/features/home/components/HowItWorks";
import Footer from "@/features/home/components/Footer";
import Header from "@/features/home/components/Header";

export const metadata: Metadata = {
  title: routeConfig.seo.title,
  description: routeConfig.seo.description,
  keywords: routeConfig.seo.keywords,
  openGraph: {
    title: routeConfig.seo.ogTitle,
    description: routeConfig.seo.ogDescription,
    url: routeConfig.seo.ogUrl,
    type: "website",
    images: [
      {
        url: routeConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: routeConfig.seo.ogTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: routeConfig.seo.twitterTitle,
    description: routeConfig.seo.twitterDescription,
    images: [routeConfig.seo.twitterImage],
  },
  alternates: {
    canonical: routeConfig.seo.canonical,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(routeConfig.seo.structuredData),
        }}
      />
      <div className="h-screen overflow-y-auto bg-black">
        <Header />
        <Hero />
        <TrustSection />
        <Features />
        <HowItWorks />
        <Footer />
      </div>
    </>
  );
}

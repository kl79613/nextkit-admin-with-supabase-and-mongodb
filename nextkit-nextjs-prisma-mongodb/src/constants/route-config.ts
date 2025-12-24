/**
 * 路由配置 - 用于页面 SEO 和元数据配置
 */

interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  canonical: string;
  structuredData: {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    url: string;
    logo?: string;
    sameAs?: string[];
    [key: string]: unknown;
  };
}

interface RouteConfig {
  seo: SEOConfig;
}

/**
 * 首页路由配置
 */
export const routeConfig: RouteConfig = {
  seo: {
    title: "NextKit - 现代化的 Next.js 管理后台模板",
    description:
      "NextKit 是一个基于 Next.js、Prisma 和 MongoDB 构建的现代化管理后台模板，提供完整的用户认证、数据管理和响应式设计。",
    keywords:
      "Next.js, Prisma, MongoDB, 管理后台, 后台模板, React, TypeScript, 企业级应用",
    ogTitle: "NextKit - 现代化的 Next.js 管理后台模板",
    ogDescription:
      "NextKit 是一个基于 Next.js、Prisma 和 MongoDB 构建的现代化管理后台模板，提供完整的用户认证、数据管理和响应式设计。",
    ogUrl: "https://your-domain.com/home",
    ogImage: "https://your-domain.com/images/og-image.jpg",
    twitterTitle: "NextKit - 现代化的 Next.js 管理后台模板",
    twitterDescription:
      "NextKit 是一个基于 Next.js、Prisma 和 MongoDB 构建的现代化管理后台模板，提供完整的用户认证、数据管理和响应式设计。",
    twitterImage: "https://your-domain.com/images/twitter-image.jpg",
    canonical: "https://your-domain.com/home",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "NextKit",
      description:
        "NextKit 是一个基于 Next.js、Prisma 和 MongoDB 构建的现代化管理后台模板，提供完整的用户认证、数据管理和响应式设计。",
      url: "https://your-domain.com/home",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "120",
      },
    },
  },
};

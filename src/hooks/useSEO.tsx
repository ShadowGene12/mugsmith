import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "product" | "article";
  noindex?: boolean;
  structuredData?: object | object[];
}

const DEFAULT_TITLE = "Mugsmith | India's First Story-Driven Mug Brand";
const DEFAULT_DESCRIPTION = "Discover premium ceramic mugs crafted around your exact workspace archetype. Take our highly accurate quiz to find your identity and secure early waitlist access.";
const DEFAULT_IMAGE = "https://mugsmith.lovable.app/og-image.jpg";
const BASE_URL = "https://mugsmith.lovable.app";

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  noindex = false,
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | Mugsmith` : DEFAULT_TITLE;
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Mugsmith" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((data, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(data)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )
      )}
    </Helmet>
  );
}

// Pre-defined SEO configs for each page
export const pageSEO = {
  home: {
    description: "Premium handcrafted ceramic mugs designed around 7 distinct workspace archetypes. Take our free quiz, uncover your true workspace identity, and secure your place on the drop waitlist.",
    keywords: "premium ceramic mugs India, luxury coffee mugs online, handcrafted mugs, personality mugs, workspace identity mugs, buy premium mugs online India, aesthetic desk mugs",
    url: "/",
  },
  quiz: {
    title: "Find Your Archetype — Free Workspace Identity Quiz",
    description: "Answer 8 behavioral questions about how you construct your days. We'll map your exact workspace archetype and grant you early waitlist access to your curated collection.",
    keywords: "workspace archetype quiz, mug personality test, which mug am I, find my workspace identity, premium coffee personality test",
    url: "/quiz",
  },
  about: {
    title: "Our Story — Why We Make Mugs That Mean Something",
    description: "Mugsmith is India's first personality-driven mug brand. We design premium ceramic mugs around how you work, think, and start your day. Learn why.",
    keywords: "about mugsmith, Indian mug brand, handcrafted ceramic mugs, premium mugs India, mugsmith story",
    url: "/about",
  },
  contact: {
    title: "Contact Us — We Reply Within 24 Hours",
    description: "Have a question about your Mugsmith order, shipping, or returns? Our team is based in Mumbai and responds within one business day.",
    keywords: "contact mugsmith, mugsmith support, mug order help, mugsmith customer service",
    url: "/contact",
  },
  faq: {
    title: "FAQ — Shipping, Returns & Broken Mug Promise",
    description: "Everything you need to know about Mugsmith: free shipping above ₹499, cash on delivery across India, 14-day returns, and our free replacement guarantee.",
    keywords: "mugsmith faq, mugsmith shipping, broken mug guarantee, cash on delivery mugs, mug returns India",
    url: "/faq",
  },
  gifting: {
    title: "Meaningful Mug Gifts — Matched to Their Personality",
    description: "Find the perfect mug gift for students, remote workers, creatives, and more. Personality-matched, gift-wrapped, and delivered across India.",
    keywords: "mug gifts India, coffee mug gift, gifts for remote workers, gifts for students, unique mug gifts, personality gifts",
    url: "/gifting",
  },
  workspaceIdentities: {
    title: "The 7 Mugsmith Archetypes — Find Yours",
    description: "The Builder, The Minimalist, The Nightshift, The Stoic, The Ritualist, The Romantic, or The Maverick? Discover the workspace archetype that defines you.",
    keywords: "workspace archetype, mug personality types, premium designer mugs, the builder mug, minimalist aesthetic mug",
    url: "/workspace-identities",
  },
  journal: {
    title: "The Journal — Morning Rituals, Desk Setups & Mug Stories",
    description: "Read about workspace rituals, desk aesthetics, gift guides, and the design stories behind Mugsmith's collections. Ideas for better mornings.",
    keywords: "morning ritual blog, desk aesthetic ideas, coffee mug guide, workspace inspiration, mug stories, study desk setup",
    url: "/journal",
  },
  community: {
    title: "The Mugsmith Community",
    description: "Join 50+ people who chose meaning over ordinary. Share your morning ritual, desk setup, and workspace identity with fellow Mugsmith owners.",
    keywords: "mugsmith community, coffee lovers India, morning ritual community, mug enthusiasts",
    url: "/community",
  },
  // Noindex pages
  checkout: {
    title: "Secure Checkout",
    description: "Complete your Mugsmith order. Cash on delivery available across India.",
    noindex: true,
    url: "/checkout",
  },
  thankYou: {
    title: "Thank You for Your Order",
    description: "Your Mugsmith order is confirmed. We'll email you tracking details shortly.",
    noindex: true,
    url: "/thank-you",
  },
  orderConfirmation: {
    title: "Order Confirmed",
    description: "Your Mugsmith order is on its way.",
    noindex: true,
    url: "/order-confirmation",
  },
  oto: {
    title: "Exclusive Offer — Just for You",
    description: "A one-time offer curated for your workspace identity.",
    noindex: true,
    url: "/curated-add-on",
  },
  notFound: {
    title: "Page Not Found",
    description: "This page doesn't exist. Head back to Mugsmith to find your perfect mug.",
    noindex: true,
    url: "/404",
  },
};

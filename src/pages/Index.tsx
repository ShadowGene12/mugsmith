import { Layout } from "@/components/layout/Layout";
import { SEO, pageSEO } from "@/hooks/useSEO";
import { HeroSection } from "@/components/home/HeroSection";
import { BestsellersSection } from "@/components/home/BestsellersSection";
import { IdentityStripSection } from "@/components/home/IdentityStripSection";
import { QuizFeatureSection } from "@/components/home/QuizFeatureSection";
import { RitualSection } from "@/components/home/RitualSection";
import { TrustReassuranceSection } from "@/components/home/TrustReassuranceSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { JournalPreviewSection } from "@/components/home/JournalPreviewSection";

export default function Index() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mugsmith",
    url: "https://mugsmith.lovable.app",
    logo: "https://mugsmith.lovable.app/favicon.ico",
    description: "India's first story-driven mug brand. Mugs crafted around your workspace identity.",
    sameAs: [
      "https://instagram.com/mugsmith.in",
      "https://pinterest.com/mugsmith"
    ],
  };

  return (
    <Layout>
      <SEO {...pageSEO.home} structuredData={organizationSchema} />
      <HeroSection />
      <BestsellersSection />
      <IdentityStripSection />
      <QuizFeatureSection />
      <RitualSection />
      <TrustReassuranceSection />
      <ReviewsSection />
      <JournalPreviewSection />
    </Layout>
  );
}

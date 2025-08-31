import { HeroSection } from "@/components/sections/Hero";
import { FeaturesSection } from "@/components/sections/Features";
import { HowItWorksSection } from "@/components/sections/HowItWorks";
import { FAQSection } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}

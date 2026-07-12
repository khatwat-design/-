import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { WhyUs } from "@/components/WhyUs";
import { HowItWorks } from "@/components/HowItWorks";
import { UsageSteps } from "@/components/UsageSteps";
import { PackageDuration } from "@/components/PackageDuration";
import { Audience } from "@/components/Audience";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <WhyUs />
        <HowItWorks />
        <UsageSteps />
        <PackageDuration />
        <Audience />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

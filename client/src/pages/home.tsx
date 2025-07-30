import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { NetworksSection } from "@/components/networks-section";
import { DashboardSection } from "@/components/dashboard-section";
import { WalletSection } from "@/components/wallet-section";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <NetworksSection />
      <DashboardSection />
      <WalletSection />
      <PricingSection />
      <Footer />
    </div>
  );
}

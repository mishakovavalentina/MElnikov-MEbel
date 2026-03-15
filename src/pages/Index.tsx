import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DirectionsSection from "@/components/DirectionsSection";
import WhyUsSection from "@/components/WhyUsSection";
import PortfolioFurniture from "@/components/PortfolioFurniture";
import PortfolioTextile from "@/components/PortfolioTextile";
import SunProtectionSection from "@/components/SunProtectionSection";
import ProcessSection from "@/components/ProcessSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactFormSection from "@/components/ContactFormSection";
import ContactsSection from "@/components/ContactsSection";
import FinalSection from "@/components/FinalSection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <DirectionsSection />
      <WhyUsSection />
      <PortfolioFurniture />
      <PortfolioTextile />
      <SunProtectionSection />
      <ProcessSection />
      <ReviewsSection />
      <ContactFormSection />
      <ContactsSection />
      <FinalSection />
    </main>
    <FooterSection />
  </>
);

export default Index;

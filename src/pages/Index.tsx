import { FloatingActions } from "@/components/floating/FloatingActions";
import { About } from "@/components/sections/About";
import { Amenities } from "@/components/sections/Amenities";
import { CTABand } from "@/components/sections/CTABand";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { Location } from "@/components/sections/Location";
import { Nearby } from "@/components/sections/Nearby";
import { Reviews } from "@/components/sections/Reviews";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyUs } from "@/components/sections/WhyUs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <WhyUs />
        <About />
        <Gallery />
        <Amenities />
        <Reviews />
        <Location />
        <Nearby />
        <InquiryForm />
        <CTABand />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Index;

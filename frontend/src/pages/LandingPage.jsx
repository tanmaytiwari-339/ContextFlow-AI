import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#010835]">

      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[#010835]" />

        <div className="absolute inset-0 bg-gradient-to-br from-[#010835] via-[#00175E] to-[#010835]" />

        <div className="absolute top-[-300px] left-[20%] w-[1000px] h-[1000px] bg-blue-700/15 blur-[200px] rounded-full" />

        <div className="absolute bottom-[-250px] right-[10%] w-[800px] h-[800px] bg-purple-700/15 blur-[200px] rounded-full" />

        <div className="absolute top-[20%] left-[40%] w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full" />

      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
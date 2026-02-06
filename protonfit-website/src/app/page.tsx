import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import LinesSection from '@/components/LinesSection';
import CallToActionSection from '@/components/CallToActionSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-pf-black min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LinesSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
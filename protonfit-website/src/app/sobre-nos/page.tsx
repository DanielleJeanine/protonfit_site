import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHeroSection from '@/components/about/AboutHeroSection';
import WhoWeAreSection from '@/components/about/WhoWeAreSection';
import MissionVisionSection from '@/components/about/MissionVisionSection';
import OurValuesSection from '@/components/about/OurValuesSection';
import OurCommitmentSection from '@/components/about/OurCommitmentSection';

export default function AboutUsPage() {
  return (
    <div className="bg-pf-black min-h-screen">
      <Header />
      <main>
        <AboutHeroSection />
        <WhoWeAreSection />
        <MissionVisionSection />
        <OurValuesSection />
        <OurCommitmentSection />
      </main>
      <Footer />
    </div>
  );
}
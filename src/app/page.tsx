import Header from '@/components/Header';
import HeroSection from './home/components/HeroSection';
import LogoBar from './home/components/LogoBar';
import CurriculumSection from './home/components/CurriculumSection';
import PricingSection from './home/components/PricingSection';
import DownloadSection from './home/components/DownloadSection';
import Footer from '@/components/Footer';
import TestimonialsSection from './home/components/TestimonialsSection';
import MobileStickyBar from './home/components/MobileStickyBar';

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <LogoBar />

      <CurriculumSection />
      <LogoBar />

      <TestimonialsSection />
      <LogoBar />

      <PricingSection />
      <LogoBar />

      <DownloadSection />
      <LogoBar />

      <Footer />
      <MobileStickyBar />
    </>
  );
}

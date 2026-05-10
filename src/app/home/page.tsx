import Header from '@/components/Header';
import HeroSection from './components/HeroSection';
import LogoBar from './components/LogoBar';
import CurriculumSection from './components/CurriculumSection';
import PricingSection from './components/PricingSection';
import DownloadSection from './components/DownloadSection';
import Footer from '@/components/Footer';
import TestimonialsSection from './components/TestimonialsSection';
import MobileStickyBar from './components/MobileStickyBar';

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
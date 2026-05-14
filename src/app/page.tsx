import Header from '@/components/Header';
import HeroSection from './home/components/HeroSection';
import LogoBar from './home/components/LogoBar';
import CurriculumSection from './home/components/CurriculumSection';
import HowWeWorkSection from './home/components/HowWeWorkSection';
import PricingSection from './home/components/PricingSection';
import TestimonialsSection from './home/components/TestimonialsSection';
import FAQSection from './home/components/FAQSection';
import DownloadSection from './home/components/DownloadSection';
import Footer from '@/components/Footer';
import MobileStickyBar from './home/components/MobileStickyBar';

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <LogoBar />

      <CurriculumSection />
      <LogoBar />

      <HowWeWorkSection />
      <LogoBar />

      <PricingSection />
      <LogoBar />

      <TestimonialsSection />
      <LogoBar />

      <FAQSection />
      <LogoBar />

      <DownloadSection />
      <LogoBar />

      <Footer />
      <MobileStickyBar />
    </>
  );
}

import Header from '@/components/Header';
import HeroSection from './home/components/HeroSection';
import LogoBar from './home/components/LogoBar';
import CurriculumSection from './home/components/CurriculumSection';
import HowWeWorkSection from './home/components/HowWeWorkSection';
import PricingSection from './home/components/PricingSection';
import WhyChooseSection from './home/components/WhyChooseSection';
import FAQSection from './home/components/FAQSection';
import DownloadSection from './home/components/DownloadSection';
import Footer from '@/components/Footer';
import MobileStickyBar from './home/components/MobileStickyBar';
import RevealReady from '@/components/RevealReady';

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <LogoBar announce />

      <CurriculumSection />
      <LogoBar />

      <HowWeWorkSection />
      <LogoBar />

      <PricingSection />
      <LogoBar />

      <WhyChooseSection />
      <LogoBar />

      <FAQSection />
      <LogoBar />

      <DownloadSection />

      <Footer />
      <MobileStickyBar />
      <RevealReady />
    </>
  );
}

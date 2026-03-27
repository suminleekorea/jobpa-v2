/* Home — JobPA v2 "Momentum" design
   Sections: Navbar → Hero (asymmetric split) → Features (widget grid)
   → How It Works → About (founder story) → Jobs (20 matched)
   → Consulting (Mentree-style) → Classes → FAQ → Footer
*/
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import JobsSection from '@/components/JobsSection';
import ConsultingSection from '@/components/ConsultingSection';
import ClassesSection from '@/components/ClassesSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ko'>('en');

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ko' : 'en');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar lang={lang} onLangToggle={toggleLang} />
      <main>
        <HeroSection lang={lang} />
        <FeaturesSection lang={lang} />
        <HowItWorksSection lang={lang} />
        <AboutSection lang={lang} />
        <JobsSection lang={lang} />
        <ConsultingSection lang={lang} />
        <ClassesSection lang={lang} />
        <FAQSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}

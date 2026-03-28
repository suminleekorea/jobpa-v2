/* Home — JobPA v2 "Momentum" design
   Sections: Navbar → Hero (asymmetric split) → Features (widget grid)
   → How It Works → About (founder story) → Jobs (20 matched)
   → Consulting (Mentree-style) → Classes → FAQ → Footer

   Search state is lifted here so HeroSection search bar drives
   JobsSection's live JSearch API query in real time.
*/
import { useState, useCallback } from 'react';
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
import TelegramAlertSection, { TelegramFloatingCTA } from '@/components/TelegramAlertSection';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ko'>('en');
  // Lifted search query: hero search bar sets this, JobsSection consumes it
  const [searchQuery, setSearchQuery] = useState('jobs in singapore');

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ko' : 'en');

  const handleSearch = useCallback((query: string) => {
    const q = query.trim();
    // Append "singapore" if not already present to keep results relevant
    const finalQuery = q
      ? (q.toLowerCase().includes('singapore') ? q : `${q} jobs in singapore`)
      : 'jobs in singapore';
    setSearchQuery(finalQuery);
    // Scroll to jobs section
    setTimeout(() => {
      document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar lang={lang} onLangToggle={toggleLang} />
      <main>
        <HeroSection lang={lang} onSearch={handleSearch} />
        <FeaturesSection lang={lang} />
        <HowItWorksSection lang={lang} />
        <AboutSection lang={lang} />
        <JobsSection lang={lang} searchQuery={searchQuery} />
        <TelegramAlertSection lang={lang} />
        <ConsultingSection lang={lang} />
        <ClassesSection lang={lang} />
        <FAQSection lang={lang} />
      </main>
      <TelegramFloatingCTA lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}

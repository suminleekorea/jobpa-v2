/* Navbar — Momentum design: clean white bar, indigo CTA, language toggle */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X, Briefcase } from 'lucide-react';

interface NavbarProps {
  lang: 'en' | 'ko';
  onLangToggle: () => void;
}

const t = {
  en: {
    features: 'Features',
    demo: 'Live Demo',
    jobs: 'Job Search',
    consulting: 'Consulting',
    classes: 'Classes',
    about: 'Our Story',
    cta: 'Get Started Free',
    feedback: 'Give Feedback',
    hackathon: '🏆 Hackathon 2025',
  },
  ko: {
    features: '기능',
    demo: '라이브 데모',
    jobs: '공고 검색',
    consulting: '컨설팅',
    classes: '클래스',
    about: '우리 이야기',
    cta: '무료로 시작하기',
    feedback: '피드백 남기기',
    hackathon: '🏆 해커톤 2025',
  },
};

export default function Navbar({ lang, onLangToggle }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const tx = t[lang];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg gradient-indigo flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>
            Job<span className="text-indigo-600">PA</span>
          </span>
          <span className="text-xs text-muted-foreground font-medium hidden sm:block">취업비서</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollTo('features')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {tx.features}
          </button>
          <button onClick={() => scrollTo('demo')} className="text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            {tx.demo}
          </button>
          <button onClick={() => scrollTo('jobs')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {tx.jobs}
          </button>
          <button onClick={() => scrollTo('consulting')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {tx.consulting}
          </button>
          <button onClick={() => scrollTo('classes')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {tx.classes}
          </button>
          <button onClick={() => scrollTo('about')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {tx.about}
          </button>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onLangToggle}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
          >
            <Globe className="w-4 h-4" />
            {lang === 'en' ? 'KO' : 'EN'}
          </button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => window.open('https://forms.gle/ZxGFeRvE7qZ8yqVc9', '_blank')}
          >
            {tx.feedback}
          </Button>
          <Button
            size="sm"
            className="gradient-indigo text-white border-0 text-xs px-4"
            onClick={() => window.open('https://manus.im', '_blank')}
          >
            {tx.cta}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
          <button onClick={() => scrollTo('features')} className="text-sm font-medium text-left py-2">{tx.features}</button>
          <button onClick={() => scrollTo('demo')} className="text-sm font-bold text-amber-600 text-left py-2 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />{tx.demo}</button>
          <button onClick={() => scrollTo('jobs')} className="text-sm font-medium text-left py-2">{tx.jobs}</button>
          <button onClick={() => scrollTo('consulting')} className="text-sm font-medium text-left py-2">{tx.consulting}</button>
          <button onClick={() => scrollTo('classes')} className="text-sm font-medium text-left py-2">{tx.classes}</button>
          <button onClick={() => scrollTo('about')} className="text-sm font-medium text-left py-2">{tx.about}</button>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={onLangToggle}>
              <Globe className="w-3 h-3 mr-1" /> {lang === 'en' ? 'KO' : 'EN'}
            </Button>
            <Button size="sm" className="flex-1 gradient-indigo text-white border-0" onClick={() => window.open('https://manus.im', '_blank')}>
              {tx.cta}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

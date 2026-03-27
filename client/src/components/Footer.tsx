/* Footer + Feedback CTA + Google Form floating button */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus, X, Briefcase, ExternalLink, Star } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'ko';
}

const GOOGLE_FORM_URL = 'https://forms.gle/ZxGFeRvE7qZ8yqVc9';
// Correct embed URL (resolved from short URL redirect)
const GOOGLE_FORM_EMBED = 'https://docs.google.com/forms/d/e/1FAIpQLSeKkL8jCE2kv6C1FSxUim2f8NphiinzXEwEbypneB3PJXaBog/viewform?embedded=true';

const t = {
  en: {
    ctaTitle: 'Start Your Journey Today',
    ctaSub: 'Experience your personalized AI-powered career strategy for free.',
    ctaBtn: 'Get Started Free',
    feedbackBtn: 'Feedback',
    feedbackTitle: 'Share Your Feedback',
    feedbackSub: 'Help us improve JobPA for everyone.',
    feedbackOpenTab: 'Open form in new tab',
    footerTagline: 'Your AI-Powered Career Strategy Partner',
    links: {
      product: 'Product',
      features: 'Features',
      jobs: 'Job Search',
      consulting: 'Consulting',
      classes: 'Classes',
      company: 'Company',
      about: 'About',
      blog: 'Blog',
      hackathon: 'Manus Hackathon',
      support: 'Support',
      faq: 'FAQ',
      feedback: 'Feedback',
    },
    copyright: '© 2025 JobPA · Built with ❤️ for the Manus AI Hackathon, Singapore',
  },
  ko: {
    ctaTitle: '지금 바로 시작하세요',
    ctaSub: '무료로 AI 맞춤 취업 전략을 경험해보세요.',
    ctaBtn: '무료로 시작하기',
    feedbackBtn: '피드백',
    feedbackTitle: '피드백을 남겨주세요',
    feedbackSub: 'JobPA를 더 좋게 만드는 데 도움을 주세요.',
    feedbackOpenTab: '새 탭에서 폼 열기',
    footerTagline: 'AI 기반 취업 전략 파트너',
    links: {
      product: '제품',
      features: '기능',
      jobs: '공고 검색',
      consulting: '컨설팅',
      classes: '클래스',
      company: '회사',
      about: '소개',
      blog: '블로그',
      hackathon: 'Manus 해커톤',
      support: '지원',
      faq: '자주 묻는 질문',
      feedback: '피드백',
    },
    copyright: '© 2025 JobPA · Manus AI 해커톤 싱가포르를 위해 ❤️로 만들었습니다',
  },
};

export default function Footer({ lang }: FooterProps) {
  const tx = t[lang];
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* CTA Banner */}
      <section className="py-20 gradient-indigo relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663211657117/XyXF9nwvEAKm6iDk8jn2zg/jobpa-hero-bg-cMfBkWZCprqvfs3ARzuwiz.webp)` }}
        />
        <div className="container relative text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            {tx.ctaTitle}
          </h2>
          <p className="text-indigo-200 mb-8 max-w-md mx-auto">{tx.ctaSub}</p>
          <Button
            size="lg"
            className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-8 shadow-lg"
            onClick={() => window.open('https://manus.im', '_blank')}
          >
            {tx.ctaBtn}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg gradient-indigo flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Job<span className="text-indigo-400">PA</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed">{tx.footerTagline}</p>
              <div className="flex items-center gap-1.5 mt-3">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs text-amber-400 font-semibold">Manus AI Hackathon · Singapore 2025</span>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{tx.links.product}</h4>
              <ul className="flex flex-col gap-2 text-xs">
                <li><button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">{tx.links.features}</button></li>
                <li><button onClick={() => scrollTo('jobs')} className="hover:text-white transition-colors">{tx.links.jobs}</button></li>
                <li><button onClick={() => scrollTo('consulting')} className="hover:text-white transition-colors">{tx.links.consulting}</button></li>
                <li><button onClick={() => scrollTo('classes')} className="hover:text-white transition-colors">{tx.links.classes}</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{tx.links.company}</h4>
              <ul className="flex flex-col gap-2 text-xs">
                <li>
                  <a href="https://manus.im" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    {tx.links.about} <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://manus.im" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {tx.links.hackathon}
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{tx.links.support}</h4>
              <ul className="flex flex-col gap-2 text-xs">
                <li><button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">{tx.links.faq}</button></li>
                <li>
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    {tx.links.feedback} <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 text-center text-xs">
            {tx.copyright}
          </div>
        </div>
      </footer>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setFeedbackOpen(!feedbackOpen)}
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold text-sm ${
          feedbackOpen ? 'bg-slate-700' : 'gradient-indigo'
        }`}
      >
        {feedbackOpen ? <X className="w-4 h-4" /> : <MessageSquarePlus className="w-4 h-4" />}
        {feedbackOpen ? 'Close' : tx.feedbackBtn}
      </button>

      {/* Feedback Form Panel */}
      {feedbackOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-[340px] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up">
          {/* Panel Header */}
          <div className="gradient-indigo px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{tx.feedbackTitle}</p>
              <p className="text-indigo-200 text-xs">{tx.feedbackSub}</p>
            </div>
            <button onClick={() => setFeedbackOpen(false)} className="text-indigo-200 hover:text-white transition-colors ml-3">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Google Form iframe */}
          <div style={{ height: '480px' }} className="overflow-hidden">
            <iframe
              src={GOOGLE_FORM_EMBED}
              width="100%"
              height="480"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="JobPA Feedback Form"
              className="w-full"
            >
              Loading…
            </iframe>
          </div>

          {/* Open in new tab */}
          <div className="px-4 py-2.5 border-t border-border bg-slate-50 text-center">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 font-semibold hover:underline flex items-center justify-center gap-1"
            >
              {tx.feedbackOpenTab} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

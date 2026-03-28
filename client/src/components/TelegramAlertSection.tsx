/* TelegramAlertSection — Daily Job Alert subscription via Telegram
   Design: Momentum — indigo/amber accent, asymmetric card layout
   Features:
   - Prominent section between Jobs and Consulting
   - Floating bottom-left CTA badge (persistent across scroll)
   - Keyword + role input before redirecting to Telegram bot
   - EN/KO bilingual
*/
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Bell, Briefcase, Clock, Sparkles, ChevronRight, X, MessageCircle } from 'lucide-react';

interface TelegramAlertSectionProps {
  lang: 'en' | 'ko';
}

// Replace with the actual Telegram bot link once available
const TELEGRAM_BOT_URL = 'https://t.me/jobpa_bot';

const t = {
  en: {
    badge: 'Daily Job Alerts',
    title: 'Never Miss a',
    titleAccent: 'Perfect Match',
    sub: 'Get a curated digest of your top-matched Singapore jobs every morning — straight to your Telegram.',
    inputPlaceholder: 'Your target role (e.g. Product Manager)',
    cta: 'Subscribe via Telegram',
    ctaNote: 'Free · No spam · Unsubscribe anytime',
    feature1Title: 'Daily at 8 AM',
    feature1Sub: 'Morning digest, Singapore time',
    feature2Title: 'Top 5 Matches',
    feature2Sub: 'Ranked by interview probability',
    feature3Title: 'Multi-source',
    feature3Sub: 'MCF · LinkedIn · Indeed',
    sampleTitle: '🔔 JobPA Daily Digest',
    sampleDate: 'Today · 8:00 AM',
    sampleBody: 'Good morning! Here are your top 5 matches for **Product Manager** in Singapore:',
    sampleJob1: '1. Product Manager @ Grab — 87% interview prob.',
    sampleJob2: '2. Senior PM @ GovTech — 82% interview prob.',
    sampleJob3: '3. PM, Payments @ Shopee — 79% interview prob.',
    sampleFooter: '+ 2 more matches · View all →',
    // Floating CTA
    floatLabel: 'Get Daily Job Alerts',
    floatSub: 'Free via Telegram',
    // Modal
    modalTitle: 'Subscribe to Daily Job Alerts',
    modalSub: 'Enter your target role and we\'ll send you the top 5 matched Singapore jobs every morning.',
    modalInputLabel: 'Target Role',
    modalInputPlaceholder: 'e.g. Product Manager, Data Analyst...',
    modalCta: 'Open Telegram Bot',
    modalNote: 'You\'ll be redirected to @jobpa_bot on Telegram. Start the bot to activate your daily alerts.',
    modalClose: 'Cancel',
  },
  ko: {
    badge: '매일 공고 알림',
    title: '딱 맞는 공고를',
    titleAccent: '놓치지 마세요',
    sub: '매일 아침 싱가포르 맞춤 공고 TOP 5를 텔레그램으로 받아보세요.',
    inputPlaceholder: '원하는 직무 (예: 프로덕트 매니저)',
    cta: '텔레그램으로 구독하기',
    ctaNote: '무료 · 스팸 없음 · 언제든 구독 취소 가능',
    feature1Title: '매일 오전 8시',
    feature1Sub: '싱가포르 시간 기준',
    feature2Title: 'TOP 5 매칭',
    feature2Sub: '인터뷰 확률 순 정렬',
    feature3Title: '멀티소스',
    feature3Sub: 'MCF · LinkedIn · Indeed',
    sampleTitle: '🔔 JobPA 데일리 다이제스트',
    sampleDate: '오늘 · 오전 8:00',
    sampleBody: '좋은 아침이에요! **프로덕트 매니저** 싱가포르 TOP 5 매칭 공고예요:',
    sampleJob1: '1. Product Manager @ Grab — 인터뷰 확률 87%',
    sampleJob2: '2. Senior PM @ GovTech — 인터뷰 확률 82%',
    sampleJob3: '3. PM, Payments @ Shopee — 인터뷰 확률 79%',
    sampleFooter: '+ 2개 더 보기 →',
    floatLabel: '매일 공고 알림 받기',
    floatSub: '텔레그램 무료',
    modalTitle: '매일 공고 알림 구독',
    modalSub: '원하는 직무를 입력하면 매일 아침 싱가포르 TOP 5 매칭 공고를 보내드려요.',
    modalInputLabel: '원하는 직무',
    modalInputPlaceholder: '예) 프로덕트 매니저, 데이터 분석가...',
    modalCta: '텔레그램 봇 열기',
    modalNote: '텔레그램 @jobpa_bot으로 이동합니다. 봇을 시작하면 매일 알림이 활성화돼요.',
    modalClose: '취소',
  },
};

function TelegramMockup({ tx }: { tx: typeof t.en }) {
  return (
    <div className="bg-[#1e2a3a] rounded-2xl p-4 shadow-2xl max-w-xs w-full font-sans">
      {/* Chat header */}
      <div className="flex items-center gap-3 pb-3 border-b border-white/10 mb-3">
        <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-white text-sm font-semibold">JobPA Bot</p>
          <p className="text-white/40 text-xs">@JobPABot</p>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400" />
      </div>

      {/* Message bubble */}
      <div className="bg-[#2b5278] rounded-xl rounded-tl-sm p-3 text-xs text-white leading-relaxed">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-[13px]">{tx.sampleTitle}</span>
          <span className="text-white/50 text-[10px]">{tx.sampleDate}</span>
        </div>
        <p className="text-white/80 mb-2">{tx.sampleBody.replace(/\*\*/g, '')}</p>
        <div className="space-y-1.5">
          {[tx.sampleJob1, tx.sampleJob2, tx.sampleJob3].map((job, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold flex-shrink-0">{i + 1}.</span>
              <span className="text-white/90">{job.replace(/^\d+\.\s/, '')}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-white/10 text-indigo-300 text-[11px] font-medium">
          {tx.sampleFooter}
        </div>
      </div>

      {/* Timestamp */}
      <div className="flex justify-end mt-1">
        <span className="text-white/30 text-[10px]">✓✓</span>
      </div>
    </div>
  );
}

// Floating CTA — bottom-left corner
export function TelegramFloatingCTA({ lang }: { lang: 'en' | 'ko' }) {
  const tx = t[lang];
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleSubscribe = () => {
    const query = role.trim() ? `?start=${encodeURIComponent(role)}` : '';
    window.open(`${TELEGRAM_BOT_URL}${query}`, '_blank');
    setShowModal(false);
  };

  if (dismissed) return null;

  return (
    <>
      {/* Floating badge */}
      <div
        className={`fixed bottom-24 left-4 z-40 transition-all duration-500 ${
          visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'
        }`}
      >
        <div className="bg-[#229ED9] rounded-2xl shadow-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-[#1a8bbf] transition-colors max-w-[220px]"
          onClick={() => setShowModal(true)}
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Send className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-bold leading-tight">{tx.floatLabel}</p>
            <p className="text-white/70 text-[10px]">{tx.floatSub}</p>
          </div>
          <button
            onClick={e => { e.stopPropagation(); setDismissed(true); }}
            className="text-white/50 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#229ED9] flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {tx.modalTitle}
                </h3>
                <p className="text-xs text-muted-foreground">{tx.modalSub}</p>
              </div>
            </div>

            {/* Input */}
            <label className="block text-xs font-semibold text-foreground mb-1.5">{tx.modalInputLabel}</label>
            <input
              type="text"
              value={role}
              onChange={e => setRole(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
              placeholder={tx.modalInputPlaceholder}
              className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[#229ED9] mb-4"
              autoFocus
            />

            {/* CTA */}
            <button
              onClick={handleSubscribe}
              className="w-full flex items-center justify-center gap-2 bg-[#229ED9] hover:bg-[#1a8bbf] text-white font-bold py-3 rounded-xl transition-colors mb-3"
            >
              <Send className="w-4 h-4" />
              {tx.modalCta}
            </button>

            {/* Note */}
            <p className="text-[11px] text-muted-foreground text-center mb-3 leading-relaxed">{tx.modalNote}</p>

            {/* Cancel */}
            <button
              onClick={() => setShowModal(false)}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              {tx.modalClose}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Main section
export default function TelegramAlertSection({ lang }: TelegramAlertSectionProps) {
  const tx = t[lang];
  const [role, setRole] = useState('');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const query = role.trim() ? `?start=${encodeURIComponent(role)}` : '';
    window.open(`${TELEGRAM_BOT_URL}${query}`, '_blank');
  };

  return (
    <section id="alerts" className="py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-indigo-400/20 blur-2xl" />
      </div>

      <div className="container relative">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* LEFT: Copy + Form */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 w-fit">
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-semibold text-white/90 tracking-wide">{tx.badge}</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl xl:text-5xl font-extrabold leading-[1.1] tracking-tight text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
              {tx.title}
              <br />
              <span className="text-amber-400">{tx.titleAccent}</span>
            </h2>

            <p className="text-indigo-200 text-lg leading-relaxed max-w-md">
              {tx.sub}
            </p>

            {/* Feature pills */}
            <div className="flex gap-4 flex-wrap">
              {[
                { icon: Clock, title: tx.feature1Title, sub: tx.feature1Sub },
                { icon: Sparkles, title: tx.feature2Title, sub: tx.feature2Sub },
                { icon: MessageCircle, title: tx.feature3Title, sub: tx.feature3Sub },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-center gap-2.5 bg-white/10 rounded-xl px-4 py-2.5">
                  <Icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <div>
                    <p className="text-white text-xs font-bold">{title}</p>
                    <p className="text-indigo-300 text-[10px]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Subscription form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="relative flex-1">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
                <input
                  type="text"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  placeholder={tx.inputPlaceholder}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
              <Button
                type="submit"
                className="bg-[#229ED9] hover:bg-[#1a8bbf] text-white border-0 px-5 rounded-xl font-bold shadow-lg whitespace-nowrap flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {tx.cta}
              </Button>
            </form>

            <p className="text-indigo-300 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              {tx.ctaNote}
            </p>
          </div>

          {/* RIGHT: Telegram mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#229ED9]/20 blur-3xl rounded-full scale-110" />
              <div className="relative">
                <TelegramMockup tx={tx} />
                {/* Floating notification dot */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow-lg animate-bounce">
                  <Bell className="w-3 h-3 text-amber-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

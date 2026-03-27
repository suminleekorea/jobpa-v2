/* AboutSection — Sumin's personal founder story
   Korean in Singapore, visa struggles, built JobPA for herself first.
   Design: split layout — left quote/story, right founder card + timeline
*/
import { useEffect, useRef, useState } from 'react';
import { Quote, MapPin, Heart, Sparkles, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  lang: 'en' | 'ko';
}

const t = {
  en: {
    badge: 'Our Story',
    headline: 'Built by Someone Who Lived It',
    subheadline: 'A Korean in Singapore, searching for a job with a visa to figure out.',
    story: [
      "When I moved to Singapore from Korea, I thought the hardest part would be finding the right job. I was wrong — the hardest part was figuring out which jobs I was even eligible for with my visa status, which companies sponsored Employment Passes, and how to tailor my resume for each application.",
      "I spent hours every day switching between MyCareersFuture, LinkedIn, Indeed, and company career pages — copy-pasting job descriptions, trying to understand ATS systems, and wondering why I wasn't getting callbacks despite being qualified.",
      "So I built JobPA — the AI career partner I wish I had. Not just a job board, but a strategic partner that understands your visa situation, matches you to the right roles, and helps you show up as your best self in every application.",
    ],
    quote: '"I wanted an AI that thinks with me, not just for me — like a career partner who knows my story."',
    quoteAuthor: 'Sumin Lee 이수민',
    quoteRole: 'Founder, JobPA · Korean in Singapore',
    timelineTitle: 'The Journey',
    timeline: [
      { year: '2023', event: 'Moved from Korea to Singapore on a Dependent Pass' },
      { year: '2024', event: 'Spent 3 months job hunting across 5 platforms daily' },
      { year: '2024', event: 'Built the first version of JobPA for personal use' },
      { year: '2025', event: 'Launched publicly — now helping thousands of job seekers' },
      { year: '2025', event: 'Presenting at Manus AI Hackathon, Singapore 🇸🇬' },
    ],
    missionTitle: 'Our Mission',
    mission: 'To give every job seeker — regardless of nationality, visa status, or background — a world-class AI career partner in their corner.',
    ctaText: 'Join the journey',
  },
  ko: {
    badge: '우리의 이야기',
    headline: '직접 겪어본 사람이 만들었어요',
    subheadline: '싱가포르에서 비자를 들고 취업을 찾던 한국인의 이야기',
    story: [
      "한국에서 싱가포르로 이사했을 때, 가장 어려운 건 좋은 직장을 찾는 것이라고 생각했어요. 틀렸어요. 가장 어려운 건 내 비자 상태로 지원 가능한 회사가 어디인지, Employment Pass를 스폰서해주는 곳이 어딘지, 각 공고에 맞게 이력서를 어떻게 바꿔야 하는지를 파악하는 것이었어요.",
      "매일 몇 시간씩 MCF, LinkedIn, Indeed, 회사 홈페이지를 전전하며 JD를 복사하고, ATS 시스템을 이해하려 애쓰고, 충분히 자격이 있는데도 왜 연락이 없는지 의아해했어요.",
      "그래서 JobPA를 만들었어요. 내가 있었으면 했던 AI 취업 파트너. 단순한 구직 사이트가 아니라, 내 비자 상황을 이해하고, 맞는 공고를 찾아주고, 모든 지원에서 최선의 나를 보여줄 수 있게 도와주는 전략적 파트너.",
    ],
    quote: '"나를 위해 생각해주는 게 아니라, 나와 함께 생각해주는 AI — 내 이야기를 아는 커리어 파트너."',
    quoteAuthor: '이수민 Sumin Lee',
    quoteRole: 'JobPA 창업자 · 싱가포르 거주 한국인',
    timelineTitle: '여정',
    timeline: [
      { year: '2023', event: '한국에서 싱가포르로 Dependent Pass로 이주' },
      { year: '2024', event: '3개월간 5개 플랫폼을 매일 전전하며 구직 활동' },
      { year: '2024', event: '개인 사용을 위해 JobPA 첫 버전 개발' },
      { year: '2025', event: '공개 출시 — 수천 명의 구직자를 돕고 있음' },
      { year: '2025', event: 'Manus AI 해커톤 싱가포르 발표 🇸🇬' },
    ],
    missionTitle: '우리의 미션',
    mission: '국적, 비자 상태, 배경에 관계없이 모든 구직자에게 세계 수준의 AI 커리어 파트너를 제공하는 것.',
    ctaText: '함께 하기',
  },
};

export default function AboutSection({ lang }: AboutSectionProps) {
  const tx = t[lang];
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

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #4338CA 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container relative">
        {/* Section header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-full px-4 py-1.5 mb-4">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
            <span className="text-xs font-semibold text-rose-600">{tx.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            {tx.headline}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{tx.subheadline}</p>
        </div>

        {/* Main split layout */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 xl:gap-20 items-start">

          {/* LEFT: Story */}
          <div className={`flex flex-col gap-6 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
            {/* Pull quote */}
            <div className="relative bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl p-6 border border-indigo-100">
              <Quote className="w-8 h-8 text-indigo-300 mb-3" />
              <p className="text-lg font-semibold text-indigo-900 leading-relaxed italic" style={{ fontFamily: 'Sora, sans-serif' }}>
                {tx.quote}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=48&h=48&fit=crop&crop=face"
                  alt="Sumin Lee"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"
                  onError={e => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Sumin+Lee&background=4338CA&color=fff&size=40`;
                  }}
                />
                <div>
                  <p className="font-bold text-sm text-indigo-900" style={{ fontFamily: 'Sora, sans-serif' }}>{tx.quoteAuthor}</p>
                  <p className="text-xs text-indigo-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {tx.quoteRole}
                  </p>
                </div>
              </div>
            </div>

            {/* Story paragraphs */}
            <div className="flex flex-col gap-4">
              {tx.story.map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed text-[15px]">
                  {para}
                </p>
              ))}
            </div>

            {/* Mission box */}
            <div className="bg-slate-900 rounded-2xl p-6 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {tx.missionTitle}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">{tx.mission}</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Timeline card */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden sticky top-24">
              {/* Card header */}
              <div className="gradient-indigo px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=48&h=48&fit=crop&crop=face"
                      alt="Sumin Lee"
                      className="w-full h-full object-cover"
                      onError={e => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Sumin+Lee&background=ffffff&color=4338CA&size=48`;
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>Sumin Lee 이수민</p>
                    <p className="text-indigo-200 text-xs">Founder · JobPA</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">🇰🇷 Korean</span>
                      <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">🇸🇬 Singapore</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="px-5 py-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{tx.timelineTitle}</p>
                <div className="flex flex-col gap-0">
                  {tx.timeline.map((item, i) => (
                    <div key={i} className="flex gap-3 relative">
                      {/* Line */}
                      {i < tx.timeline.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
                      )}
                      {/* Dot */}
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 z-10 ${
                        i === tx.timeline.length - 1
                          ? 'gradient-indigo'
                          : 'bg-slate-100 border border-border'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          i === tx.timeline.length - 1 ? 'bg-white' : 'bg-slate-400'
                        }`} />
                      </div>
                      {/* Content */}
                      <div className="pb-4">
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{item.year}</span>
                        <p className="text-xs text-foreground mt-1 leading-relaxed">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="px-5 pb-5">
                <button
                  onClick={() => window.open('https://forms.gle/ZxGFeRvE7qZ8yqVc9', '_blank')}
                  className="w-full flex items-center justify-center gap-2 gradient-indigo text-white rounded-xl py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  {tx.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

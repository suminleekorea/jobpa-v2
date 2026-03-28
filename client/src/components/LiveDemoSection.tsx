/* LiveDemoSection — Hackathon-optimised "Try Live Demo" section
   Design: Momentum — dark slate card with indigo/amber accents
   Two tracks:
     1. Job Seeker: paste JD → AI resume analysis + interview probability + 20 matched jobs
     2. Consultant/HR: enter industry/role → Talent Market Intelligence report
   Links to actual Manus agent sessions.
*/
import { useState, useEffect, useRef } from 'react';
import { Sparkles, FileText, BarChart3, ArrowRight, ExternalLink, Zap, Users, TrendingUp, CheckCircle2 } from 'lucide-react';

interface LiveDemoSectionProps {
  lang: 'en' | 'ko';
}

// Manus agent session links — update these with actual Manus prompt session URLs
const DEMO_LINKS = {
  jobSeeker: 'https://manus.im/share/5gFNUThvApmK28b741Yf8E',
  consultant: 'https://manus.im/share/5gFNUThvApmK28b741Yf8E',
};

const t = {
  en: {
    badge: 'Manus × Vibecoding Hackathon 2025',
    eyebrow: 'Try It Live',
    title: 'See Manus Take Action',
    sub: 'Not just a dashboard — Manus actively browses job platforms, analyses your documents, and builds intelligence reports in real time.',
    track1Label: 'For Job Seekers',
    track1Title: 'JD Match & Resume Analysis',
    track1Sub: 'Paste any job description. Manus crawls MCF, LinkedIn & Indeed, scores your fit, and returns 20 ranked matches with interview probability.',
    track1Steps: [
      'Paste a job description (JD)',
      'Manus crawls MCF, LinkedIn & Indeed live',
      'AI scores your resume against the JD',
      'Get 20 ranked jobs + interview probability %',
    ],
    track1Cta: 'Try Job Seeker Demo',
    track2Label: 'For Consultants & HR',
    track2Title: 'Talent Market Intelligence',
    track2Sub: 'Enter an industry and role. Manus pulls live job postings, salary data, and skill demand trends — and assembles a structured intelligence report.',
    track2Steps: [
      'Enter industry + target role',
      'Manus scrapes live postings & salary data',
      'AI maps skill demand & hiring velocity',
      'Receive a structured talent intelligence report',
    ],
    track2Cta: 'Try Consultant Demo',
    poweredBy: 'Powered by Manus AI Agents',
    poweredSub: 'Manus browses the web, pulls live data, and takes action — not just text generation.',
    hackathonNote: 'Built for the Manus × Vibecoding Consulting AI Hackathon · Singapore · April 2025',
  },
  ko: {
    badge: 'Manus × Vibecoding 해커톤 2025',
    eyebrow: '라이브 데모',
    title: 'Manus가 직접 행동합니다',
    sub: '단순한 대시보드가 아니에요 — Manus가 실시간으로 채용 플랫폼을 크롤링하고, 문서를 분석하고, 인텔리전스 리포트를 만들어냅니다.',
    track1Label: '구직자용',
    track1Title: 'JD 매칭 & 이력서 분석',
    track1Sub: '채용공고(JD)를 붙여넣으세요. Manus가 MCF, LinkedIn, Indeed를 크롤링해서 매칭 공고 20개와 인터뷰 확률을 반환해요.',
    track1Steps: [
      '채용공고(JD) 붙여넣기',
      'Manus가 MCF, LinkedIn, Indeed 실시간 크롤링',
      'AI가 이력서와 JD 매칭 점수 계산',
      '공고 20개 + 인터뷰 확률 % 반환',
    ],
    track1Cta: '구직자 데모 체험',
    track2Label: '컨설턴트 & HR용',
    track2Title: '탤런트 마켓 인텔리전스',
    track2Sub: '산업과 직군을 입력하세요. Manus가 실시간 공고, 급여 데이터, 스킬 트렌드를 수집해서 구조화된 인텔리전스 리포트를 만들어요.',
    track2Steps: [
      '산업 + 타겟 직군 입력',
      'Manus가 실시간 공고 & 급여 데이터 스크래핑',
      'AI가 스킬 수요 & 채용 속도 분석',
      '구조화된 탤런트 인텔리전스 리포트 수령',
    ],
    track2Cta: '컨설턴트 데모 체험',
    poweredBy: 'Manus AI 에이전트 기반',
    poweredSub: 'Manus는 웹을 직접 탐색하고, 실시간 데이터를 수집하며, 행동을 취합니다.',
    hackathonNote: 'Manus × Vibecoding Consulting AI 해커톤 · 싱가포르 · 2025년 4월',
  },
};

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-2 mt-4">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <span className="text-sm text-slate-600 leading-snug">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export default function LiveDemoSection({ lang }: LiveDemoSectionProps) {
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
    <section id="demo" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Hackathon badge */}
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-xs font-bold tracking-wide">{tx.badge}</span>
          </div>

          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">{tx.eyebrow}</p>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            {tx.title}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">{tx.sub}</p>
        </div>

        {/* Two demo tracks */}
        <div className={`grid lg:grid-cols-2 gap-6 mb-12 transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Track 1: Job Seeker */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xl relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-t-2xl" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{tx.track1Label}</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
              {tx.track1Title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">{tx.track1Sub}</p>
            <StepList steps={tx.track1Steps} />
            <a
              href={DEMO_LINKS.jobSeeker}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors group/btn"
            >
              <Sparkles className="w-4 h-4" />
              {tx.track1Cta}
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Track 2: Consultant */}
          <div className="bg-slate-900 rounded-2xl p-7 border border-slate-700 shadow-xl relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-2xl" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">{tx.track2Label}</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
              {tx.track2Title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">{tx.track2Sub}</p>
            <ol className="space-y-2 mt-4">
              {tx.track2Steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-400 leading-snug">{step}</span>
                </li>
              ))}
            </ol>
            <a
              href={DEMO_LINKS.consultant}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold py-3.5 rounded-xl transition-colors group/btn"
            >
              <TrendingUp className="w-4 h-4" />
              {tx.track2Cta}
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Bottom "Powered by Manus" bar */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">{tx.poweredBy}</p>
              <p className="text-slate-500 text-xs">{tx.poweredSub}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {[
              { icon: Users, label: 'Multi-source crawling' },
              { icon: CheckCircle2, label: 'Live job data' },
              { icon: BarChart3, label: 'AI scoring' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Icon className="w-3.5 h-3.5 text-indigo-400" />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs text-center sm:text-right">{tx.hackathonNote}</p>
        </div>
      </div>
    </section>
  );
}

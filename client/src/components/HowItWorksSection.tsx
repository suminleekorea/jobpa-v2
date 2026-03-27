/* HowItWorksSection — 4-step flow with animated connectors */
import { useEffect, useRef, useState } from 'react';
import { LogIn, ClipboardList, Cpu, Rocket } from 'lucide-react';

interface HowItWorksSectionProps {
  lang: 'en' | 'ko';
}

const t = {
  en: {
    badge: 'How It Works',
    title: 'From Sign-Up to Dream Job in 4 Steps',
    steps: [
      {
        icon: LogIn,
        num: '01',
        title: 'Sign In',
        desc: 'Log in with your Manus account in one click. No lengthy forms.',
        color: 'indigo',
      },
      {
        icon: ClipboardList,
        num: '02',
        title: 'Set Your Goals',
        desc: 'Tell us your target role, industry, salary range, and preferred countries.',
        color: 'amber',
      },
      {
        icon: Cpu,
        num: '03',
        title: 'AI Crawls & Matches',
        desc: 'Our AI agents crawl MCF, LinkedIn & Indeed, then rank 20 jobs by interview probability.',
        color: 'emerald',
      },
      {
        icon: Rocket,
        num: '04',
        title: 'Apply with Confidence',
        desc: 'Get a tailored resume, interview tips, and apply directly from JobPA.',
        color: 'indigo',
      },
    ],
  },
  ko: {
    badge: '이용 방법',
    title: '4단계로 드림 잡까지',
    steps: [
      {
        icon: LogIn,
        num: '01',
        title: '로그인',
        desc: 'Manus 계정으로 원클릭 로그인. 긴 가입 폼 없음.',
        color: 'indigo',
      },
      {
        icon: ClipboardList,
        num: '02',
        title: '목표 설정',
        desc: '목표 직무, 산업, 연봉 범위, 선호 국가를 알려주세요.',
        color: 'amber',
      },
      {
        icon: Cpu,
        num: '03',
        title: 'AI 크롤링 & 매칭',
        desc: 'AI 에이전트가 MCF, LinkedIn, Indeed를 크롤링해 인터뷰 확률 순으로 공고 20개를 추천합니다.',
        color: 'emerald',
      },
      {
        icon: Rocket,
        num: '04',
        title: '자신있게 지원',
        desc: '맞춤 이력서, 인터뷰 팁을 받고 JobPA에서 바로 지원하세요.',
        color: 'indigo',
      },
    ],
  },
};

const colorMap: Record<string, { bg: string; icon: string; num: string; ring: string }> = {
  indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', num: 'text-indigo-600', ring: 'ring-indigo-200' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', num: 'text-amber-600', ring: 'ring-amber-200' },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', num: 'text-emerald-600', ring: 'ring-emerald-200' },
};

export default function HowItWorksSection({ lang }: HowItWorksSectionProps) {
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
    <section className="py-20 bg-white">
      <div className="container">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-slate-600">{tx.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground" style={{ fontFamily: 'Sora, sans-serif' }}>
            {tx.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-indigo-200 via-amber-200 to-indigo-200 z-0" />

          {tx.steps.map((step, i) => {
            const colors = colorMap[step.color];
            const Icon = step.icon;
            return (
              <div
                key={i}
                className={`relative z-10 flex flex-col items-center text-center gap-4 transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Step circle */}
                <div className={`w-20 h-20 rounded-2xl ${colors.bg} ring-4 ${colors.ring} flex flex-col items-center justify-center gap-0.5 shadow-sm`}>
                  <span className={`text-[10px] font-black ${colors.num} tracking-widest`}>{step.num}</span>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

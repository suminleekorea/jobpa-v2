/* FeaturesSection — Momentum: masonry widget grid, Naver-style info density */
import { useEffect, useRef, useState } from 'react';
import {
  Search, FileText, BarChart3, MessageSquare, BookOpen,
  Globe2, Bell, Target, TrendingUp, Zap
} from 'lucide-react';
import { TRENDING_SKILLS } from '@/lib/data';

interface FeaturesSectionProps {
  lang: 'en' | 'ko';
}

const t = {
  en: {
    sectionBadge: 'What JobPA Does',
    sectionTitle: 'Everything You Need to Land the Job',
    sectionSub: 'From web-crawled job discovery to AI-powered resume coaching — your complete career toolkit.',
    features: [
      {
        icon: Search,
        title: 'Multi-Source Job Crawling',
        desc: 'Automatically searches MCF, LinkedIn, Indeed, and company career pages. No more switching tabs.',
        color: 'indigo',
        size: 'large',
      },
      {
        icon: Target,
        title: 'Interview Probability Scoring',
        desc: 'AI scores each job against your profile and predicts your interview likelihood.',
        color: 'amber',
        size: 'small',
      },
      {
        icon: FileText,
        title: 'AI Resume Analysis',
        desc: 'ATS-optimized feedback and JD-tailored resume customization for each role.',
        color: 'emerald',
        size: 'small',
      },
      {
        icon: BarChart3,
        title: 'Market Intelligence',
        desc: 'Real-time salary benchmarks, trending skills, and hiring velocity by industry.',
        color: 'indigo',
        size: 'medium',
      },
      {
        icon: MessageSquare,
        title: 'AI Career Chat',
        desc: 'Ask anything — visa info, salary negotiation, interview prep, career pivots.',
        color: 'amber',
        size: 'medium',
      },
      {
        icon: Bell,
        title: 'Daily Job Alerts',
        desc: 'Personalized job digest sent every morning via Telegram or email.',
        color: 'emerald',
        size: 'small',
      },
      {
        icon: Globe2,
        title: 'Multi-Country Support',
        desc: 'Singapore, Korea, Japan, Australia and more — global job search in one platform.',
        color: 'indigo',
        size: 'small',
      },
      {
        icon: BookOpen,
        title: 'Application Tracking',
        desc: 'Track every application across platforms. Never lose track of a pipeline.',
        color: 'amber',
        size: 'small',
      },
    ],
    trendingTitle: 'Trending Skills in Singapore',
    trendingThis: 'This week',
  },
  ko: {
    sectionBadge: 'JobPA가 하는 일',
    sectionTitle: '취업에 필요한 모든 것',
    sectionSub: '웹크롤링 공고 탐색부터 AI 이력서 코칭까지 — 완전한 취업 툴킷.',
    features: [
      {
        icon: Search,
        title: '멀티소스 공고 크롤링',
        desc: 'MCF, LinkedIn, Indeed, 회사 홈페이지를 자동 검색. 탭 전환 없이 한 곳에서.',
        color: 'indigo',
        size: 'large',
      },
      {
        icon: Target,
        title: '인터뷰 확률 스코어링',
        desc: 'AI가 내 프로필과 각 공고를 비교해 인터뷰 가능성을 예측합니다.',
        color: 'amber',
        size: 'small',
      },
      {
        icon: FileText,
        title: 'AI 이력서 분석',
        desc: 'ATS 최적화 피드백과 공고별 맞춤 이력서 커스터마이징.',
        color: 'emerald',
        size: 'small',
      },
      {
        icon: BarChart3,
        title: '시장 인텔리전스',
        desc: '실시간 연봉 벤치마크, 트렌딩 스킬, 산업별 채용 속도.',
        color: 'indigo',
        size: 'medium',
      },
      {
        icon: MessageSquare,
        title: 'AI 커리어 챗',
        desc: '비자 정보, 연봉 협상, 인터뷰 준비, 커리어 전환 — 뭐든 물어보세요.',
        color: 'amber',
        size: 'medium',
      },
      {
        icon: Bell,
        title: '매일 아침 공고 알림',
        desc: '맞춤 공고 다이제스트를 매일 아침 텔레그램 또는 이메일로 전송.',
        color: 'emerald',
        size: 'small',
      },
      {
        icon: Globe2,
        title: '다국가 지원',
        desc: '싱가포르, 한국, 일본, 호주 등 글로벌 공고를 한 플랫폼에서.',
        color: 'indigo',
        size: 'small',
      },
      {
        icon: BookOpen,
        title: '지원 현황 트래킹',
        desc: '모든 플랫폼의 지원 현황을 한눈에. 파이프라인을 놓치지 마세요.',
        color: 'amber',
        size: 'small',
      },
    ],
    trendingTitle: '싱가포르 트렌딩 스킬',
    trendingThis: '이번 주',
  },
};

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-100' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100' },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-100' },
};

function FeatureCard({ feature, delay }: { feature: any; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const colors = colorMap[feature.color];
  const Icon = feature.icon;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl border ${colors.border} p-5 card-hover transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${feature.size === 'large' ? 'md:col-span-2' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${colors.icon}`} />
      </div>
      <h3 className="font-bold text-foreground mb-1.5 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
        {feature.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
    </div>
  );
}

export default function FeaturesSection({ lang }: FeaturesSectionProps) {
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
    <section id="features" className="py-20 bg-white">
      <div className="container">
        {/* Header */}
        <div ref={ref} className={`text-center mb-12 transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 mb-4">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-semibold text-indigo-700">{tx.sectionBadge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            {tx.sectionTitle}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{tx.sectionSub}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Feature Cards — masonry-style */}
          {tx.features.map((f, i) => (
            <FeatureCard key={i} feature={f} delay={i * 80} />
          ))}

          {/* Trending Skills Widget */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-5 text-white md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{tx.trendingTitle}</span>
              <span className="text-xs text-slate-400 ml-auto">{tx.trendingThis}</span>
            </div>
            <div className="flex flex-col gap-2">
              {TRENDING_SKILLS.map((skill, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {skill.hot && <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded-full font-bold">HOT</span>}
                    <span className="text-sm text-slate-200">{skill.name}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">{skill.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

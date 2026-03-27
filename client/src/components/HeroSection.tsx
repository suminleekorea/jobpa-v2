/* HeroSection — Momentum: asymmetric split, left copy + right live widget */
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, TrendingUp, ArrowRight, Globe2, Zap } from 'lucide-react';
import { MOCK_JOBS, MARKET_STATS } from '@/lib/data';

interface HeroSectionProps {
  lang: 'en' | 'ko';
}

const t = {
  en: {
    badge: 'AI-Powered Career Intelligence',
    h1a: 'Your AI',
    h1b: 'Career Strategy',
    h1c: 'Partner',
    sub: 'Web-crawl job search across MCF, LinkedIn & Indeed. Get JD-matched recommendations with interview probability scoring — all in one place.',
    searchPlaceholder: 'e.g. Product Marketing, Data Analyst...',
    searchBtn: 'Find Matching Jobs',
    stat1: 'Live Jobs',
    stat2: 'Avg. Salary',
    stat3: 'Hiring Growth',
    widgetTitle: 'Top Matches For You',
    widgetSub: 'Based on your profile · Updated now',
    matchScore: 'Match',
    interviewProb: 'Interview Prob.',
    viewAll: 'View All 20 Matches',
    sources: 'Sources',
    liveTag: 'LIVE',
  },
  ko: {
    badge: 'AI 기반 커리어 인텔리전스',
    h1a: 'AI',
    h1b: '취업 전략',
    h1c: '파트너',
    sub: 'MCF, LinkedIn, Indeed 웹크롤링으로 공고를 수집하고, JD 매칭 추천 공고 20개와 인터뷰 확률을 한눈에 확인하세요.',
    searchPlaceholder: '예) 프로덕트 마케팅, 데이터 분석가...',
    searchBtn: '매칭 공고 찾기',
    stat1: '실시간 공고',
    stat2: '평균 연봉',
    stat3: '채용 성장률',
    widgetTitle: '나의 TOP 매칭',
    widgetSub: '프로필 기반 · 방금 업데이트',
    matchScore: '매칭',
    interviewProb: '인터뷰 확률',
    viewAll: '20개 전체 공고 보기',
    sources: '출처',
    liveTag: '실시간',
  },
};

function InterviewProbBadge({ prob }: { prob: number }) {
  const cls = prob >= 75 ? 'probability-high' : prob >= 55 ? 'probability-mid' : 'probability-low';
  const dot = prob >= 75 ? 'bg-emerald-500' : prob >= 55 ? 'bg-amber-500' : 'bg-red-400';
  return (
    <span className={`source-badge ${cls} text-xs font-semibold`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot} inline-block`} />
      {prob}%
    </span>
  );
}

function SourceBadge({ source }: { source: string }) {
  const cls = source === 'MCF' ? 'source-mcf' : source === 'LinkedIn' ? 'source-linkedin' : 'source-company';
  return <span className={`source-badge ${cls}`}>{source}</span>;
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const tx = t[lang];
  const [searchVal, setSearchVal] = useState('');
  const [visibleJobs, setVisibleJobs] = useState(3);
  const [animatedStats, setAnimatedStats] = useState({ jobs: 0, growth: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const topJobs = MOCK_JOBS.slice(0, 4);

  // Animate stats on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({ jobs: MARKET_STATS.totalJobs, growth: 12 });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-16 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-emerald-50/40 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-[1fr_480px] gap-8 xl:gap-16 items-center min-h-[calc(100vh-4rem)] py-12">

          {/* LEFT: Copy */}
          <div className="flex flex-col gap-6 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-700 tracking-wide">{tx.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
              <span className="text-indigo-600">{tx.h1a}</span>{' '}
              <span className="text-foreground">{tx.h1b}</span>
              <br />
              <span className="text-foreground">{tx.h1c}</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {tx.sub}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder={tx.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                />
              </div>
              <Button type="submit" className="gradient-indigo text-white border-0 px-5 rounded-xl shadow-sm">
                <Zap className="w-4 h-4 mr-1.5" />
                {tx.searchBtn}
              </Button>
            </form>

            {/* Source Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">{tx.sources}:</span>
              {['MCF', 'LinkedIn', 'Indeed', 'Company Sites'].map(s => (
                <span key={s} className="text-xs bg-white border border-border rounded-full px-3 py-1 font-medium text-foreground shadow-sm">
                  {s}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex gap-8 pt-2">
              <div>
                <div className="text-3xl font-extrabold text-foreground tabular-nums" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {animatedStats.jobs.toLocaleString()}+
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{tx.stat1}</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="text-3xl font-extrabold text-foreground" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {MARKET_STATS.avgSalary}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{tx.stat2}</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="text-3xl font-extrabold text-emerald-600 flex items-center gap-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                  <TrendingUp className="w-6 h-6" />
                  +{animatedStats.growth}%
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{tx.stat3}</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Job Widget */}
          <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
              {/* Widget Header */}
              <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-700">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{tx.widgetTitle}</span>
                    <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">{tx.liveTag}</span>
                  </div>
                  <p className="text-indigo-200 text-xs mt-0.5">{tx.widgetSub}</p>
                </div>
                <div className="flex items-center gap-1 text-indigo-200 text-xs">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Multi-source</span>
                </div>
              </div>

              {/* Job Cards */}
              <div className="divide-y divide-border">
                {topJobs.map((job, i) => (
                  <div
                    key={job.id}
                    className="px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer"
                    style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                    onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <div className="flex items-start gap-3">
                      {/* Company Logo */}
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-9 h-9 rounded-lg object-contain border border-border bg-white p-0.5 flex-shrink-0"
                        onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${job.company}&background=4338CA&color=fff&size=36`; }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-foreground truncate">{job.title}</p>
                            <p className="text-xs text-muted-foreground">{job.company}</p>
                          </div>
                          <InterviewProbBadge prob={job.interviewProb} />
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {job.salary}
                          </span>
                          <div className="flex gap-1">
                            {job.sources.slice(0, 2).map(s => <SourceBadge key={s} source={s} />)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All CTA */}
              <div className="px-5 py-3.5 bg-slate-50 border-t border-border">
                <button
                  onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  {tx.viewAll}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Floating badge */}
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-ring" />
              <span>Live data · Updated every 6 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

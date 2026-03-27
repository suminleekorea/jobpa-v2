/* JobsSection — 20 JD-matched recommendations with interview probability
   LIVE data from JSearch RapidAPI (MCF, LinkedIn, Indeed, Careers@Gov)
   Falls back to mock data if API quota exceeded.
   Interview probability = JobPA's proprietary AI scoring.
*/
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Search, Filter, MapPin, DollarSign, Clock, ExternalLink,
  ChevronDown, ChevronUp, Briefcase, Globe2, Star, RefreshCw, Wifi, WifiOff
} from 'lucide-react';
import { type Job } from '@/lib/data';
import { useJSearchJobs } from '@/hooks/useJSearchJobs';

interface JobsSectionProps {
  lang: 'en' | 'ko';
}

const t = {
  en: {
    badge: 'AI-Matched Job Recommendations',
    title: '20 Jobs Matched to Your Profile',
    sub: 'Crawled from MCF, LinkedIn, Indeed & company sites. Ranked by interview probability.',
    searchPlaceholder: 'Search jobs...',
    filterAll: 'All',
    filterTech: 'Technology',
    filterFinance: 'Finance',
    filterEcom: 'E-commerce',
    sortMatch: 'Best Match',
    sortSalary: 'Highest Salary',
    sortProb: 'Interview Prob.',
    matchScore: 'Match Score',
    applyNow: 'Apply Now',
    showMore: 'Show Details',
    showLess: 'Hide Details',
    noResults: 'No jobs found. Try adjusting your filters.',
    liveCount: 'live jobs',
    loading: 'Crawling jobs from MCF, LinkedIn & Indeed...',
    liveLabel: 'Live data',
    mockLabel: 'Demo data',
    refresh: 'Refresh',
  },
  ko: {
    badge: 'AI 매칭 공고 추천',
    title: '내 프로필에 매칭된 공고 20개',
    sub: 'MCF, LinkedIn, Indeed, 회사 홈페이지에서 크롤링. 인터뷰 확률 순으로 정렬.',
    searchPlaceholder: '공고 검색...',
    filterAll: '전체',
    filterTech: '기술',
    filterFinance: '금융',
    filterEcom: '이커머스',
    sortMatch: '매칭 순',
    sortSalary: '연봉 높은 순',
    sortProb: '인터뷰 확률 순',
    matchScore: '매칭 점수',
    applyNow: '지원하기',
    showMore: '상세 보기',
    showLess: '접기',
    noResults: '공고가 없습니다. 필터를 조정해보세요.',
    liveCount: '개 실시간 공고',
    loading: 'MCF, LinkedIn, Indeed에서 공고 크롤링 중...',
    liveLabel: '실시간 데이터',
    mockLabel: '데모 데이터',
    refresh: '새로고침',
  },
};

function ProbabilityRing({ prob }: { prob: number }) {
  const [animated, setAnimated] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;
  const color = prob >= 75 ? '#10B981' : prob >= 55 ? '#F59E0B' : '#EF4444';

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setAnimated(prob), 100); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [prob]);

  return (
    <div ref={ref} className="relative flex items-center justify-center w-14 h-14 flex-shrink-0">
      <svg width="56" height="56" className="-rotate-90">
        <circle cx="28" cy="28" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="4" />
        <circle
          cx="28" cy="28" r={radius}
          fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold tabular-nums" style={{ color }}>{prob}%</span>
      </div>
    </div>
  );
}

function SourceBadge({ source }: { source: string }) {
  const cls =
    source === 'MCF' ? 'source-mcf' :
    source === 'LinkedIn' ? 'source-linkedin' :
    source === 'Gov' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
    source === 'Indeed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
    source === 'FastJobs' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
    'source-company';
  return <span className={`source-badge ${cls} text-[10px]`}>{source}</span>;
}

function JobCard({ job, tx, index }: { job: Job; tx: typeof t.en; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const matchColor = job.matchScore >= 85 ? 'text-emerald-600' : job.matchScore >= 70 ? 'text-amber-600' : 'text-slate-500';

  const handleApply = () => {
    const link = job.applyLink && job.applyLink !== '#' ? job.applyLink : 'https://www.mycareersfuture.gov.sg';
    window.open(link, '_blank');
  };

  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl border border-border p-4 card-hover transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${(index % 5) * 60}ms` }}
    >
      <div className="flex items-start gap-3">
        {/* Rank */}
        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-[10px] font-bold text-slate-500">{index + 1}</span>
        </div>

        {/* Logo */}
        <img
          src={job.companyLogo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=4338CA&color=fff&size=40`}
          alt={job.company}
          className="w-10 h-10 rounded-lg object-contain border border-border bg-white p-0.5 flex-shrink-0"
          onError={e => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=4338CA&color=fff&size=40`;
          }}
        />

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-foreground text-sm leading-tight truncate" style={{ fontFamily: 'Sora, sans-serif' }}>
                {job.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{job.company}</p>
            </div>
            <ProbabilityRing prob={job.interviewProb} />
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" /> {job.location}
            </span>
            <span className={`flex items-center gap-1 text-xs font-semibold ${job.salary === 'Salary not disclosed' ? 'text-muted-foreground' : 'text-emerald-700'}`}>
              <DollarSign className="w-3 h-3" /> {job.salary}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" /> {job.postedDate}
            </span>
          </div>

          {/* Match + Sources */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`text-xs font-bold ${matchColor}`}>
              <Star className="w-3 h-3 inline mr-0.5" />{job.matchScore}% {tx.matchScore}
            </span>
            <span className="text-muted-foreground text-xs">·</span>
            <div className="flex gap-1 flex-wrap">
              {job.sources.map(s => <SourceBadge key={s} source={s} />)}
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-1 mt-2 flex-wrap">
            {job.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>

          {/* Expanded description */}
          {expanded && (
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed border-t border-border pt-3 line-clamp-6">
              {job.description !== 'View full job description on the employer website.'
                ? job.description
                : 'Full job description available on the employer website. Click Apply Now to view details.'}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3">
            <Button
              size="sm"
              className="gradient-indigo text-white border-0 text-xs h-7 px-3"
              onClick={handleApply}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              {tx.applyNow}
            </Button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {expanded ? tx.showLess : tx.showMore}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-border p-4 animate-pulse">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-slate-200" />
            <div className="w-10 h-10 rounded-lg bg-slate-200 flex-shrink-0" />
            <div className="flex-1">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-100 rounded w-1/2 mb-3" />
              <div className="h-3 bg-slate-100 rounded w-full mb-2" />
              <div className="h-3 bg-slate-100 rounded w-2/3" />
            </div>
            <div className="w-14 h-14 rounded-full bg-slate-200 flex-shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function JobsSection({ lang }: JobsSectionProps) {
  const tx = t[lang];
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'match' | 'salary' | 'prob'>('prob');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Use live JSearch API
  const { jobs, loading, isLive, refetch } = useJSearchJobs('jobs in singapore');

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = jobs
    .filter(j => {
      const q = search.toLowerCase();
      return !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.tags.some(tag => tag.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      if (sortBy === 'salary') return b.salaryRaw[1] - a.salaryRaw[1];
      return b.interviewProb - a.interviewProb;
    });

  const sorts = [
    { value: 'prob', label: tx.sortProb },
    { value: 'match', label: tx.sortMatch },
    { value: 'salary', label: tx.sortSalary },
  ];

  return (
    <section id="jobs" className="py-20 bg-slate-50">
      <div className="container">
        {/* Header */}
        <div ref={ref} className={`mb-8 transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 mb-3">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-xs font-semibold text-indigo-700">{tx.badge}</span>
              </div>
              <h2 className="text-3xl font-extrabold text-foreground" style={{ fontFamily: 'Sora, sans-serif' }}>
                {tx.title}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">{tx.sub}</p>
            </div>

            {/* Live / Mock indicator */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${
                isLive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {isLive
                  ? <Wifi className="w-3 h-3" />
                  : <WifiOff className="w-3 h-3" />
                }
                {isLive ? tx.liveLabel : tx.mockLabel}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                <span>{jobs.length} {tx.liveCount}</span>
              </div>
              <button
                onClick={refetch}
                disabled={loading}
                className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors text-muted-foreground disabled:opacity-50"
                title={tx.refresh}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={tx.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Filter className="w-3.5 h-3.5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'match' | 'salary' | 'prob')}
                className="text-xs border border-border rounded-lg px-2 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {sorts.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-500" />
              {tx.loading}
            </div>
            <LoadingSkeleton />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Globe2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>{tx.noResults}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((job, i) => (
              <JobCard key={job.id} job={job} tx={tx} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

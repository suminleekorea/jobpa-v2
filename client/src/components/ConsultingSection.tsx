/* ConsultingSection — Mentree-style consultant marketplace */
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Globe2, MessageCircle, Users, ChevronRight, Award, Zap } from 'lucide-react';
import { MOCK_CONSULTANTS, type Consultant } from '@/lib/data';

interface ConsultingSectionProps {
  lang: 'en' | 'ko';
}

const t = {
  en: {
    badge: 'Expert Consulting',
    title: 'Book a 1:1 Session with Industry Experts',
    sub: 'Career coaches, hiring managers, and immigration lawyers — by industry and country.',
    filterAll: 'All',
    filterTech: 'Technology',
    filterFinance: 'Finance',
    filterLegal: 'Legal',
    filterConsulting: 'Consulting',
    available: 'Available Now',
    unavailable: 'Fully Booked',
    sessions: 'sessions',
    reviews: 'reviews',
    bookNow: 'Book Session',
    viewProfile: 'View Profile',
    perSession: '/ session',
    joinTitle: 'Are You a Career Expert?',
    joinSub: 'Join our consultant network and help job seekers across Asia.',
    joinCta: 'Apply as Consultant',
    comingSoon: 'Coming Soon',
  },
  ko: {
    badge: '전문가 컨설팅',
    title: '업계 전문가와 1:1 세션 예약',
    sub: '커리어 코치, 채용 담당자, 이민 변호사 — 산업별·국가별로 선택하세요.',
    filterAll: '전체',
    filterTech: '기술',
    filterFinance: '금융',
    filterLegal: '법률',
    filterConsulting: '컨설팅',
    available: '예약 가능',
    unavailable: '마감',
    sessions: '세션',
    reviews: '리뷰',
    bookNow: '세션 예약',
    viewProfile: '프로필 보기',
    perSession: '/ 세션',
    joinTitle: '커리어 전문가이신가요?',
    joinSub: '컨설턴트 네트워크에 합류해 아시아 취업 준비생들을 도와주세요.',
    joinCta: '컨설턴트 신청',
    comingSoon: '출시 예정',
  },
};

function ConsultantCard({ consultant, tx, delay }: { consultant: Consultant; tx: any; delay: number }) {
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
    <div
      ref={ref}
      className={`bg-white rounded-2xl border border-border p-5 card-hover flex flex-col gap-4 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="relative">
          <img
            src={consultant.avatar}
            alt={consultant.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-border"
            onError={e => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(consultant.name)}&background=4338CA&color=fff&size=56`;
            }}
          />
          {consultant.available && (
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <div>
              <h3 className="font-bold text-foreground text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
                {consultant.name}
              </h3>
              <p className="text-xs text-muted-foreground">{consultant.title}</p>
              <p className="text-xs text-indigo-600 font-medium">{consultant.company}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-base font-extrabold text-foreground" style={{ fontFamily: 'Sora, sans-serif' }}>
                {consultant.currency} {consultant.price}
              </div>
              <div className="text-[10px] text-muted-foreground">{tx.perSession}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1 text-amber-600 font-semibold">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          {consultant.rating}
          <span className="text-muted-foreground font-normal">({consultant.reviews} {tx.reviews})</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          {consultant.sessions} {tx.sessions}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {consultant.tags.map(tag => (
          <span key={tag} className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-full font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* Languages */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Globe2 className="w-3.5 h-3.5" />
        {consultant.languages.join(' · ')}
      </div>

      {/* Availability + CTA */}
      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border">
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
          consultant.available
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            : 'bg-slate-100 text-slate-500'
        }`}>
          {consultant.available ? tx.available : tx.unavailable}
        </span>
        <div className="flex gap-2 ml-auto">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 px-3"
            onClick={() => {}}
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            {tx.viewProfile}
          </Button>
          <Button
            size="sm"
            className="gradient-indigo text-white border-0 text-xs h-8 px-3"
            disabled={!consultant.available}
            onClick={() => {}}
          >
            {tx.bookNow}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ConsultingSection({ lang }: ConsultingSectionProps) {
  const tx = t[lang];
  const [filter, setFilter] = useState('all');
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

  const filters = [
    { value: 'all', label: tx.filterAll },
    { value: 'Technology', label: tx.filterTech },
    { value: 'Finance', label: tx.filterFinance },
    { value: 'Legal', label: tx.filterLegal },
    { value: 'Consulting', label: tx.filterConsulting },
  ];

  const filtered = MOCK_CONSULTANTS.filter(
    c => filter === 'all' || c.industry === filter
  );

  return (
    <section
      id="consulting"
      className="py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #fff 0%, #f8f7ff 100%)`,
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663211657117/XyXF9nwvEAKm6iDk8jn2zg/jobpa-consulting-bg-eYAUpTraCHeAzgMuBmvAaY.webp)` }}
      />

      <div className="container relative">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-10 transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 mb-4">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-semibold text-indigo-700">{tx.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            {tx.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{tx.sub}</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 justify-center flex-wrap mb-8">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                filter === f.value
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-muted-foreground border-border hover:border-indigo-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Consultant Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c, i) => (
            <ConsultantCard key={c.id} consultant={c} tx={tx} delay={i * 80} />
          ))}
        </div>

        {/* Join CTA Banner */}
        <div className="mt-12 rounded-2xl gradient-indigo p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white text-center md:text-left">
            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{tx.joinTitle}</h3>
            <p className="text-indigo-200 text-sm">{tx.joinSub}</p>
          </div>
          <Button
            variant="outline"
            className="bg-white text-indigo-700 border-white hover:bg-indigo-50 font-semibold px-6 flex-shrink-0"
            onClick={() => window.open('https://forms.gle/ZxGFeRvE7qZ8yqVc9', '_blank')}
          >
            {tx.joinCta}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

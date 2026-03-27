/* ClassesSection — Classes, seminars, workshops marketplace */
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Tag, BookOpen, Zap, ChevronRight, Clock } from 'lucide-react';
import { MOCK_COURSES, type Course } from '@/lib/data';

interface ClassesSectionProps {
  lang: 'en' | 'ko';
}

const t = {
  en: {
    badge: 'Classes & Seminars',
    title: 'Level Up Your Career Skills',
    sub: 'Workshops, seminars, and bootcamps led by industry practitioners.',
    typeAll: 'All',
    typeWorkshop: 'Workshop',
    typeSeminar: 'Seminar',
    typeClass: 'Class',
    free: 'Free',
    seatsLeft: 'seats left',
    register: 'Register Now',
    full: 'Fully Booked',
    upcoming: 'Upcoming',
    hostTitle: 'Host a Class or Seminar',
    hostSub: 'Share your expertise with thousands of job seekers across Asia.',
    hostCta: 'Apply to Host',
  },
  ko: {
    badge: '클래스 & 세미나',
    title: '커리어 스킬을 업그레이드하세요',
    sub: '업계 전문가가 진행하는 워크숍, 세미나, 부트캠프.',
    typeAll: '전체',
    typeWorkshop: '워크숍',
    typeSeminar: '세미나',
    typeClass: '클래스',
    free: '무료',
    seatsLeft: '자리 남음',
    register: '지금 등록',
    full: '마감',
    upcoming: '예정',
    hostTitle: '클래스 또는 세미나를 열어보세요',
    hostSub: '아시아 전역의 수천 명 취업 준비생들과 전문 지식을 나눠보세요.',
    hostCta: '호스트 신청',
  },
};

const typeColors: Record<string, string> = {
  workshop: 'bg-amber-50 text-amber-700 border-amber-200',
  seminar: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  class: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

function CourseCard({ course, tx, delay }: { course: Course; tx: any; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isFull = course.seatsLeft === 0;
  const seatsPercent = Math.round(((course.seats - course.seatsLeft) / course.seats) * 100);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const dateObj = new Date(course.date);
  const dateStr = dateObj.toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl border border-border overflow-hidden card-hover flex flex-col transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`source-badge border text-[10px] font-bold capitalize ${typeColors[course.type]}`}>
            {course.type}
          </span>
          {course.price === 0 && (
            <span className="source-badge bg-emerald-500 text-white border-0 text-[10px] font-bold">
              {tx.free}
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {dateStr}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-bold text-foreground text-sm leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">by {course.instructor}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {course.tags.map(tag => (
            <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>

        {/* Seats progress */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground flex items-center gap-1">
              <Users className="w-3 h-3" />
              {course.seatsLeft} {tx.seatsLeft}
            </span>
            <span className="text-muted-foreground">{seatsPercent}% filled</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                seatsPercent >= 80 ? 'bg-red-400' : seatsPercent >= 50 ? 'bg-amber-400' : 'bg-emerald-500'
              }`}
              style={{ width: `${seatsPercent}%` }}
            />
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          <div>
            {course.price === 0 ? (
              <span className="text-lg font-extrabold text-emerald-600" style={{ fontFamily: 'Sora, sans-serif' }}>{tx.free}</span>
            ) : (
              <span className="text-lg font-extrabold text-foreground" style={{ fontFamily: 'Sora, sans-serif' }}>
                {course.currency} {course.price}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className={`text-xs h-8 px-4 ${isFull ? 'opacity-50' : 'gradient-indigo text-white border-0'}`}
            disabled={isFull}
            onClick={() => window.open('https://forms.gle/ZxGFeRvE7qZ8yqVc9', '_blank')}
          >
            {isFull ? tx.full : tx.register}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ClassesSection({ lang }: ClassesSectionProps) {
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
    { value: 'all', label: tx.typeAll },
    { value: 'workshop', label: tx.typeWorkshop },
    { value: 'seminar', label: tx.typeSeminar },
    { value: 'class', label: tx.typeClass },
  ];

  const filtered = MOCK_COURSES.filter(c => filter === 'all' || c.type === filter);

  return (
    <section id="classes" className="py-20 bg-slate-50">
      <div className="container">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-10 transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-semibold text-amber-700">{tx.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            {tx.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{tx.sub}</p>
        </div>

        {/* Type Filters */}
        <div className="flex gap-2 justify-center flex-wrap mb-8">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                filter === f.value
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-white text-muted-foreground border-border hover:border-amber-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((course, i) => (
            <CourseCard key={course.id} course={course} tx={tx} delay={i * 80} />
          ))}
        </div>

        {/* Host CTA */}
        <div className="mt-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white text-center md:text-left">
            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{tx.hostTitle}</h3>
            <p className="text-amber-100 text-sm">{tx.hostSub}</p>
          </div>
          <Button
            variant="outline"
            className="bg-white text-amber-700 border-white hover:bg-amber-50 font-semibold px-6 flex-shrink-0"
            onClick={() => window.open('https://forms.gle/ZxGFeRvE7qZ8yqVc9', '_blank')}
          >
            {tx.hostCta}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

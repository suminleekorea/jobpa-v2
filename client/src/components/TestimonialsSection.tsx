/* TestimonialsSection — Real user feedback quotes
   Design: Momentum style — dark slate background, amber accent stars,
   horizontal scroll card carousel with framer-motion entrance animation.
*/
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  lang: 'en' | 'ko';
}

const testimonials = [
  {
    name: 'James T.',
    role: 'GSCDO / Government',
    avatar: 'JT',
    color: 'bg-blue-600',
    rating: 5,
    en: "Searching for jobs online is really tedious and takes a lot of time. If an AI agent can search the web for suitable roles, list various sites to apply, and customise the resume for each role — that will be best. JobPA is exactly what I was looking for.",
    ko: "온라인 취업 검색은 정말 지루하고 시간이 많이 걸려요. AI가 적합한 공고를 찾아주고, 이력서를 각 역할에 맞게 커스터마이징해준다면 최고일 것 같아요. JobPA가 바로 그런 도구예요.",
    tag: 'Job Search Automation',
  },
  {
    name: 'David K.',
    role: 'Future Forward / Consulting',
    avatar: 'DK',
    color: 'bg-emerald-600',
    rating: 5,
    en: "The biggest issue in job search is the ATS system — applying on the company's website. JobPA's AI-powered approach tackles exactly this pain point. The multi-source search across LinkedIn, MCF and company sites is a game changer.",
    ko: "취업 검색의 가장 큰 문제는 ATS 시스템이에요. JobPA의 AI 접근 방식이 바로 이 문제를 해결해줘요. LinkedIn, MCF, 회사 사이트를 통합 검색하는 기능이 정말 획기적이에요.",
    tag: 'ATS & Multi-source',
  },
  {
    name: 'Alwyn T.',
    role: 'LinkedIn / Tech Community',
    avatar: 'AT',
    color: 'bg-indigo-600',
    rating: 5,
    en: "I just Googled and found this — JobPA is building on top of MCF data in a really smart way. Assuming you used Gabriel Chua's MCF scraper, this is a great example of community-driven innovation. Excited to see where this goes!",
    ko: "구글링하다 발견했어요 — JobPA가 MCF 데이터를 정말 스마트하게 활용하고 있어요. 커뮤니티 기반 혁신의 좋은 사례예요. 앞으로 어떻게 발전할지 기대돼요!",
    tag: 'MCF Integration',
  },
  {
    name: 'Sumin L.',
    role: 'Founder, JobPA',
    avatar: 'SL',
    color: 'bg-amber-600',
    rating: 5,
    en: "I built JobPA because I was a Korean in Singapore struggling with visa + job search at the same time. I needed an AI partner who knows my story and thinks strategically with me — not just a search engine.",
    ko: "싱가포르에서 비자와 취업을 동시에 해결해야 했던 한국인으로서 JobPA를 만들었어요. 단순한 검색 엔진이 아닌, 제 상황을 이해하고 함께 전략을 짜주는 AI 파트너가 필요했거든요.",
    tag: 'Founder Story',
  },
];

const t = {
  en: {
    badge: 'Real User Feedback',
    title: 'What People Are Saying',
    sub: 'Early users from Singapore\'s job-seeking and consulting community.',
  },
  ko: {
    badge: '실제 사용자 피드백',
    title: '사용자들의 이야기',
    sub: '싱가포르 취업 및 컨설팅 커뮤니티의 초기 사용자들의 목소리.',
  },
};

export default function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const tx = t[lang];

  return (
    <section className="py-20 bg-slate-900 overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-semibold mb-4 border border-amber-500/20">
            <Star className="w-3 h-3 fill-amber-400" />
            {tx.badge}
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-3"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            {tx.title}
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm">{tx.sub}</p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/40 hover:bg-slate-800 transition-all group"
            >
              {/* Quote icon */}
              <Quote className="absolute top-5 right-5 w-8 h-8 text-slate-700 group-hover:text-indigo-800 transition-colors" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">
                "{lang === 'en' ? t.en : t.ko}"
              </p>

              {/* Author row */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs truncate">{t.role}</p>
                </div>
                <span className="ml-auto flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 font-medium">
                  {t.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

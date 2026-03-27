/* FAQSection — Accordion with smooth animation */
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  lang: 'en' | 'ko';
}

const t = {
  en: {
    badge: 'FAQ',
    title: 'Frequently Asked Questions',
    sub: 'Everything you need to know about JobPA.',
    faqs: [
      {
        q: 'Does JobPA automatically apply for jobs?',
        a: 'No — JobPA is your AI-powered strategic partner, not an auto-apply bot. We help you find the best-matched jobs, score your interview probability, and prepare your application materials. You make the final decision on every application.',
      },
      {
        q: 'Which job platforms does it cover?',
        a: 'JobPA crawls MyCareersFuture (Singapore government portal), LinkedIn, Indeed, and direct company career pages. We use the JSearch API (RapidAPI) for global coverage and the MCF API for Singapore-specific roles.',
      },
      {
        q: 'How does the interview probability score work?',
        a: 'Our AI compares your profile (skills, experience, education) against each job\'s requirements and historical hiring patterns. The score is an estimate — not a guarantee — but it helps you prioritize where to invest your time.',
      },
      {
        q: 'What resume formats are supported?',
        a: 'We support PDF, DOCX, and plain text. Our AI analyzes your resume against each JD and provides ATS optimization tips, keyword suggestions, and a tailored version for each role.',
      },
      {
        q: 'Which countries/regions are supported?',
        a: 'Singapore is our primary market, with strong coverage for Korea, Japan, Australia, and the UK. We\'re expanding to more countries based on user demand.',
      },
      {
        q: 'I need a work visa — can JobPA help?',
        a: 'Yes! Our AI Career Chat can answer visa-related questions, and we have immigration lawyers available for 1:1 consulting sessions. We also filter out jobs that explicitly require PR or citizenship.',
      },
      {
        q: 'Is JobPA free to use?',
        a: 'The core features — job search, AI matching, and interview probability — are free. Premium features like unlimited resume customization, priority alerts, and 1:1 consulting sessions are available as paid add-ons.',
      },
    ],
  },
  ko: {
    badge: '자주 묻는 질문',
    title: '자주 묻는 질문',
    sub: 'JobPA에 대해 궁금한 모든 것.',
    faqs: [
      {
        q: 'JobPA가 자동으로 지원해주나요?',
        a: '아니요 — JobPA는 자동 지원 봇이 아닌 AI 기반 전략 파트너입니다. 최적의 공고를 찾고, 인터뷰 확률을 분석하고, 지원 자료를 준비하는 것을 도와드립니다. 최종 지원 결정은 항상 본인이 합니다.',
      },
      {
        q: '어떤 플랫폼의 공고를 다루나요?',
        a: 'MyCareersFuture(싱가포르 정부 포털), LinkedIn, Indeed, 회사 채용 홈페이지를 크롤링합니다. 글로벌 커버리지를 위해 JSearch API(RapidAPI)를, 싱가포르 특화 공고를 위해 MCF API를 사용합니다.',
      },
      {
        q: '인터뷰 확률 점수는 어떻게 계산되나요?',
        a: 'AI가 내 프로필(스킬, 경력, 학력)을 각 공고의 요구사항 및 과거 채용 패턴과 비교합니다. 점수는 추정치이며 보장이 아니지만, 어디에 시간을 투자할지 우선순위를 정하는 데 도움이 됩니다.',
      },
      {
        q: '어떤 이력서 형식을 지원하나요?',
        a: 'PDF, DOCX, 일반 텍스트를 지원합니다. AI가 각 JD에 맞게 이력서를 분석하고 ATS 최적화 팁, 키워드 제안, 맞춤 버전을 제공합니다.',
      },
      {
        q: '어떤 국가/지역을 지원하나요?',
        a: '싱가포르가 주요 시장이며, 한국, 일본, 호주, 영국도 강력하게 지원합니다. 사용자 수요에 따라 더 많은 국가로 확장 중입니다.',
      },
      {
        q: '취업 비자가 필요한데 도움받을 수 있나요?',
        a: '네! AI 커리어 챗에서 비자 관련 질문에 답변받을 수 있고, 이민 변호사와 1:1 컨설팅도 예약 가능합니다. PR이나 시민권을 명시적으로 요구하는 공고는 자동으로 필터링됩니다.',
      },
      {
        q: 'JobPA는 무료인가요?',
        a: '핵심 기능인 공고 검색, AI 매칭, 인터뷰 확률은 무료입니다. 무제한 이력서 커스터마이징, 우선 알림, 1:1 컨설팅 세션은 유료 부가 서비스로 제공됩니다.',
      },
    ],
  },
};

export default function FAQSection({ lang }: FAQSectionProps) {
  const tx = t[lang];
  const [open, setOpen] = useState<number | null>(null);
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
      <div className="container max-w-3xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-10 transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-semibold text-slate-600">{tx.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            {tx.title}
          </h2>
          <p className="text-muted-foreground text-sm">{tx.sub}</p>
        </div>

        <div className="flex flex-col gap-3">
          {tx.faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                open === i ? 'border-indigo-200 bg-indigo-50/30' : 'border-border bg-white'
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-sm text-foreground" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    open === i ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

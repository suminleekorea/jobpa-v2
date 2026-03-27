# JobPA v2 — 디자인 아이디어 브레인스토밍

## 배경 및 목표
- 올인원 AI 취업비서 (C방향): 공고 검색 + JD 매칭 + 인터뷰 확률 + 컨설팅 마켓
- 대시보드가 "구직 사이트처럼 느껴진다"는 피드백 → 더 인터랙티브하고 정보 밀도 높게
- 네이버처럼 위젯형, 다양한 콘텐츠 블록이 공존하는 메인화면

---

<response>
<text>
## Option A — "Seoul Signal" (도시형 정보 대시보드)

**Design Movement:** Korean Portal + Data-Dense Dashboard (Naver/Kakao 스타일)

**Core Principles:**
1. 정보 밀도 우선 — 위젯 그리드로 한 화면에 최대한 많은 정보
2. 컬러 코딩 — 인터뷰 확률, 매칭 점수 등 수치를 색상으로 즉각 전달
3. 탭/필터 인터랙션 — 공고 카테고리, 산업, 국가별 빠른 전환
4. 실시간 피드 느낌 — 공고 카드가 스크롤되는 뉴스피드 형태

**Color Philosophy:**
- 배경: 연한 회색(#F5F6FA) — 위젯들이 카드로 떠오르는 느낌
- 포인트: 코발트 블루(#1A6FFF) + 에메랄드 그린(#00C896) — 신뢰 + 성장
- 위험/낮은 확률: 오렌지(#FF6B35)
- 텍스트: 차콜(#1C1C2E)

**Layout Paradigm:**
- 상단: 검색바 + 빠른 필터 (직군/국가/연봉)
- 중단: 3열 위젯 그리드 (추천공고 / 인터뷰확률 / 트렌드뉴스)
- 하단: 컨설턴트 마켓플레이스 + 클래스

**Signature Elements:**
1. 인터뷰 확률 게이지 바 (초록/노랑/빨강)
2. 공고 카드에 "MCF / LinkedIn / 회사홈피" 멀티소스 배지
3. 실시간 트렌딩 스킬 태그 클라우드

**Interaction Philosophy:** 클릭 없이도 정보 파악 가능, 호버 시 상세 미리보기

**Animation:** 카드 스태거 애니메이션, 확률 게이지 카운트업, 탭 전환 슬라이드

**Typography System:**
- 헤딩: Pretendard Bold (한국어 최적화)
- 바디: Pretendard Regular
- 숫자/데이터: Tabular nums, mono feel
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Option B — "Career Cockpit" (프리미엄 SaaS 대시보드)

**Design Movement:** Modern SaaS + Dark Mode Analytics (Notion/Linear 스타일)

**Core Principles:**
1. 다크 배경 위 데이터 시각화 강조
2. 좌측 사이드바 네비게이션 + 메인 콘텐츠 영역
3. 그래프/차트로 취업 시장 트렌드 시각화
4. 프리미엄 느낌의 컨설팅 섹션

**Color Philosophy:**
- 배경: 딥 네이비(#0F1117) + 카드: #1A1D2E
- 포인트: 일렉트릭 블루(#4F8EF7) + 민트(#4ECDC4)
- 그라디언트 강조: 블루→퍼플

**Layout Paradigm:**
- 좌측 고정 사이드바 (네비게이션)
- 우측 메인: 히어로 → 공고 피드 → 분석 대시보드

**Signature Elements:**
1. 레이더 차트 (스킬 매칭 시각화)
2. 타임라인 형태의 취업 여정 트래커
3. 다크 글래스모피즘 카드

**Interaction Philosophy:** 사이드바 탐색, 드릴다운 분석

**Animation:** 페이드인 + 슬라이드업, 차트 드로잉 애니메이션

**Typography System:**
- 헤딩: Space Grotesk Bold
- 바디: DM Sans Regular
</text>
<probability>0.07</probability>
</response>

<response>
<text>
## Option C — "Momentum" (에너지 넘치는 커리어 런치패드) ← SELECTED

**Design Movement:** Bold Editorial + Interactive Portal (Naver 위젯 + Figma 에너지)

**Core Principles:**
1. 비대칭 레이아웃 — 왼쪽 무거운 히어로 + 오른쪽 라이브 위젯 패널
2. 타이포그래피 주도 — 큰 숫자/통계가 시각적 앵커 역할
3. 위젯 모듈화 — 각 기능이 독립 카드로 존재, 네이버처럼 정보 밀도
4. 색상으로 상태 전달 — 인터뷰 확률, 매칭 점수 즉각 인식

**Color Philosophy:**
- 배경: 따뜻한 오프화이트(#FAFAF8) — 딱딱하지 않은 느낌
- 포인트: 인디고(#4338CA) — 전문성 + 신뢰
- 강조: 앰버(#F59E0B) — 액션 유도, 인터뷰 확률 하이라이트
- 성공: 에메랄드(#10B981)
- 카드 배경: 순백(#FFFFFF) with 섬세한 그림자

**Layout Paradigm:**
- 히어로: 좌측 카피 + 우측 라이브 공고 미리보기 위젯 (비대칭 스플릿)
- 기능 섹션: 마소리 그리드 (크기 다른 카드들이 벽돌처럼)
- 추천 공고: 가로 스크롤 카드 + 인터뷰 확률 배지
- 컨설팅: 멘트리 스타일 프로필 카드 그리드

**Signature Elements:**
1. 인터뷰 확률 원형 게이지 (애니메이션 카운트업)
2. 멀티소스 배지 (MCF / LinkedIn / Company 아이콘)
3. 실시간 공고 피드 (스크롤 애니메이션)

**Interaction Philosophy:**
- 검색창에서 직군 입력 → 즉각 공고 미리보기
- 호버 시 카드 확장 + 인터뷰 확률 상세
- 구글폼 피드백 플로팅 버튼

**Animation:**
- 히어로 진입: 좌측 텍스트 슬라이드인 + 우측 카드 스태거
- 공고 카드: 호버 시 translateY(-4px) + 그림자 강화
- 확률 게이지: 페이지 진입 시 0→실제값 카운트업
- 섹션 진입: IntersectionObserver 기반 페이드인

**Typography System:**
- 헤딩: Sora ExtraBold (현대적, 강렬)
- 서브헤딩: Sora SemiBold
- 바디: Noto Sans KR (한국어 최적화)
- 숫자/데이터: Sora + tabular-nums
</text>
<probability>0.09</probability>
</response>

---

## 선택: Option C — "Momentum"

비대칭 레이아웃 + 위젯 모듈화 + 인디고/앰버 컬러 시스템으로 진행.

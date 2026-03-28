# JobPA — AI-Powered Career Strategy Partner

> **Manus × Vibecoding Consulting AI Hackathon 2025 · Singapore**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-job--pa.manus.space-6366f1?style=for-the-badge)](https://job-pa.manus.space)
[![Manus Session](https://img.shields.io/badge/Manus%20Session-Try%20Live-f59e0b?style=for-the-badge)](https://manus.im/share/5gFNUThvApmK28b741Yf8E)
[![Built with Manus](https://img.shields.io/badge/Built%20with-Manus%20AI-4338ca?style=for-the-badge)](https://manus.im)

---

## What is JobPA?

**JobPA** is an AI-powered career strategy partner built for job seekers in Singapore — especially those navigating the dual challenge of work visa requirements and competitive job markets. It was born from a personal pain point: as a Korean professional relocating to Singapore, the founder needed more than a job board. She needed an intelligent partner who understands her situation, thinks strategically with her, and takes action on her behalf.

JobPA is not just a dashboard. It is an **agentic AI system** that:

1. **Crawls the web in real time** — pulling live job postings from MyCareersFuture (MCF), LinkedIn, Indeed, Careers@Gov, and company sites simultaneously
2. **Scores JD match and interview probability** — using AI to compare your profile against each job description across keyword overlap, skills fit, experience level, and location preference
3. **Recommends 20 ranked jobs** — sorted by interview probability, with multi-source badges showing where each listing was found
4. **Generates Talent Market Intelligence** — for consultants and HR professionals, Manus assembles structured reports on salary benchmarks, skill demand trends, and hiring velocity by industry

---

## Target Users

| User | Pain Point | How JobPA Helps |
|---|---|---|
| **Job Seekers in Singapore** | Searching across MCF, LinkedIn, and company sites is fragmented and time-consuming | One search → 20 ranked matches from all sources, with interview probability |
| **Expats & Visa Holders** | Navigating work pass eligibility on top of job search is overwhelming | AI career chat with visa-aware guidance |
| **HR Consultants** | Building talent market reports manually takes days | Manus generates structured intelligence reports in minutes |
| **Career Coaches** | Matching clients to roles requires deep market knowledge | Real-time salary benchmarks and skill gap analysis |

---

## How It Works

```
User inputs job title / JD
        ↓
Manus Agent crawls MCF + LinkedIn + Indeed + Company Sites (live)
        ↓
AI scores each listing: keyword match × skills overlap × experience fit × location
        ↓
Returns 20 ranked jobs with interview probability %
        ↓
Optional: Resume customisation advice per job
        ↓
Daily Telegram digest → @jobpa_bot sends new matches every morning
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + TypeScript + Tailwind CSS 4 + Framer Motion |
| **Job Data API** | JSearch (RapidAPI) — aggregates LinkedIn, Indeed, Glassdoor, MCF |
| **AI Agent** | Manus AI — web crawling, document analysis, report generation |
| **Notifications** | Telegram Bot (@jobpa_bot) — daily job digest |
| **Feedback** | Google Forms embedded widget |
| **Hosting** | Manus (job-pa.manus.space) |

---

## Key Features

- **Real-time multi-source job crawling** — MCF, LinkedIn, Indeed, Careers@Gov, FastJobs
- **Interview probability scoring** — AI-calculated per job, with tooltip explanation
- **JD Match & Resume Analysis** — paste any JD, get ranked matches + resume feedback
- **Talent Market Intelligence** — for consultants: live salary data, skill trends, hiring velocity
- **Consulting Marketplace** — book 1:1 sessions with industry-specific career coaches
- **Classes & Seminars** — career development workshops with live seat tracking
- **Daily Telegram Alerts** — subscribe via @jobpa_bot for morning job digests
- **Bilingual UI** — full English / Korean support

---

## Hackathon Submission

**Use Case:** AI-powered talent intelligence and job matching for Singapore's competitive job market, with a specific focus on expat professionals navigating visa requirements.

**Creative Use of Manus:** Manus acts as an autonomous agent — it does not merely generate text. It browses live job platforms, pulls salary data, analyses uploaded resumes against JDs, and assembles structured intelligence reports. The "See Manus Take Action" section demonstrates two live agent workflows: (1) JD Match & Resume Analysis for job seekers, and (2) Talent Market Intelligence for consultants and HR professionals.

**Commercial Viability:** JobPA targets a clear willingness-to-pay segment — job seekers and HR consultants in Singapore who currently spend hours on manual research. The consulting marketplace and class/seminar booking features create additional monetisation layers beyond the core AI tool.

---

## Running Locally

```bash
git clone https://github.com/suminleekorea/jobpa-v2
cd jobpa-v2
pnpm install
pnpm dev
```

The app runs on `http://localhost:3000`. Job data is fetched from JSearch RapidAPI — add your key to the `.env` file:

```
VITE_JSEARCH_API_KEY=your_rapidapi_key_here
```

---

## Feedback

Try the live demo and leave feedback via the in-app feedback widget, or directly at:
[forms.gle/ZxGFeRvE7qZ8yqVc9](https://forms.gle/ZxGFeRvE7qZ8yqVc9)

---

*Built with ❤️ by Sumin Lee for the Manus × Vibecoding Consulting AI Hackathon · Singapore · April 2025*

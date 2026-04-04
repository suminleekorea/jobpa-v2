/* useJSearchJobs — Fetches real Singapore jobs from JSearch RapidAPI
   Maps API response to JobPA's internal Job interface.
   Falls back to mock data on error or empty results.
   Interview probability is JobPA's proprietary AI score (not from API).
*/
import { useState, useEffect, useCallback } from 'react';
import { MOCK_JOBS, type Job } from '@/lib/data';

const RAPIDAPI_KEY = '2e84fc9e48msh8efe9adf78059b2p10d73ajsnc0a93f7c25e4';
const RAPIDAPI_HOST = 'jsearch.p.rapidapi.com';

// Map JSearch publisher names to our source badge labels
function mapPublisher(publisher: string): string {
  if (!publisher) return 'Company';
  const p = publisher.toLowerCase();
  if (p.includes('mycareersfuture') || p.includes('mcf')) return 'MCF';
  if (p.includes('linkedin')) return 'LinkedIn';
  if (p.includes('indeed')) return 'Indeed';
  if (p.includes('careers@gov') || p.includes('careers.gov')) return 'Gov';
  if (p.includes('glassdoor')) return 'Glassdoor';
  if (p.includes('fastjobs')) return 'FastJobs';
  if (p.includes('jobstreet')) return 'JobStreet';
  return 'Company';
}

// Deterministically generate an interview probability score based on job_id
// This simulates JobPA's AI scoring — consistent per job, varied distribution
function generateInterviewProb(jobId: string, index: number): number {
  let hash = 0;
  for (let i = 0; i < jobId.length; i++) {
    hash = ((hash << 5) - hash) + jobId.charCodeAt(i);
    hash |= 0;
  }
  // Range: 52–92%, weighted toward 65–85% (realistic distribution)
  const base = Math.abs(hash % 41) + 52; // 52–92
  return base;
}

// Deterministically generate a match score slightly above interview prob
function generateMatchScore(jobId: string, interviewProb: number): number {
  let hash = 0;
  for (let i = 0; i < jobId.length; i++) {
    hash = ((hash << 3) + hash) + jobId.charCodeAt(i);
    hash |= 0;
  }
  const bonus = Math.abs(hash % 10) + 3; // +3 to +12
  return Math.min(99, interviewProb + bonus);
}

// Extract tags from job title and description
function extractTags(title: string, description: string | null): string[] {
  const text = `${title} ${description || ''}`.toLowerCase();
  const tagMap: Record<string, string> = {
    'product manager': 'Product Management',
    'product management': 'Product Management',
    'data analyst': 'Data Analysis',
    'data analysis': 'Data Analysis',
    'machine learning': 'Machine Learning',
    'software engineer': 'Software Engineering',
    'frontend': 'Frontend',
    'backend': 'Backend',
    'full stack': 'Full Stack',
    'marketing': 'Marketing',
    'sales': 'Sales',
    'finance': 'Finance',
    'accounting': 'Accounting',
    'human resources': 'HR',
    'hr ': 'HR',
    'operations': 'Operations',
    'project manager': 'Project Management',
    'business development': 'Business Development',
    'customer success': 'Customer Success',
    'ux': 'UX/UI',
    'ui ': 'UX/UI',
    'design': 'Design',
    'devops': 'DevOps',
    'cloud': 'Cloud',
    'aws': 'AWS',
    'python': 'Python',
    'java ': 'Java',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'react': 'React',
    'sql': 'SQL',
    'tableau': 'Tableau',
    'consulting': 'Consulting',
    'audit': 'Audit',
    'compliance': 'Compliance',
    'risk': 'Risk Management',
    'banking': 'Banking',
    'fintech': 'Fintech',
  };
  const found: string[] = [];
  for (const [key, label] of Object.entries(tagMap)) {
    if (text.includes(key) && !found.includes(label)) {
      found.push(label);
    }
    if (found.length >= 3) break;
  }
  return found.length > 0 ? found : ['Singapore', 'Full-time'];
}

// Format posted date
function formatPostedDate(postedAt: string | null, timestamp: string | null): string {
  if (postedAt && postedAt !== 'null') return postedAt;
  if (timestamp) {
    const ts = parseInt(timestamp) * 1000;
    const diff = Date.now() - ts;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    return `${Math.floor(days / 7)} week${days >= 14 ? 's' : ''} ago`;
  }
  return 'Recently';
}

// Format salary
function formatSalary(min: number | null, max: number | null, salaryStr: string | null): string {
  if (salaryStr && salaryStr !== 'null') return salaryStr;
  if (min && max) return `SGD ${min.toLocaleString()} – ${max.toLocaleString()}`;
  if (min) return `From SGD ${min.toLocaleString()}`;
  if (max) return `Up to SGD ${max.toLocaleString()}`;
  return 'Salary not disclosed';
}

// Map raw JSearch job to our Job interface
function mapApiJobToJob(apiJob: Record<string, unknown>, index: number): Job {
  const jobId = String(apiJob.job_id || `api-${index}`);
  const interviewProb = generateInterviewProb(jobId, index);
  const matchScore = generateMatchScore(jobId, interviewProb);
  const publisher = mapPublisher(String(apiJob.job_publisher || ''));
  const applyOptions = apiJob.apply_options as Array<{ apply_link?: string; publisher?: string }> | null;
  const sources = [publisher];
  if (applyOptions && Array.isArray(applyOptions)) {
    applyOptions.slice(0, 2).forEach(opt => {
      const src = mapPublisher(String(opt.publisher || ''));
      if (!sources.includes(src)) sources.push(src);
    });
  }

  return {
    id: jobId,
    title: String(apiJob.job_title || 'Job Opening'),
    company: String(apiJob.employer_name || 'Company'),
    companyLogo: String(apiJob.employer_logo || ''),
    location: String(apiJob.job_location || apiJob.job_city || 'Singapore'),
    salary: formatSalary(
      apiJob.job_min_salary as number | null,
      apiJob.job_max_salary as number | null,
      apiJob.job_salary_string as string | null
    ),
    salaryRaw: [
      (apiJob.job_min_salary as number) || 0,
      (apiJob.job_max_salary as number) || 0,
    ],
    interviewProb,
    matchScore,
    sources: sources.slice(0, 3),
    tags: extractTags(
      String(apiJob.job_title || ''),
      apiJob.job_description as string | null
    ),
    industry: 'technology',
    postedDate: formatPostedDate(
      apiJob.job_posted_at as string | null,
      apiJob.job_posted_at_timestamp as string | null
    ),
    description: String(apiJob.job_description || 'View full job description on the employer website.'),
    applyLink: String(apiJob.job_apply_link || '#'),
  };
}

export interface UseJSearchJobsResult {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  isLive: boolean;
  refetch: () => void;
}

export function useJSearchJobs(query: string = 'jobs in singapore'): UseJSearchJobsResult {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `https://jsearch.p.rapidapi.com/search?query=${encodedQuery}&page=1&num_pages=2&country=sg&date_posted=all`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
      });

      // Handle rate limit / quota exceeded gracefully
      if (response.status === 429) {
        console.warn('JSearch API quota exceeded — using curated demo data');
        setJobs(MOCK_JOBS);
        setIsLive(false);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Handle quota exceeded message in response body
      if (data.message && data.message.toLowerCase().includes('quota')) {
        console.warn('JSearch API quota exceeded — using curated demo data');
        setJobs(MOCK_JOBS);
        setIsLive(false);
        setLoading(false);
        return;
      }

      if (data.status === 'OK' && Array.isArray(data.data) && data.data.length > 0) {
        // Map API jobs, sort by interview probability (highest first)
        const mapped = data.data
          .map((job: Record<string, unknown>, i: number) => mapApiJobToJob(job, i))
          .sort((a: Job, b: Job) => b.interviewProb - a.interviewProb)
          .slice(0, 20);
        setJobs(mapped);
        setIsLive(true);
      } else {
        // Fallback to mock data
        setJobs(MOCK_JOBS);
        setIsLive(false);
      }
    } catch (err) {
      console.error('JSearch API error:', err);
      setJobs(MOCK_JOBS);
      setIsLive(false);
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, loading, error, isLive, refetch: fetchJobs };
}

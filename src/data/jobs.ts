/**
 * JOB OPENINGS
 * ─────────────────────────────────────────────────────────────
 * Add, edit or remove jobs below, then commit & push — the site rebuilds automatically.
 * The entries below are SAMPLE openings to show the layout. Replace them with real ones
 * (or set `jobs` to an empty array [] to show a "no openings right now" message).
 * `industry` should match one of the industry titles in industries.ts.
 */
export interface Job {
  id: string;
  title: string;
  industry: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Internship';
  experience: string;
  summary: string;
  posted: string; // YYYY-MM-DD
}

export const jobs: Job[] = [
  {
    id: 'relationship-manager',
    title: 'Relationship Manager',
    industry: 'Banking & Finance',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '2–5 years',
    summary: 'Manage and grow a portfolio of retail banking customers, cross-selling financial products.',
    posted: '2026-11-10',
  },
  {
    id: 'software-developer',
    title: 'Software Developer (Full Stack)',
    industry: 'IT & Technology',
    location: 'Bengaluru (Hybrid)',
    type: 'Full-time',
    experience: '1–4 years',
    summary: 'Build and maintain web applications using modern JavaScript frameworks and REST APIs.',
    posted: '2026-11-08',
  },
  {
    id: 'production-supervisor',
    title: 'Production Supervisor',
    industry: 'Manufacturing',
    location: 'Pune',
    type: 'Full-time',
    experience: '3–6 years',
    summary: 'Supervise shop-floor teams, production schedules, safety and quality standards.',
    posted: '2026-11-05',
  },
  {
    id: 'area-sales-manager',
    title: 'Area Sales Manager',
    industry: 'Sales & Marketing',
    location: 'Delhi NCR',
    type: 'Full-time',
    experience: '4–8 years',
    summary: 'Lead a field sales team, drive distributor growth and achieve regional targets.',
    posted: '2026-11-03',
  },
  {
    id: 'staff-nurse',
    title: 'Staff Nurse',
    industry: 'Healthcare',
    location: 'Hyderabad',
    type: 'Full-time',
    experience: '0–3 years',
    summary: 'Provide patient care in a multi-speciality hospital. GNM / B.Sc Nursing required.',
    posted: '2026-10-30',
  },
  {
    id: 'store-manager',
    title: 'Store Manager',
    industry: 'Retail',
    location: 'Ahmedabad',
    type: 'Contract',
    experience: '3–5 years',
    summary: 'Run day-to-day store operations, staff rosters, inventory and customer experience.',
    posted: '2026-10-28',
  },
];

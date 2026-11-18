/**
 * JOB OPENINGS
 * ─────────────────────────────────────────────────────────────
 * Add, edit or remove jobs below, then commit & push — the site rebuilds automatically.
 * When the list is empty, the site shows a "no openings right now" message with a resume upload prompt.
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

export const jobs: Job[] = [];

/* Example entry — copy into the array above when you have an opening:
  {
    id: 'relationship-manager', // unique, lowercase, no spaces
    title: 'Relationship Manager',
    industry: 'Banking & Finance',
    location: 'Surat',
    type: 'Full-time',
    experience: '2–5 years',
    summary: 'Manage and grow a portfolio of retail banking customers.',
    posted: '2026-11-18',
  },
*/

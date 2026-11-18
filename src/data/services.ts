export interface Service {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  description: string;
  points: string[];
}

export const services: Service[] = [
  {
    slug: 'permanent-staffing',
    title: 'Permanent Staffing',
    icon: 'briefcase',
    summary: 'Find long-term professionals who fit your role, your team and your culture.',
    description:
      'We source, screen and shortlist candidates for full-time positions, assessing skills, experience and cultural alignment so you meet only the people worth interviewing.',
    points: ['Role and requirement mapping', 'Multi-channel candidate sourcing', 'Structured screening and shortlisting', 'Interview coordination through to offer'],
  },
  {
    slug: 'contract-staffing',
    title: 'Contract Staffing',
    icon: 'file-text',
    summary: 'Flexible, skilled talent for projects, peak seasons and short-term needs.',
    description:
      'Scale your workforce up or down without long-term commitments. We provide qualified contract professionals and support the onboarding process so work continues without disruption.',
    points: ['Short- and long-term contracts', 'Fast deployment of pre-screened talent', 'Support with documentation and onboarding', 'Option to convert contract to permanent'],
  },
  {
    slug: 'bulk-recruitment',
    title: 'Bulk Recruitment',
    icon: 'users',
    summary: 'High-volume hiring delivered with speed, structure and consistent quality.',
    description:
      'When you need to hire many people at once — for expansion, new locations or seasonal demand — we run organised, high-volume drives without compromising on candidate quality.',
    points: ['Volume hiring drives and walk-ins', 'Standardised assessment processes', 'Dedicated coordination for large mandates', 'Regular progress reporting'],
  },
  {
    slug: 'executive-search',
    title: 'Executive Search',
    icon: 'crown',
    summary: 'Discreet, research-led search for senior and leadership roles.',
    description:
      'Leadership hires shape the direction of a business. Our executive search is confidential and research-driven, reaching proven leaders who may not be actively looking for a move.',
    points: ['Confidential, targeted search', 'Market mapping and talent research', 'In-depth candidate evaluation', 'Offer and transition support'],
  },
  {
    slug: 'talent-acquisition',
    title: 'Talent Acquisition',
    icon: 'user-search',
    summary: 'A strategic, end-to-end approach to building your workforce.',
    description:
      'Beyond filling a single vacancy, we help you plan and build the right teams — aligning hiring with business goals and strengthening how you attract and select talent.',
    points: ['Hiring needs and workforce planning', 'Employer branding guidance for job campaigns', 'Talent pipeline development', 'Candidate experience management'],
  },
  {
    slug: 'hr-recruitment-solutions',
    title: 'HR Recruitment Solutions',
    icon: 'clipboard-list',
    summary: 'Recruitment support that works as an extension of your HR team.',
    description:
      'We support your HR function with tailored recruitment processes — from job descriptions and screening frameworks to coordination — so your internal team can focus on people strategy.',
    points: ['Job description and role profiling', 'Screening and evaluation frameworks', 'Interview scheduling and coordination', 'Offer and joining follow-up'],
  },
  {
    slug: 'workforce-management',
    title: 'Workforce Management',
    icon: 'layers',
    summary: 'Keep the right people in the right roles as your business grows.',
    description:
      'We help you manage staffing levels across teams and locations, responding to changing demand with the right mix of permanent and flexible talent.',
    points: ['Staffing level planning', 'Flexible workforce models', 'Replacement and backfill support', 'Ongoing account management'],
  },
];

export interface Industry {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  roles: string[];
}

export const industries: Industry[] = [
  {
    slug: 'banking-finance',
    title: 'Banking & Finance',
    icon: 'landmark',
    summary: 'Professionals for banking operations, credit, accounts and finance functions.',
    roles: ['Relationship Managers', 'Credit & Loan Officers', 'Accountants', 'Branch Operations'],
  },
  {
    slug: 'bfsi',
    title: 'BFSI',
    icon: 'shield-check',
    summary: 'Talent across banking, financial services and insurance businesses.',
    roles: ['Insurance Advisors', 'Sales Officers', 'Collections', 'Back-office Operations'],
  },
  {
    slug: 'it-technology',
    title: 'IT & Technology',
    icon: 'cpu',
    summary: 'Technical talent for software, infrastructure and digital teams.',
    roles: ['Software Developers', 'QA Engineers', 'IT Support', 'Project Coordinators'],
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    icon: 'factory',
    summary: 'Skilled and semi-skilled workforce for plants and production units.',
    roles: ['Production Supervisors', 'Quality Inspectors', 'Machine Operators', 'Maintenance Technicians'],
  },
  {
    slug: 'automobile',
    title: 'Automobile',
    icon: 'car',
    summary: 'People for automotive manufacturing, dealerships and service networks.',
    roles: ['Service Advisors', 'Sales Consultants', 'Technicians', 'Workshop Managers'],
  },
  {
    slug: 'retail',
    title: 'Retail',
    icon: 'shopping-bag',
    summary: 'Store, operations and customer-facing teams for retail businesses.',
    roles: ['Store Managers', 'Retail Associates', 'Visual Merchandisers', 'Inventory Executives'],
  },
  {
    slug: 'sales-marketing',
    title: 'Sales & Marketing',
    icon: 'trending-up',
    summary: 'Revenue-driving talent for field sales, inside sales and marketing.',
    roles: ['Business Development', 'Area Sales Managers', 'Digital Marketing', 'Telesales'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    icon: 'heart-pulse',
    summary: 'Clinical and non-clinical staff for hospitals, clinics and healthcare firms.',
    roles: ['Nursing Staff', 'Front Office & Billing', 'Medical Representatives', 'Lab Technicians'],
  },
];

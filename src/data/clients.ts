/**
 * CLIENTS shown in the moving bar on the home page.
 * Add, remove or reorder entries below.
 * `logo` is a square icon in /public/clients/ (transparent PNG, ~128×128). Leave it out to show `short` initials instead.
 */
export interface Client {
  name: string;
  short: string;
  type: 'Insurance' | 'Bank' | 'Small Finance Bank' | 'Finance';
  logo?: string;
}

export const clients: Client[] = [
  { name: 'HDFC Life Insurance', short: 'HL', type: 'Insurance', logo: '/clients/hdfc-life.png' },
  { name: 'Axis Max Life Insurance', short: 'AM', type: 'Insurance', logo: '/clients/axis-max-life.png' },
  { name: 'Kotak Life Insurance', short: 'KL', type: 'Insurance', logo: '/clients/kotak-life.png' },
  { name: 'Generali Central Life Insurance', short: 'GC', type: 'Insurance', logo: '/clients/generali-central.png' },
  { name: 'Axis Bank', short: 'AX', type: 'Bank', logo: '/clients/axis-bank.png' },
  { name: 'Kotak Bank', short: 'KB', type: 'Bank', logo: '/clients/kotak-bank.png' },
  { name: 'IDFC First Bank', short: 'ID', type: 'Bank', logo: '/clients/idfc-first.png' },
  { name: 'IndusInd Bank', short: 'IB', type: 'Bank', logo: '/clients/indusind.png' },
  { name: 'AU Small Finance Bank', short: 'AU', type: 'Small Finance Bank', logo: '/clients/au-sfb.png' },
  { name: 'Utkarsh Small Finance Bank', short: 'US', type: 'Small Finance Bank', logo: '/clients/utkarsh-sfb.png' },
  { name: 'HDB Financial Services', short: 'HDB', type: 'Finance', logo: '/clients/hdb-financial.png' },
  { name: 'Niwas Housing Finance', short: 'NH', type: 'Finance', logo: '/clients/niwas-housing.png' },
];

/**
 * CLIENTS shown in the moving bar on the home page.
 * Add, remove or reorder names below. `short` is the label shown inside the round badge.
 */
export interface Client {
  name: string;
  short: string;
  type: 'Insurance' | 'Bank' | 'Small Finance Bank' | 'Finance';
}

export const clients: Client[] = [
  { name: 'HDFC Life Insurance', short: 'HL', type: 'Insurance' },
  { name: 'Axis Max Life Insurance', short: 'AM', type: 'Insurance' },
  { name: 'Kotak Life Insurance', short: 'KL', type: 'Insurance' },
  { name: 'Generali Central Life Insurance', short: 'GC', type: 'Insurance' },
  { name: 'Axis Bank', short: 'AX', type: 'Bank' },
  { name: 'Kotak Bank', short: 'KB', type: 'Bank' },
  { name: 'IDFC First Bank', short: 'ID', type: 'Bank' },
  { name: 'IndusInd Bank', short: 'IB', type: 'Bank' },
  { name: 'AU Small Finance Bank', short: 'AU', type: 'Small Finance Bank' },
  { name: 'Utkarsh Small Finance Bank', short: 'US', type: 'Small Finance Bank' },
  { name: 'HDF Finance', short: 'HF', type: 'Finance' },
  { name: 'Nivaas Housing Finance', short: 'NH', type: 'Finance' },
];

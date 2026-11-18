/**
 * ─────────────────────────────────────────────────────────────
 *  GROWHIGH STAFFING — SITE SETTINGS
 *  Edit the values below to update details across the whole site.
 *  Anything marked TODO is a placeholder: replace it before launch.
 *  Set a value to an empty string ('') to hide it everywhere.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Growhigh Staffing',
  legalName: 'Growhigh Staffing',
  tagline: 'Growing Careers, Building Businesses.',
  description:
    'Growhigh Staffing is a recruitment and staffing solutions company connecting businesses with skilled, qualified professionals — permanent staffing, contract staffing, bulk hiring, executive search and workforce solutions.',
  url: 'https://growhighstaffing.com',

  // ── Contact details ───────────────────────────────────────
  email: 'info@growhighstaffing.com',
  // Phone numbers — the first one is the primary number. `href` = digits with country code, used for tel: links.
  phones: [
    { display: '+91 99250 94335', href: '+919925094335' },
    { display: '+91 75740 31556', href: '+917574031556' },
  ],
  whatsapp: '916323273354', // WhatsApp number, digits only with country code (no + or spaces)
  whatsappDisplay: '+91 63232 73354', // WhatsApp number as shown on the site
  whatsappMessage: 'Hello Growhigh Staffing, I would like to know more about your recruitment services.',
  address: {
    line1: '204, Shrenaathji Icon',
    line2: 'Opp. Uttran Power Sub Station, VIP Circle, Mota Varachha',
    city: 'Surat',
    region: 'Gujarat',
    postalCode: '394105',
    country: 'India',
  },
  hours: 'Monday – Saturday, 9:00 AM – 6:00 PM',
  // Map shown on the Contact page (free Google Maps embed, no API key). Leave '' to hide the map.
  mapEmbedUrl:
    'https://maps.google.com/maps?q=' +
    encodeURIComponent('Shrenaathji Icon, VIP Circle, Mota Varachha, Surat, Gujarat 394105') +
    '&z=16&output=embed',

  // ── Social profiles (leave '' to hide) ────────────────────
  social: {
    linkedin: 'https://www.linkedin.com/company/growhighstaffing/',
    facebook: '',
    instagram: '',
    x: '',
  },

  // ── Forms (FormSubmit.co — free) ──────────────────────────
  // After the first test submission FormSubmit emails an activation link to the address below.
  // Once activated, you can replace the email with the random alias string FormSubmit gives you
  // (e.g. 'https://formsubmit.co/a1b2c3d4e5...') so your address is hidden from page source.
  formEndpoint: 'https://formsubmit.co/info@growhighstaffing.com',
  // Max resume size accepted by the upload field (FormSubmit attachments must stay small).
  maxResumeMB: 5,
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'Employers', href: '/employers/' },
  { label: 'Candidates', href: '/candidates/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const whatsappLink = (message: string = site.whatsappMessage) =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}` : '';

export const fullAddress = () =>
  [site.address.line1, site.address.line2, site.address.city, site.address.region, site.address.postalCode, site.address.country]
    .filter(Boolean)
    .join(', ');

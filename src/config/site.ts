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
  phone: '+91 00000 00000', // TODO: replace with your real phone number (shown on site)
  phoneHref: '+910000000000', // TODO: same number, digits only with country code, used for tel: links
  whatsapp: '910000000000', // TODO: WhatsApp number, digits only with country code (no + or spaces)
  whatsappMessage: 'Hello Growhigh Staffing, I would like to know more about your recruitment services.',
  address: {
    line1: 'Office address line 1', // TODO
    line2: 'Area / Landmark', // TODO
    city: 'City', // TODO
    region: 'State', // TODO
    postalCode: '000000', // TODO
    country: 'India', // TODO: confirm
  },
  hours: 'Monday – Saturday, 10:00 AM – 7:00 PM', // TODO: confirm business hours
  // Google Maps embed URL (Google Maps → Share → Embed a map → copy the src="..." value). Leave '' to hide the map.
  mapEmbedUrl: '',

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

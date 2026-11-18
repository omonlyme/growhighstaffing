# Growhigh Staffing — website

Static website for **growhighstaffing.com**, built with [Astro](https://astro.build) and hosted free on **GitHub Pages**.
DNS is on **Cloudflare**, email (info@growhighstaffing.com) is on **Zoho Mail Free**, and the forms send to that inbox through **FormSubmit.co** (also free).

---

## 1. Editing the website

| What to change | File |
|---|---|
| Phone, WhatsApp, address, hours, social links, map, form endpoint | `src/config/site.ts` |
| Job openings | `src/data/jobs.ts` |
| Services | `src/data/services.ts` |
| Industries | `src/data/industries.ts` |
| Process steps / "Why choose us" | `src/data/process.ts` |
| Page text | `src/pages/*.astro` |
| Colours, fonts, spacing | `src/styles/global.css` (the `:root` tokens at the top) |
| Photos | `src/assets/images/` |
| Logo | Replace `brand/logo-source.jpeg`, then run `python3 scripts/build-logos.py`. This regenerates every logo, favicon and the social-share image. |

> ⚠️ **Before launch:** replace every value marked `TODO` in `src/config/site.ts`: phone, WhatsApp number, address and hours. Also replace the **sample** jobs in `src/data/jobs.ts`, or set `jobs = []`.

Every push to `main` rebuilds and redeploys the site automatically (about 1–2 minutes).

### Run locally

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build into dist/
npm run preview   # preview the production build
```

---

## 2. Hosting: GitHub Pages + Cloudflare DNS

1. **GitHub → repo Settings → General:** make the repository **Public** (GitHub Pages is only free for public repos).
2. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes the site.
4. **Cloudflare → growhighstaffing.com → DNS → Records:** add the following, all set to **DNS only (grey cloud)**:

   | Type | Name | Content |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `omonlyme.github.io` |

5. **GitHub → Settings → Pages → Custom domain:** enter `growhighstaffing.com` and save. Once the DNS check passes and the certificate is issued (minutes to a few hours), tick **Enforce HTTPS**. `public/CNAME` already contains the domain.
6. *(Optional)* Once HTTPS works, you can switch the records to **Proxied (orange cloud)** for Cloudflare's CDN. If you do, set **SSL/TLS → Overview → Full**. Do not use "Flexible": it causes redirect loops.

*(Recommended)* Verify the domain under GitHub **profile → Settings → Pages → Add a domain** to stop anyone else from claiming it.

---

## 3. Email: info@growhighstaffing.com on Zoho Mail (Forever Free)

1. Sign up at **zoho.com/mail → Pricing → Forever Free plan** (up to 5 users, 5 GB each, webmail and mobile app). Add the domain `growhighstaffing.com`.
2. In **Cloudflare DNS**, add the records Zoho shows you. Copy the values from the Zoho console exactly: hosts differ by region, e.g. `zoho.in` for India and `zoho.com` for the US. All records must be **DNS only**.

   | Type | Name | Content | Priority |
   |---|---|---|---|
   | TXT | `@` | `zoho-verification=zb……zmverify.zoho.…` (from Zoho) | |
   | MX | `@` | `mx.zoho.in` (or `.com`) | 10 |
   | MX | `@` | `mx2.zoho.in` | 20 |
   | MX | `@` | `mx3.zoho.in` | 50 |
   | TXT | `@` | `v=spf1 include:zoho.in ~all` (or `include:zohomail.com`, exactly as Zoho shows) | |
   | TXT | `zmail._domainkey` | DKIM key from **Zoho Admin → Domains → Email Configuration → DKIM** | |
   | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@growhighstaffing.com` | |

3. Create the user/mailbox **info** in Zoho Admin, then click **Verify** for each record in Zoho.
4. **Do not enable Cloudflare Email Routing.** It replaces the MX records and would break Zoho.
5. Keep **only one** SPF (`v=spf1 …`) TXT record on `@`.
6. Use the Zoho Mail web app (mail.zoho.in / mail.zoho.com) or the Zoho Mail mobile app. The free plan has no IMAP/POP access.

---

## 4. Forms (FormSubmit.co)

All forms (contact, employer enquiry, callback, job application with resume upload) post to `formEndpoint` in `src/config/site.ts`. The default is `https://formsubmit.co/info@growhighstaffing.com`.

1. **After** the Zoho mailbox works, submit any form on the live site once.
2. FormSubmit emails an **activation link** to info@growhighstaffing.com. Click it. Until you do, submissions are not delivered.
3. *(Recommended)* The activation email also gives you a random alias string. Replace the endpoint with `https://formsubmit.co/<that-alias>` so your email address isn't visible in the page source.
4. Spam protection uses a hidden honeypot field. If spam becomes a problem, change `_captcha` to `"true"` in `src/components/forms/FormShell.astro`.
5. Each sender automatically gets a confirmation email (`_autoresponse`).

Resume uploads arrive as email attachments (PDF/DOC/DOCX, max 5 MB, set by `maxResumeMB`).

---

## What's intentionally not included (to stay 100% free)

- No database, admin panel or applicant-tracking system. Jobs are edited in `src/data/jobs.ts`, and applications arrive by email.
- No live chat. WhatsApp click-to-chat is used instead.
- Analytics: optional. Enable the free **Cloudflare Web Analytics** (works without the proxy by adding its JS snippet to `src/layouts/BaseLayout.astro`).

## Credits

Photos: [Unsplash](https://unsplash.com/license) (free to use). Icons: [Lucide](https://lucide.dev) (ISC) and [Simple Icons](https://simpleicons.org) (CC0). Fonts: Plus Jakarta Sans and Inter (OFL), self-hosted.

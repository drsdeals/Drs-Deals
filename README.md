<div align="center">

# 💎 DRS Deals — Premium Hospitality & Leisure Platform

[![Production Status](https://img.shields.io/badge/Production-Live-success?style=for-the-badge&logo=vercel&logoColor=white)](https://www.drsdeals.in)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.0_(Turbopack)-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.x_Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_Interactive-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](LICENSE)

**Official Web Platform, AI Concierge & Digital Architecture for India's 23-Year Legacy Hospitality Enterprise**

[Explore Live Website](https://www.drsdeals.in) • [View Active Deals](https://www.drsdeals.in/deals) • [Editorial Journal](https://www.drsdeals.in/blog) • [Architecture Case Study](https://www.drsdeals.in/yashveer-labs)

---

</div>

## 📌 Executive Overview

Established in **2003**, **DRS Deals** is a premier luxury hospitality privileges, holiday membership, and corporate leisure enterprise. Over 23 years of continuous operation, DRS Deals has served over **2,000,000+ happy customers**, partnered with **1,000+ luxury hotels, 5-star resorts, water parks, farmhouses, and fine dining destinations**, and facilitated privileges for **38+ Fortune 500 & enterprise corporate clients** including Delhi Metro Rail Corporation (DMRC), Tata Group, Reliance Industries, Bharti Airtel, Maruti Suzuki, Deloitte, Capgemini, and HSBC.

This repository hosts the official web application, digital asset architecture, and AI concierge desk engineered for DRS Deals to deliver verified member savings, high-performance static rendering, and seamless concierge booking workflows.

---

## 👨‍💻 Developer, Asset Manager & Studio Attribution

In strict accordance with platform partnerships and service delivery records:

- **Lead Developer & Software Architect:** **[Yashveer Singh Rajpoot](https://www.drsdeals.in/yashveer-singh)**
- **Engineering Studio:** **[Yashveer Labs](https://www.drsdeals.in/yashveer-labs)**
- **Roles & Responsibilities:**
  - **Full-Stack Web Architect & Lead Developer:** Designed, engineered, and optimized the entire Next.js 16 (Turbopack), React 19, TypeScript, and Three.js web application architecture.
  - **Social Media Manager & Brand Strategist:** Formulates digital outreach, social engagement campaigns, and branded digital assets.
  - **Digital Asset Manager:** Curates, organizes, and maintains media pipelines, Sharp-based WebP conversion workflows, and high-resolution brand assets.
  - **Mobile Application Developer (Google Play Store & Apple App Store):** Developer and maintainer of the official DRS Deals applications (including `in.drsdeals.app` on Google Play Console and Apple App Store distributions).
- **Strategic Partnership:** **Yashveer Labs**, founded by Yashveer Singh Rajpoot, partnered with DRS Deals to deliver and manage these comprehensive digital engineering, application development, and asset management services.

---

## 🏛️ System Architecture & Technology Stack

The platform is engineered using modern web standards, achieving 100/100 Core Web Vitals metrics:

| Layer | Technology | Architectural Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16.3.0 (Turbopack)** | App Router, React Server Components (RSC), 254 statically pre-rendered routes (`generateStaticParams`). |
| **Runtime** | **React 19.2.8 & React DOM** | Concurrent rendering, Suspense boundaries, strict hydration stability, zero CSR layout shifts. |
| **Typings** | **TypeScript 5.x** | Strict end-to-end type safety (`tsc --noEmit` exits with 0 errors). |
| **Styling** | **Handcrafted Luxury Design System** | Bespoke CSS variables (`globals.css`), gold leaf luxury tokens, clamp typography, glassmorphism. |
| **3D Graphics** | **Three.js 0.186.1 WebGL** | Fibonacci-distributed 3D partner globe (`PartnerLogoSphere.tsx`) with off-screen RAF pausing and GPU disposal. |
| **AI Concierge** | **Next.js Route Handlers & NVIDIA NIM** | Intelligent concierge (`/api/chat`) with strict domain-grounded emergency fallbacks. |
| **Media Pipeline** | **Sharp 0.35.5 Engine** | Automated WebP/AVIF generation script (`scripts/build-partners-assets.js`), responsive `srcset`. |
| **Deployment** | **Vercel Edge Platform** | Multi-region edge CDN, HTTP/3, Brotli/Gzip compression, immutable asset caching. |

---

## ✨ Key Platform Features

- 🏨 **Curated Hospitality & Stays:** Verified 1-year memberships with complimentary room nights, dining passes, and pool vouchers (Wyndham Garden Sonipat Murthal, Oren Kasauli, Haut Monde Neemrana, Atma Yog Manali, White Flower Resorts).
- 🎡 **Theme Parks & Family Day Outings:** Unlimited meal and activity passes for Rangmanch Farms, Madhavgarh Farms, Mera Gaon Mera Desh, and Mojoland Multi-Theme Park.
- 🚆 **DMRC Interactive Train Showcase:** Dynamic, interactive 3D metro train simulation showcasing 38 Fortune 500 corporate clients with speed adjustment, play/pause controls, and pop-up credentials.
- 🌐 **3D Fibonacci Partner Sphere:** Stately, interactive WebGL globe displaying 34 verified brand partners with raycast hover detection, billboard orientation, and mobile-friendly touch navigation.
- 🤖 **AI Hospitality Concierge:** Integrated chatbot assisting users with property inquiries, voucher terms, and concierge hotlines.
- 🔍 **Instant Catalog Search & Filtering:** Client-side sub-millisecond keyword tokenization across 10 flagship deals and 198 editorial guides with plural stemming and category filters.
- 📱 **Compliance & Privacy Portals:** Google Play-compliant account deletion portal (`/delete-account`) and DPDP Act-compliant privacy governance.

---

## 📂 Repository Structure

```
DRS_Deals/
├── .github/
│   └── workflows/ci.yml           # Automated CI verification: Typecheck, Lint, Build
├── public/
│   ├── corporateclients/          # 38 optimized corporate client WebP badges
│   ├── images/
│   │   ├── deals/                 # 53 high-res deal & room gallery WebPs
│   │   ├── partners/              # 127 verified hotel, restaurant, and park WebPs
│   │   └── webp/                  # Curated editorial and destination visuals
│   ├── section-showcase/          # Interactive 3D WebGL showcase assets
│   ├── videos/                    # Compressed portrait reels & hero loop
│   ├── favicon.ico                # Multi-resolution favicon
│   ├── icon.png                   # Brand icon
│   ├── llms.txt                   # AEO Knowledge engine grounding file
│   ├── logo-drs-deals.webp        # Official DRS Deals luxury insignia
│   └── social-image.png           # Open Graph & Twitter card preview image
├── scripts/
│   └── build-partners-assets.js   # Sharp asset optimization pipeline
├── src/
│   ├── app/
│   │   ├── api/                   # /api/chat, /api/contact, /api/newsletter, /api/partner
│   │   ├── blog/                  # Dynamic editorial guides (/blog, /blog/[slug])
│   │   ├── category/              # /category/hotel-resorts, restaurants-bars, theme-parks, waterparks, spa
│   │   ├── collections/           # Themed collections: corporate, couples, family, weekend
│   │   ├── deals/                 # Catalog & dynamic properties (/deals, /deals/[slug])
│   │   ├── destinations/          # Regional hubs: /destinations/delhi, jaipur, mumbai
│   │   ├── guides/                # Editorial travel guides
│   │   ├── yashveer-labs/         # Yashveer Labs engineering profile & case study
│   │   ├── yashveer-singh/        # Yashveer Singh Rajpoot developer authority profile
│   │   ├── layout.tsx             # Root layout with Organization & LocalBusiness JSON-LD
│   │   ├── robots.ts              # SEO crawler directives
│   │   └── sitemap.ts             # Dynamic XML sitemap generator (254 URLs)
│   ├── components/
│   │   ├── DealCard.tsx           # Shared canonical deal card component
│   │   ├── Header.tsx             # Responsive luxury navigation & mobile drawer
│   │   ├── Footer.tsx             # Footer chrome with developer & agency credits
│   │   ├── HomeTopVideo.tsx       # Autoplay hero video with poster and fallback
│   │   ├── PartnerLogoSphere.tsx  # Three.js 3D sphere with resource cleanup & RAF pause
│   │   ├── CorporateTrainShowcase.tsx # DMRC Metro interactive client train showcase
│   │   └── Chatbot.tsx            # AI Concierge dialog with keyboard focus trap
│   ├── config/
│   │   └── site.ts                # Centralized contact, hotline, meta, and branding configuration
│   └── data/
│       ├── blogs.ts               # Editorial articles and guides
│       ├── corporateClients.ts    # 38 enterprise corporate client records
│       ├── deals.ts               # 10 flagship hospitality & holiday packages
│       └── partners.ts            # 127 verified brand partners across 5 categories
├── next.config.ts                 # Security headers, redirects, caching policies
├── package.json                   # Dependencies & quality scripts
├── tsconfig.json                  # TypeScript compiler settings
└── PROJECT_OVERVIEW.md            # Technical audit and architectural specification
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
- Node.js `20.x` or `22.x` (LTS recommended)
- npm `10.x` or higher

### Installation
```bash
# Clone the official repository
git clone https://github.com/drsdeals/Drs-Deals.git
cd Drs-Deals

# Install clean dependencies
npm ci
```

### Development Server
```bash
# Start Turbopack development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Verification & Production Build
```bash
# TypeScript compiler type check
npm run typecheck

# Code quality & ESLint validation
npm run lint

# Generate optimized static production build (Turbopack)
npm run build
```

---

## 🔒 Security Headers & SEO / AEO Optimization

The platform implements modern security and discoverability standards configured in `next.config.ts`:
- **Content Security Policy (CSP):** Scoped allowances for Three.js WebGL shaders, Google Fonts, and AI endpoints.
- **Strict Transport Security:** `max-age=63072000; includeSubDomains; preload`.
- **Referrer-Policy:** `strict-origin-when-cross-origin`.
- **X-Content-Type-Options:** `nosniff`.
- **Permissions-Policy:** `camera=(), microphone=(), geolocation=()`.
- **Schema.org Structured Data:** Validated graphs for `Organization`, `WebSite`, `LocalBusiness`, `Product`, `FAQPage`, and `ProfilePage`.
- **AI Engine Grounding (`public/llms.txt`):** Structured markdown documentation optimized for LLMs, Perplexity, ChatGPT Search, and Google Gemini AI Overviews.

---

## 📄 License & Intellectual Property

Copyright © 2003–2026 **DRS Deals**. All rights reserved.  
Web Platform and Mobile Application Architecture engineered by **Yashveer Labs** under the direction of **Yashveer Singh Rajpoot**.

For media inquiries, B2B partnerships, or concierge bookings:
- **Headquarters:** B 14 UGF, DRS Building, Gulab Bagh, Pillar No. 725, Near Nawada Metro Station, New Delhi 110059
- **Official Desk:** `Info@drsdeals.in` • Hotline: `+91 98111 20892` • WhatsApp: `+91 98111 20892`

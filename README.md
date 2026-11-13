# DRS Deals — Official Web Platform & Digital Architecture

<div align="center">

<img src="public/logo-drs-deals.webp" alt="DRS Deals Official Logo" width="160" height="160" style="border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.15);" />

### *Curated. Trusted. Unforgettable.*

[![Next.js](https://img.shields.io/badge/Next.js-16.3.0-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-0284C7?style=for-the-badge&logo=vercel&logoColor=white)](https://turbo.build/pack)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![NVIDIA NIM](https://img.shields.io/badge/NVIDIA_NIM-Nemotron_30B-76B900?style=for-the-badge&logo=nvidia&logoColor=white)](https://build.nvidia.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)

**[Visit Production Website → https://www.drsdeals.in](https://www.drsdeals.in)**

---

</div>

## 📌 Executive Overview & Brand Heritage

Founded in **2003**, **DRS Deals** is a premier promotional leisure and hospitality discovery platform with a **23-year legacy** across Northern and Western India. Rather than operating as a conventional transactional OTA (Online Travel Agency), DRS Deals operates a high-value promotional partnership model that connects discerning consumers with exclusive negotiated vouchers, privilege memberships, and group access passes.

### 🌟 Verified Enterprise & Consumer Scale
- 🏛️ **23-Year Industry Legacy:** Established in 2003 with deep regional field marketing foundations.
- 👥 **2M+ Satisfied Members:** Over two million families, couples, and executives served.
- 🤝 **1,000+ Hospitality Partners:** Direct partnerships across luxury resorts, dining chains, and adventure parks.
- 💰 **₹1B+ In Consumer Savings:** Negotiated promotional pricing delivering measurable household savings.
- 🎯 **240+ Active Verified Offers:** Curated deals across Delhi NCR, Haryana, Punjab, Rajasthan, and Uttar Pradesh.
- 🚆 **38 Corporate Express Partners:** Executive perks provider for DMRC, Tata Group, Reliance, Bharti Airtel, Maruti Suzuki, Deloitte, LIC, NTPC, Adani Power, and Hitachi.

---

## 🏗️ Core Hospitality & Leisure Verticals

| Category | Partner Venues & Brands | Scope & Experience Privileges |
| :--- | :--- | :--- |
| **Hotels & Resorts** | Wyndham Garden, Clarion Inn, Choice Hotels, Clark Inn, White Flower, Haut Monde, Vilasita Resort, Namaste Corbett | 5-star properties, heritage palaces, mountain retreats, luxury spa weekends, and complimentary night vouchers. |
| **Restaurants & Bars** | Bikanervala, Moti Mahal, Wah Ji Wah, Dana Choga, Duty Free, Imly, Kake Da Hotel, Hot Mess Kitchen & Bar | Fine dining chef tables, rooftop lounges, buffet buy-one-get-one privileges, and curated beverage packages. |
| **Theme Parks & Farms** | Rangmanch Farms, MadhavGarh Farms, Joy Gaon, Surajgarh Farms, Delta 105, EOD Adventure Park, Vishal Garh | Full-day rural cultural outings, adventure sports, buffet ethnic dining, ziplining, and family day picnics. |
| **Waterparks & Splash** | Worlds of Wonder (WOW Noida), Appu Ghar Gurugram, Jurassic Park Sonipat, Mojoland, Atlantic Water World | Wave pools, thrilling multilane slides, lazy rivers, rain dances, and discounted VIP group admissions. |

---

## 💻 Modern Engineering & Architecture

The web platform is engineered with a cutting-edge modern stack designed for ultra-fast Time-to-First-Byte (TTFB), flawless Core Web Vitals, and resilient AI-driven customer assistance:

```
src/
├── app/                         # Next.js 16 App Router (Turbopack SSG/SSR)
│   ├── layout.tsx               # Root shell, Schema.org JSON-LD, global typography
│   ├── page.tsx                 # High-conversion landing page
│   ├── (Marketing & Company)    # About, Careers, Contact, Partners, Press, Help
│   ├── (Compliance & Legal)     # Privacy Policy (DPDP & Play Store), Terms, Refunds, Delete-Account
│   ├── (Dynamic Catalogues)     # /deals/[slug] and /blog/[slug] with SSG generateStaticParams
│   ├── (Taxonomies)             # /category/*, /destinations/*, /collections/*
│   └── api/                     # Serverless Route Handlers
│       ├── chat/route.ts        # NVIDIA NIM Nemotron-3 Nano 30B + Deterministic Fallback Engine
│       ├── contact/route.ts     # Customer inquiry processing with input sanitization
│       ├── newsletter/route.ts  # Lead generation & subscriber ingestion
│       └── partner/route.ts     # B2B venue partnership onboarding desk
├── components/                  # 21 modular React 19 UI components
│   ├── CorporateTrainShowcase   # Infinite CSS corporate express marquee with 3D popups
│   ├── PartnerLogoSphere        # Interactive WebGL 3D brand sphere powered by Three.js
│   ├── ReelsShowcase            # Native mobile-friendly vertical video reels carousel
│   ├── RotatingDealGallery      # 3D interactive deal rotation gallery
│   ├── WhatsAppConcierge        # One-touch WhatsApp concierge lead router
│   └── Chatbot                  # Full conversational AI modal with offline resilience
├── config/                      # Centralized brand, phone hotlines, and metadata configuration
└── data/                        # Type-safe static catalogs (deals, blogs, partners, corporate clients)
```

### Key Technical Highlights
- **Next.js 16.3.0 & React 19.2.8:** Built with the latest App Router paradigms, utilizing asynchronous Request APIs, strict React 19 compiler compatibility, and static site generation for 260+ routes.
- **Three.js WebGL 3D Visualization:** The interactive `PartnerLogoSphere` renders 35+ partner brand emblems on an interactive 3D particle sphere with smooth inertial drag physics and WebGL context protection.
- **Hybrid AI Concierge (NVIDIA NIM):** The `/api/chat` route integrates NVIDIA NIM's `nvidia/nemotron-3-nano-30b-a3b` grounded in `docs/DRS_DEALS_MASTER_CONTEXT.md`, backed by a 14-branch deterministic offline fallback engine for zero-downtime reliability.
- **Comprehensive E-E-A-T & Search Architecture:** Full structured data integration using Schema.org JSON-LD across `Organization`, `WebSite`, `LocalBusiness`, `BreadcrumbList`, `Product`, `BlogPosting`, `FAQPage`, and `ProfilePage`.
- **Automated Sharp Image Pipeline:** Custom build utilities convert high-resolution brand logos into WebP/AVIF formats with fallback generation.

---

## 👨‍💻 Developer & Partnership Attribution

### Lead Developer & Digital Architect
**Yashveer Singh Rajpoot** is the lead software developer, social media manager, digital asset manager, and Google Play Store / Apple App Store application developer for DRS Deals.

### Strategic Agency Partnership
He is the founder of **Yashveer Labs**, a premier digital engineering and creative technology studio that partnered with DRS Deals to architect, engineer, optimize, and manage the digital ecosystem, brand presence, mobile application deployments, and marketing infrastructure.

> **Attribution Notice:** This documentation strictly reflects the verified scope of work delivered by Yashveer Singh Rajpoot and Yashveer Labs in direct partnership with DRS Deals. No credentials, features, or external affiliations have been added beyond these verified facts.

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js:** `v20.x` or higher (Node 22 LTS recommended)
- **Package Manager:** `npm` (v10+), `pnpm`, or `yarn`
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/drsdeals/Drs-Deals.git
cd Drs-Deals

# Install project dependencies
npm install
```

### Environment Configuration

Create a `.env.local` file in the root directory (refer to `.env.example`):

```bash
cp .env.example .env.local
```

Populate the required environment variables:

```ini
# Canonical Domain URL
NEXT_PUBLIC_SITE_URL=https://www.drsdeals.in

# NVIDIA NIM API Key (Optional — fallback engine activates automatically if absent)
NVIDIA_API_KEY=your_nvidia_nim_api_key_here
```

### Development Server

Run the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Assurance & Production Verification

```bash
# Static TypeScript type check
npx tsc --noEmit

# Static ESLint 9 analysis
npm run lint

# Compile optimized production static build
npm run build

# Launch production server locally
npm run start
```

---

## 🌐 SEO, AEO & Geographic Optimization

The DRS Deals repository is optimized for traditional search engines (SEO), Artificial Intelligence Answer Engines (AEO - ChatGPT, Perplexity, Claude, Gemini), and Local Geographic Discovery (GEO):
- **Canonical Routing:** Strict 308 permanent redirects prevent duplicate content cannibalization across `/experiences` and `/category` taxonomy trees.
- **Search Metadata:** Dynamically generated OpenGraph and Twitter cards for all curated deals and editorial travel journal articles.
- **AI Knowledge Grounding:** Native `public/llms.txt` and root master context dossiers provide clean, indexable facts for conversational AI indexers.
- **Regional Landing Hubs:** Dedicated, optimized regional routes for Delhi NCR, Jaipur & Rajasthan, and Mumbai & Coastal destinations.

---

## 📞 Official Contact & Concierge Information

- **Headquarters:** B 14 UGF, DRS Building, Gulab Bagh, Pillar No. 725, Near Nawada Metro Station, New Delhi 110059
- **Official Inquiries & Support:** `Info@drsdeals.in`
- **WhatsApp Concierge:** `+91 98111 20892`
- **Authorized Phone Hotlines:**
  - `+91 98111 20892`
  - `+91 98113 60808`
  - `+91 99110 11460`
  - `+91 96253 57514`
  - `+91 99110 11458`
  - `+91 99110 11459`
  - `+91 99110 11461`
  - `+91 83682 89207`

---

## 📄 License & Legal Notice

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for complete terms.  
Copyright © 2003–2026 **DRS Deals**. Platform engineering and digital architecture delivered by **Yashveer Labs**.

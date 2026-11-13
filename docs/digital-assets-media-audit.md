# DRS Deals - Comprehensive Digital Assets, Media & Storage Audit
**Auditor**: Subagent 5 (Digital Assets, Media & Storage Auditor)  
**Date**: November 2026  
**Repository**: DRS Deals (`clients/DRS_Deals`)

---

## Executive Summary & Key Metrics

A deep inspection of all media files, static directories, scripts, and asset references across the codebase was conducted. The repository currently stores **525.77 MB** of total non-code assets, of which **419.73 MB (79.8%)** is held in redundant, raw, or duplicate directories in the repository root outside `public/`. Furthermore, **31.82 MB (30.0%)** of files inside `public/` are completely orphaned and unreferenced by any component or data module.

### Core Metrics at a Glance
| Metric Category | Count / Volume | Key Findings |
| :--- | :--- | :--- |
| **Total Media & Static Assets** | **525.77 MB** | 419.73 MB in project root; 106.04 MB in `public/` |
| **Root Media Redundancy** | **419.73 MB (79.8%)** | Raw reels (`videos/`: 396.1 MB), duplicate `d.mp4` (12.5 MB), orphaned `bg-vid-drs.mp4` (7.7 MB), duplicate `logos-webp-folder/` (0.8 MB), raw `logos-new/` (1.5 MB), duplicate `corporateclients/` (1.1 MB) |
| **Orphaned Assets in `public/`** | **110 files (31.82 MB)** | 8 video assets (27.89 MB), 94 images (3.89 MB), 1 corporate client webp (0.03 MB), 5 Next.js template SVGs (0.01 MB), 1 icon/llms |
| **Broken / Missing References** | **1 critical asset** | `/favicon.ico` referenced in `src/app/layout.tsx` does NOT exist on disk (404 on every request) |
| **URL-Encoding & Casing Hazards** | **23 filenames with spaces & `&`** | `src/data/corporateClients.ts` specifies fallbacks like `p&g.jpg` and `delhi metro.jpg` with raw spaces and ampersands |
| **Video Compression Deficit** | **13.1 Mbps Hero Loop** | `public/videos/d.mp4` is 12.5 MB for only an 8.0s muted loop (has AAC audio stream and no poster/WebM) |

---

## Section 1: Complete Asset Inventory & Directory Comparison

### 1. Storage Footprint Comparison: Root vs Public
```
DRS_Deals/ (Total Non-Code Assets: 525.77 MB)
├── Root Media & Staging (419.73 MB) — NOT served by Next.js
│   ├── videos/                   (9 files  │ 396.14 MB)  [Raw uncompressed 1080p reels]
│   ├── d.mp4                     (1 file   │  12.49 MB)  [Untracked exact duplicate of public/videos/d.mp4]
│   ├── bg-vid-drs.mp4            (1 file   │   7.65 MB)  [Unreferenced intermediate compression]
│   ├── logos-new/                (93 files │   1.54 MB)  [Raw source logos for build script]
│   ├── corporateclients/         (38 files │   1.11 MB)  [Duplicate uncompressed JPEGs]
│   └── logos-webp-folder/        (137 files│   0.80 MB)  [Redundant build script mirror cache]
└── public/ (106.04 MB) — Directly exposed over HTTP
    ├── videos/                   (21 files │  86.79 MB)  [Hero loop + 9 reels + posters]
    ├── images/                   (365 files│  13.45 MB)  [Deals, blogs, partners, train, etc.]
    ├── corporateclients/         (77 files │   3.62 MB)  [38 JPGs with spaces + 39 WebPs]
    ├── section-showcase/         (7 files  │   1.91 MB)  [Three.js 3D showcase + covers]
    └── Root Public Files         (9 files  │   0.27 MB)  [social-image.png, logo, Next.js SVGs]
```

### 2. Root Asset Breakdown & Purpose Analysis

#### A. Root MP4 Files: `bg-vid-drs.mp4` (7.65 MB) & `d.mp4` (12.49 MB)
- **`d.mp4` in Root**: Exact byte-for-byte duplicate (13,099,127 bytes, SHA-256 match) of `public/videos/d.mp4`. It is currently untracked in git. It is not served by Next.js (Next.js can only serve from `public/`).
- **`bg-vid-drs.mp4` in Root**: An 8-second 1080p video (8,020,159 bytes). It is an older / alternative encode of the exact same video as `d.mp4`. It is ignored in `.gitignore` and **nowhere referenced** in any file in `src/`.
- **Verdict**: Both root files should be permanently deleted from the project root.

#### B. Root `videos/` Directory (9 files, 396.14 MB)
- Contains `drsdeals-reels (1).mp4` through `drsdeals-reels (9).mp4`.
- All are full 1080x1920 (or 1280x720 for reel 4) raw video captures with 5 Mbps bitrates and 40–55 MB file sizes.
- These were the raw master files used to generate the compressed versions in `public/videos/reel-1.mp4` through `reel-9.mp4`.
- They are ignored in `.gitignore` (`/videos/`), but occupy **396 MB** of local disk space in the project directory.
- **Verdict**: Move to external cloud storage (Google Drive / S3 / R2) or an external archive folder outside the repository.

#### C. Root `corporateclients/` Directory (38 files, 1.11 MB)
- Contains 38 `.jpg` files (`adani power.jpg`, `blue dart.jpg`, `p&g.jpg`, etc.).
- Ignored in `.gitignore` (`/corporateclients/`).
- In `public/corporateclients/`, the exact same 38 JPG files exist (with identical dimensions and filenames), along with 39 converted WebP files.
- **Verdict**: Root `corporateclients/` is a redundant local staging folder and can be safely deleted.

#### D. Root `logos-new/` (93 files, 1.54 MB) vs `public/images/partners/`
- Contains 3 folders: `hotel resorts` (20 files), `Restraunt & Cafe` (43 files), and `Theme parks Farms & water park` (30 files).
- These files are tracked in git.
- They are the **raw source inputs** consumed by `scripts/build-partners-assets.js`.
- The script processes them into 240x240 WebP files and outputs them to `public/images/partners/`.
- **Verdict**: As source assets, they should be relocated to a dedicated non-served directory (e.g. `assets/source-logos/`) rather than cluttering the repository root.

#### E. Root `logos-webp-folder/` (137 files, 0.80 MB)
- Contains 137 individual WebP partner logos.
- These files are tracked in git.
- **Why it exists**: In `scripts/build-partners-assets.js` lines 226-230, whenever the script generates a WebP in `public/images/partners/`, it executes `fs.copyFileSync(destPath, webpCopyPath)` to copy it to `logos-webp-folder/`.
- **Usage**: Only two entries in `build-partners-assets.js` (`namaste-corbett` and `orean-kasauli`) use `webpSource` pointing to this folder as a fallback. Next.js **never** serves files from this folder.
- **Verdict**: Redundant mirror folder. The two unique source logos (`namaste-corbett.webp` and `oren.webp`) should be moved to the source logo directory, and the remaining 135 duplicate files should be removed from git.

---

## Section 2: Detailed `public/` Directory Audit

### 1. `public/corporateclients/` (77 files, 3.62 MB)
- **Files present**: 38 `.jpg` files and 39 `.webp` files.
- **Usage in code**: `src/data/corporateClients.ts` defines 38 corporate clients.
  - `logoUrl` points to `/corporateclients/{client-slug}.webp` (Modern WebP format).
  - `logoFallback` points to `/corporateclients/{client raw name}.jpg` (Uncompressed JPEG with spaces).
- **Orphaned File**: `pandg.webp` is never referenced because `p-and-g.webp` is used instead.
- **Encoding Risks**: See Section 3 for the detailed spaces/ampersand risk analysis.

### 2. `public/images/` (365 files, 13.45 MB)
Detailed breakdown of each subfolder under `public/images/`:

| Subfolder | Total Files | Active in Code | Orphaned Files | Orphaned Size | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `images/` (root) | 13 | 4 | 9 files | 487 KB | 9 festive image duplicates (clean, fixed, 2x, png/webp) |
| `b2b/` | 3 | 3 | 0 | 0 KB | All 3 WebP banners actively used on homepage |
| `blogs/` | 22 | 22 | 0 | 0 KB | `blog-1.webp` through `blog-22.webp` all referenced in `blogs.ts` |
| `companies-tie-up/` | 34 | 34 | 0 | 0 KB | All 34 used in `PartnerLogoSphere.tsx` |
| `deals/` | 53 | 53 | 0 | 0 KB | 10 properties with featured + gallery images in `deals.ts` |
| `hotels/` | 10 | 8 | 2 files | 615 KB | `mojoland.webp` (424 KB) & `white-flower.webp` (191 KB) unused |
| `logos/` | 7 | 0 | 7 files | 2.5 KB | `hyatt.svg`, `marriott.svg`, `taj.svg`, `app-store.svg`, etc. unused |
| `partners/` | 191 | 126 | 65 files | 160 KB | 65 legacy SVG badges superseded by WebP logos; `hotels-resorts/` is empty |
| `train/` | 6 | 1 | 5 files | 2.60 MB | Only `delhi_metro_middle.webp` is used; 3 large PNGs + 2 WebPs unused |
| `webp/` | 26 | 19 | 7 files | 117 KB | 7 unreferenced stock marketing images |
| **Total** | **365** | **270** | **95 files** | **3.98 MB** | |

### 3. `public/videos/` (21 files, 86.79 MB)
| Video File | Resolution | Duration | Bitrate | Size | Component Referrer | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `d.mp4` | 1920x1080 | 8.0s | 13,099 kbps | 12.49 MB | `HomeTopVideo.tsx` | **Active** (Needs optimization) |
| `reel-2.mp4` (+webp) | 576x1024 | 90.2s | 646 kbps | 6.95 MB | `ReelsShowcase.tsx` | **Active** |
| `reel-3.mp4` (+webp) | 576x1024 | 78.4s | 1,000 kbps | 9.34 MB | `ReelsShowcase.tsx` | **Active** |
| `reel-4.mp4` (+webp) | 1024x576 | 81.8s | 773 kbps | 7.53 MB | `ReelsShowcase.tsx` | **Active** (Horizontal aspect ratio issue) |
| `reel-5.mp4` (+webp) | 576x1024 | 71.3s | 719 kbps | 6.11 MB | `ReelsShowcase.tsx` | **Active** |
| `reel-6.mp4` (+webp) | 576x1024 | 84.1s | 498 kbps | 5.00 MB | `ReelsShowcase.tsx` | **Active** |
| `reel-8.mp4` (+webp) | 576x1024 | 69.0s | 1,351 kbps | 11.12 MB | `ReelsShowcase.tsx` | **Active** |
| `reel-1.mp4` (+webp) | 576x1024 | 74.9s | 1,047 kbps | 9.39 MB | None | **ORPHANED** |
| `reel-7.mp4` (+webp) | 576x1024 | 49.3s | 1,174 kbps | 6.97 MB | None | **ORPHANED** |
| `reel-9.mp4` (+webp) | 576x1024 | 66.0s | 892 kbps | 7.12 MB | None | **ORPHANED** |
| `bg-vid-drs.mp4` (+webp)| 1920x1080 | 8.0s | 4,554 kbps | 4.41 MB | None | **ORPHANED** |

**Summary**: Out of 86.79 MB of videos in `public/videos/`, **27.89 MB (32.1%)** is completely orphaned.

### 4. `public/section-showcase/` (7 files, 1.91 MB)
- Contains `index.html` (1,920 lines of standalone Three.js code) and `media/` with 3 MP4 video loops and 3 WebP covers:
  - `cover-1.mp4` (715 KB), `cover-1.webp` (40 KB)
  - `cover-2.mp4` (645 KB), `cover-2.webp` (45 KB)
  - `cover-3.mp4` (483 KB), `cover-3.webp` (16 KB)
- **Usage**: Loaded by `ShowcaseIframe.tsx` on the homepage with an `IntersectionObserver` lazy-loader.
- **Findings**: All 7 files are actively used. Total footprint (1.91 MB) is reasonable for an interactive 3D showcase.

### 5. Root Static Files in `public/`
| File | Size | Purpose / Usage | Verdict |
| :--- | :--- | :--- | :--- |
| `favicon.ico` | **0 B** | Declared in `src/app/layout.tsx` metadata | **MISSING (BROKEN LINK)** |
| `icon.png` | 2.2 KB | DRS Deals crest icon (180x180) | Keep; link to favicon / Apple touch icon |
| `logo-drs-deals.webp` | 3.1 KB | Official DRS Deals logo in `site.ts` | Keep (Active) |
| `social-image.png` | 273 KB | OpenGraph / Twitter preview card in `site.ts` | Keep (Active) |
| `llms.txt` | 6.8 KB | AI crawler summary of DRS Deals | Keep (Active for LLMs) |
| `file.svg` | 391 B | Default `create-next-app` boilerplate SVG | **ORPHANED (Safe to delete)** |
| `globe.svg` | 1,035 B | Default `create-next-app` boilerplate SVG | **ORPHANED (Safe to delete)** |
| `next.svg` | 1,375 B | Default `create-next-app` boilerplate SVG | **ORPHANED (Safe to delete)** |
| `vercel.svg` | 128 B | Default `create-next-app` boilerplate SVG | **ORPHANED (Safe to delete)** |
| `window.svg` | 385 B | Default `create-next-app` boilerplate SVG | **ORPHANED (Safe to delete)** |

---

## Section 3: Filename Sanity & URL-Encoding Risks

### Critical Hazard: Spaces, Ampersands & Special Characters in Image Names
In `src/data/corporateClients.ts`, `logoFallback` contains raw unencoded strings that point to files in `public/corporateclients/`:

```typescript
// Examples of high-risk fallback paths:
logoFallback: '/corporateclients/adani power.jpg',
logoFallback: '/corporateclients/blue dart.jpg',
logoFallback: '/corporateclients/company secretaries of India.jpg',
logoFallback: '/corporateclients/country delhight.jpg',
logoFallback: '/corporateclients/delhi metro.jpg',
logoFallback: '/corporateclients/dp world.jpg',
logoFallback: '/corporateclients/ds group.jpg',
logoFallback: '/corporateclients/hfcl group.jpg',
logoFallback: '/corporateclients/indian oil.jpg',
logoFallback: '/corporateclients/indus towers.jpg',
logoFallback: '/corporateclients/LIC.jpg',
logoFallback: '/corporateclients/maruti suzuki.jpg',
logoFallback: '/corporateclients/mitsubishi electric.jpg',
logoFallback: '/corporateclients/mother sumi.jpg',
logoFallback: '/corporateclients/national fertizlizer limited.jpg',
logoFallback: '/corporateclients/p&g.jpg',
logoFallback: '/corporateclients/paramount bed.jpg',
logoFallback: '/corporateclients/raitel.jpg',
logoFallback: '/corporateclients/raj darbar.jpg',
logoFallback: '/corporateclients/sagacious IP.jpg',
logoFallback: '/corporateclients/sct fibernet.jpg',
logoFallback: '/corporateclients/the business backbone.jpg',
logoFallback: '/corporateclients/usa embassy.jpg'
```

### Risk Analysis
1. **Unencoded Ampersand (`p&g.jpg`)**:
   In URI RFC 3986, `&` is a reserved query separator. When requested as `/corporateclients/p&g.jpg`, reverse proxies (Nginx, Cloudflare), CDN edge servers, and query parsers may truncate the path to `/corporateclients/p` and parse `g.jpg` as an empty query parameter, resulting in an immediate 404.
2. **Unencoded Spaces (` `)**:
   Modern browsers convert spaces to `%20`, but strict HTTP clients, crawlers (Googlebot, Bingbot), pre-renderers, and SSR fetchers often fail on raw spaces in `src` attributes without explicit `encodeURI()`.
3. **Case-Sensitivity on Linux / Vercel**:
   On Windows development environments, file lookups are case-insensitive. On Linux production hosts (Vercel, AWS, Netlify), `LIC.jpg` vs `lic.webp` and `sagacious IP.jpg` vs `sagacious-ip.webp` will fail if casing does not match exactly.
4. **Typographical & Brand Errors in Filenames**:
   - `country delhight.jpg` (misspelling of "Delight")
   - `national fertizlizer limited.jpg` (misspelling of "Fertilizer")
   - `raitel.jpg` (misspelling of "RailTel")
   - `sct fibernet.jpg` (misspelling of "ACT Fibernet")
   - `mother sumi.jpg` (misspelling of "Motherson Sumi")
5. **Architectural Redundancy**:
   Since all 38 clients have pristine, slugified `.webp` counterparts (`/corporateclients/adani-power.webp`, `/corporateclients/blue-dart.webp`, etc.) which are supported by 100% of modern web browsers, having raw `.jpg` fallbacks with spaces is an antipattern.

---

## Section 4: Video & High-Resolution Media Optimization Analysis

### 1. Hero Video Loop (`public/videos/d.mp4`)
- **Current State**:
  - Resolution: 1920x1080 (1080p Full HD)
  - Duration: 8.00 seconds
  - Container: MP4 (H.264 High Profile, Level 4.0)
  - Bitrate: **13,099 kbps (~13.1 Mbps)**
  - File Size: **12.49 MB (13,099,127 bytes)**
  - Audio: AAC stereo, 140 kbps, 44.1 kHz (Unused; video is permanently muted in `HomeTopVideo.tsx`)
  - Poster: **None specified** in `<video>` tag
  - Secondary Format: **No WebM / AV1 source**
- **Performance Impact**:
  - On mobile 4G or throttled connections, downloading 12.5 MB of video on initial page load blocks LCP (Largest Contentful Paint) and drains mobile data quotas.
- **Optimization Strategy**:
  1. Strip the unused AAC audio stream (`-an`).
  2. Transcode with H.264 CRF 26 with `faststart` (`-movflags +faststart`): Target size ~**1.4 MB** (89% savings).
  3. Transcode an AV1 / VP9 WebM alternative: Target size ~**900 KB** (93% savings).
  4. Generate and attach a 1080p WebP poster image (`/videos/d-poster.webp`, ~60 KB) so the hero renders instantaneously before video playback begins.

### 2. Live Hospitality Reels (`public/videos/reel-*.mp4`)
- **Current State**:
  - `reel-2, 3, 5, 6, 8`: Vertical portrait format (576x1024), 500–1,350 kbps, 5.0–11.1 MB each.
  - `reel-4`: Horizontal landscape format (**1024x576**), 773 kbps, 7.53 MB.
  - Posters: Each reel has a WebP poster (`reel-*.webp`, 40–105 KB).
- **Flaws Identified**:
  - **Reel 4 Aspect Ratio Discrepancy**: Because the container in `ReelsShowcase.tsx` is fixed at a vertical portrait aspect ratio (9:16) with `object-fit: cover`, `reel-4` is cropped severely on both sides, removing ~44% of the visual video content.
  - **Orphaned Reels**: `reel-1` (9.4 MB), `reel-7` (7.0 MB), and `reel-9` (7.1 MB) were compressed and placed in `public/videos/` with poster images, but omitted from the `REELS` array in `ReelsShowcase.tsx`.
- **Optimization Strategy**:
  - Compress reels to target 450–600 kbps using H.264 CRF 28 (reducing average size to 3.5–4.5 MB).
  - Either add `reel-1, 7, 9` to the showcase or safely delete them to save 23.5 MB of public storage.
  - Crop or letterbox `reel-4` properly or replace it with a vertical cut from `videos/drsdeals-reels (4).mp4`.

---

## Section 5: Scripts Audit (`scripts/build-partners-assets.js`)

### Script Purpose & Architecture
The script `scripts/build-partners-assets.js` (479 lines) is an offline asset generation tool for partner logos:
1. Defines a data structure of 127 partner brands across 4 categories:
   - `hotel-resorts` (28 partners)
   - `restaurants-bars` (68 partners)
   - `theme-parks` (17 partners)
   - `waterparks` (14 partners)
2. Uses `sharp` to read source logos from `logos-new/{category}/{filename}`.
3. Resizes images to fit within 190x190 px and composites them onto a 240x240 px white canvas.
4. Saves output WebP files to `public/images/partners/{category}/{slug}.webp`.
5. Redundantly duplicates each generated WebP into root `logos-webp-folder/{slug}.webp`.
6. For partners lacking an image, generates an SVG crest badge with initials and gold borders.
7. Disperses duplicate brands across the array to avoid repeated logos in UI carousels.
8. Writes the TypeScript partner database directly to `src/data/partners.ts`.

### Script Flaws & Anti-Patterns
1. **Redundant Mirror Folder Creation**: Line 15 and Line 346 create and copy files into `logos-webp-folder/`. This pollutes the project root and wastes 137 file descriptors.
2. **Zombie Fallback SVGs**: When a partner logo is added to `logos-new` and re-processed, the script creates `{slug}.webp` in `public/images/partners/`, but never deletes the previous `{slug}.svg`. This resulted in **65 orphaned SVG badges** lingering in `public/images/partners/`.
3. **Hardcoded Casing & Typo Fragility**: The script relies on fuzzy filename matching (lines 320–335) against folders with spaces like `Restraunt & Cafe` (misspelling "Restaurant").

---

## Section 6: Complete List of Safe-to-Remove / Relocate Files

### 1. Root Files Safe to Remove Immediately (Local Disk Savings: 417.4 MB)
- `bg-vid-drs.mp4` in root (7.65 MB) — Orphaned intermediate encode.
- `d.mp4` in root (12.49 MB) — Exact duplicate of `public/videos/d.mp4`.
- `corporateclients/` in root (38 files, 1.11 MB) — Duplicate uncompressed JPEGs.
- `videos/` in root (9 files, 396.14 MB) — Archive to external cloud storage.
- `logos-webp-folder/` in root (137 files, 0.80 MB) — Delete all duplicate files after moving `namaste-corbett.webp` and `oren.webp` to source assets.

### 2. Orphaned Files in `public/` Safe to Remove (Public Storage Savings: 31.81 MB)
#### A. Orphaned Videos in `public/videos/` (27.89 MB):
- `public/videos/bg-vid-drs.mp4` (4.34 MB) & `bg-vid-drs.webp` (76 KB)
- `public/videos/reel-1.mp4` (9.35 MB) & `reel-1.webp` (40 KB)
- `public/videos/reel-7.mp4` (6.90 MB) & `reel-7.webp` (70 KB)
- `public/videos/reel-9.mp4` (7.02 MB) & `reel-9.webp` (105 KB)

#### B. Orphaned Images in `public/images/` (3.89 MB):
- **Festive duplicates** (9 files, 487 KB):
  - `festive-header-bg.png` (120 KB), `festive-header-bg.webp` (25 KB)
  - `festive-header-clean.png` (98 KB), `festive-header-clean.webp` (20 KB)
  - `festive-header-fixed.png` (119 KB), `festive-lights-header.webp` (62 KB)
  - `festive-logo-3d.png` (23 KB), `logo-festive-3d-clean.png` (15 KB), `logo-festive-3d.png` (15 KB)
- **Train PNG duplicates** (5 files, 2.60 MB):
  - `delhi_metro_front.png` (857 KB), `delhi_metro_front.webp` (149 KB)
  - `delhi_metro_middle.png` (585 KB)
  - `delhi_metro_rear.png` (856 KB), `delhi_metro_rear.webp` (150 KB)
- **Unreferenced Hotels** (2 files, 615 KB):
  - `hotels/mojoland.webp` (424 KB), `hotels/white-flower.webp` (191 KB)
- **Unused Stock Marketing WebPs** (7 files, 117 KB):
  - `webp/cities-we-serve-punjab.webp` (22 KB)
  - `webp/customer-stories-story-1.webp` (12 KB)
  - `webp/customer-stories-story-2.webp` (16 KB)
  - `webp/hero-collage-overlay-bottom-right.webp` (19 KB)
  - `webp/hero-collage-primary.webp` (25 KB)
  - `webp/luxury-resort-atmospheric.webp` (5 KB)
  - `webp/partner-spotlight-month.webp` (18 KB)
- **Unused Logo SVGs** (7 files, 2.5 KB):
  - `logos/app-store.svg`, `logos/google-play.svg`, `logos/hyatt.svg`, `logos/marriott.svg`, `logos/oberoi.svg`, `logos/radisson.svg`, `logos/taj.svg`
- **Superseded Partner SVG Badges** (65 files, 160 KB):
  - All 65 SVG files in `public/images/partners/` that already have a `.webp` logo (e.g. `amrapali-resort-ambala.svg`, `24-carat-lounge-rajouri-garden.svg`, `delta-105-manesar.svg`, etc.)
- **Empty Directory**:
  - `public/images/partners/hotels-resorts/` (0 files)

#### C. Orphaned Corporate Client WebP:
- `public/corporateclients/pandg.webp` (30 KB)

#### D. Next.js Boilerplate SVGs in `public/`:
- `file.svg` (391 B), `globe.svg` (1.0 KB), `next.svg` (1.4 KB), `vercel.svg` (128 B), `window.svg` (385 B)

---

## Section 7: Step-by-Step Migration Plan for Phase 2 Architecture Cleanup

### Step 1: Fix Critical Broken Asset (`favicon.ico`)
1. Generate a multi-resolution `favicon.ico` (16x16, 32x32, 48x48) from `public/icon.png`.
2. Save to `public/favicon.ico`.
3. Update `src/app/layout.tsx` metadata to cleanly specify:
   ```typescript
   icons: {
       icon: [
           { url: '/favicon.ico', sizes: 'any' },
           { url: '/icon.png', type: 'image/png' },
           { url: siteConfig.logo, type: 'image/webp' },
       ],
       apple: '/icon.png',
   }
   ```

### Step 2: Corporate Clients Refactoring (Eliminate URL Risks)
1. In `src/data/corporateClients.ts`, change all `logoFallback` references to kebab-case or drop the fallback field altogether since all 38 WebPs exist.
2. If fallback is retained, rename `public/corporateclients/*.jpg` files to kebab-case without spaces or ampersands (`p-and-g.jpg`, `delhi-metro.jpg`, `adani-power.jpg`).
3. Delete the redundant duplicate `pandg.webp`.
4. Delete root `corporateclients/`.

### Step 3: Optimize Hero Video & Reels
1. Re-encode `public/videos/d.mp4`:
   ```bash
   ffmpeg -i public/videos/d.mp4 -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart public/videos/d-opt.mp4
   ffmpeg -i public/videos/d.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 32 -b:a 0 public/videos/d.webm
   ffmpeg -ss 00:00:01 -i public/videos/d.mp4 -vframes 1 -q:v 85 public/videos/d-poster.webp
   ```
2. In `HomeTopVideo.tsx`, update `<video>` to load `poster="/videos/d-poster.webp"` and include both `<source src="/videos/d.webm" type="video/webm" />` and `<source src="/videos/d.mp4" type="video/mp4" />`.
3. Remove unreferenced videos (`reel-1`, `reel-7`, `reel-9`, `bg-vid-drs`).

### Step 4: Clean Orphaned Images & Template Leftovers
1. Remove the 94 orphaned images in `public/images/` identified in Section 6.
2. Remove the 5 unused Next.js template SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`).
3. Delete the empty folder `public/images/partners/hotels-resorts/`.

### Step 5: Clean Root Media & Modernize Build Script
1. Remove root `bg-vid-drs.mp4` and untracked `d.mp4`.
2. Move root `videos/` to external cold storage.
3. Update `scripts/build-partners-assets.js` to:
   - Stop copying files to `logos-webp-folder/`.
   - Delete obsolete `.svg` files when a `.webp` logo is successfully generated.
   - Read from `assets/source-logos/` instead of `logos-new/`.
4. Update `.gitignore` to remove dead rules (`/bg-vid-drs.mp4`, `/corporateclients/`) and ensure temporary build folders are ignored.

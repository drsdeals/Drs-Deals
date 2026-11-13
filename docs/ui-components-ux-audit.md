# DRS Deals: UI Components & UX Deep Audit Report

**Auditor:** Subagent 3 — UI Components & UX Auditor  
**Date:** November 13, 2026  
**Scope:** All UI components in `src/components/`, styling in `src/app/globals.css`, assets in `public/`, and ESLint/Next.js compliance across the frontend.

---

## 1. Executive Summary

A comprehensive, line-by-line inspection of all 21 UI components located in `src/components/` was executed alongside viewport responsiveness analysis, accessibility audits (WCAG 2.1 AA), and ESLint validation.

### Key Audit Highlights:
- **Build & Lint Blocking Error:** `CorporateTrainShowcase.tsx` triggers a fatal React Hook error: `Calling setState synchronously within an effect can trigger cascading renders` (`react-hooks/set-state-in-effect`), which blocks CI/CD lint pipelines.
- **68 ESLint Warnings (`@next/next/no-img-element`):** 14 raw `<img>` tags reside inside core reusable components, and 54 reside across page routes. They bypass Next.js image optimization (AVIF/WebP, automatic responsive `srcset`, CLS prevention, and lazy loading).
- **Three.js GPU Memory Leak:** `PartnerLogoSphere.tsx` fails to dispose of 35 textures, 35 custom shader materials, and 2 geometries on component unmount, causing WebGL context memory leaks on client-side route transitions. In addition, `requestAnimationFrame` runs continuously at 60 FPS even when scrolled out of view, and there is no WebGL fallback check.
- **Severe Pacing / Usability Bug (The 2-Second Trap):** `HoneycombFeatures.tsx`, `CubeSteps.tsx`, and `RotatingDealGallery.tsx` all enforce hardcoded 2000ms auto-rotations with **zero pause on hover** and **zero touch swipe support**, snatching content away before users can read it.
- **Mobile Floating Collision & Viewport Overlap:** `Chatbot.tsx` (`z-index: 995`) on mobile expands to `left: 12px; right: 12px;`, completely overlaying `BottomRightActions.tsx` (`z-index: 990`), which uses hardcoded inline styles (`bottom: 24px, right: 24px`) that reject CSS responsive media queries.
- **Video Accessibility & Power Deficit:** `HomeTopVideo.tsx` lacks a `poster` image (causing a black rectangle on iOS Low Power Mode), lacks play/pause and mute controls (violating WCAG 2.2.2 Pause, Stop, Hide), and uses `preload="auto"` forcing heavy data downloads.
- **Form Architecture Disconnect:** `ContactForm.tsx` and `PartnerForm.tsx` do not communicate with a backend API; instead, they trigger `mailto:` URLs that fail silently on desktop browsers and mobile devices without a configured native mail client. In contrast, `NewsletterForm.tsx` has a functional API route (`/api/newsletter`) but is absent from `Footer.tsx`.

---

## 2. Component-by-Component Detailed Inventory & Audit

### 2.1. `Header.tsx`
- **Location:** `src/components/Header.tsx` (356 lines)
- **Role:** Floating sticky navigation bar, desktop mega menu, brand identity, search trigger, and full-screen mobile slide-out drawer.
- **Findings:**
  1. **Image Optimization:** 3 raw `<img>` tags (`/images/logo-festive-3d-clean.webp` on line 76, `/images/webp/header-mega-menu.webp` on line 236, and `siteConfig.logo` on line 272).
  2. **Render State Synchronization:** Lines 22–27 adjust state during rendering (`if (prevPathname !== pathname) { setPrevPathname(pathname); setDrawerOpen(false); ... }`). While permitted in React for prop syncing, calling multiple `setState` calls during render triggers an immediate synchronous re-render.
  3. **Desktop Mega Menu Keyboard Navigation Disconnect:** The mega menu DOM element (`.premium-mega-menu`) is rendered after `.lux-desktop-nav` (lines 200–251). When a keyboard user focuses the "Experiences" button and presses Tab, focus jumps to the "Deals" link (line 128), completely bypassing the links inside the mega menu ("Delhi NCR", "Jaipur", "Hotel & Resorts", etc.).
  4. **Mobile Drawer Accessibility:** The drawer (`#mobile-navigation-drawer`) lacks a focus trap. A keyboard or screen reader user can tab outside the open mobile drawer into invisible background header elements.
  5. **Logo Asset Inconsistency:** Desktop header renders `/images/logo-festive-3d-clean.webp` (festive 3D logo), while the mobile drawer renders `siteConfig.logo` (`/images/logo.png`).

---

### 2.2. `Footer.tsx`
- **Location:** `src/components/Footer.tsx` (117 lines)
- **Role:** 3D perspective site footer, corporate info, legal links, hotline phone numbers, and developer attribution.
- **Findings:**
  1. **Missing Newsletter Trigger:** The prompt explicitly specifies the footer's newsletter trigger. However, `Footer.tsx` has **no newsletter input form or trigger**; `NewsletterForm.tsx` is only rendered on the homepage.
  2. **Developer Attribution:** Properly renders Yashveer Singh Rajpoot / Yashveer Labs credits (lines 110–112):
     ```tsx
     <div className="golden-credit-wrapper">
         Website Built by <Link href="/yashveer-singh" className="golden-credit-link">Yashveer Singh</Link> under <Link href="/yashveer-labs" className="golden-credit-link">Yashveer Labs</Link>
     </div>
     ```
  3. **Image Tag:** Line 11 uses `<img src={siteConfig.logo} />` instead of `<Image />`.
  4. **Social Coin Icons:** The Instagram SVG (line 52) unexpectedly navigates to internal page `/yashveer-labs`, and user icon (line 55) navigates to `/yashveer-singh`, which may confuse users seeking company social media channels.
  5. **Hydration Tolerance:** `&copy; {new Date().getFullYear()}` on line 100 is safe across normal operation, but can be made immune to year-boundary hydration mismatches.

---

### 2.3. Floating Action Triggers (`BottomRightActions.tsx`, `WhatsAppConcierge.tsx`, `Chatbot.tsx`, `ScrollToTop.tsx`)
- **Role:** Floating quick-action stack, WhatsApp concierge link, AI concierge chat interface, and scroll-to-top trigger.
- **Findings:**
  1. **Z-Index Hierarchy & Mobile Viewport Clashing:**
     - `BottomRightActions.tsx`: Fixed bottom-right with inline styles `bottom: 24px; right: 24px; z-index: 990;`.
     - `Chatbot.tsx`: Fixed bottom-left with `bottom: 24px; left: 24px; z-index: 995;`.
     - On mobile screens (`max-width: 480px`), `.chatbot-modal-container` expands with `left: 12px; right: 12px; bottom: 12px;`.
     - Because Chatbot has `z-index: 995` and BottomRightActions has `z-index: 990`, the open chat window visually collides with and covers the WhatsApp and Scroll-to-Top buttons without providing a dismissible backdrop.
  2. **Inline Style Specificity Defect:** `BottomRightActions.tsx` defines coordinates in JSX inline styles (`style={{ bottom: '24px', right: '24px' }}`). These inline styles override CSS media queries in `globals.css`, preventing margins from reducing to 12px/16px on 320px–375px mobile screens.
  3. **Chatbot Conversational AI & Canned Responses:**
     - Integrates with `/api/chat` via POST, forwarding the query and conversation history.
     - Fallback mechanism: If an error or timeout occurs, gracefully injects: `"Sorry, please connect to {siteConfig.contacts.hotline1} to get the answer to that question."`
     - Quick chips (e.g., "Wyndham Sonipat Deal", "SK Premium Ghaziabad") correctly dispatch canned inquiries.
  4. **Chatbot Accessibility:** Implements `role="dialog"` and `aria-modal="true"` with Escape key listener, but lacks keyboard focus trapping inside the modal.

---

### 2.4. Video & Media Embedding (`HomeTopVideo.tsx`, `ShowcaseIframe.tsx`, `ReelsShowcase.tsx`)
- **Role:** Hero video background showcase, interactive 3D showcase iframe, and vertical 9:16 reels carousel.
- **Findings:**
  1. **`HomeTopVideo.tsx` — Critical Omissions:**
     - **Missing `poster` Attribute:** Without a poster image, mobile devices in Low Power Mode (which disable video autoplay) display a blank/black container.
     - **No Play/Pause or Mute Controls:** Violates WCAG 2.2.2 (Pause, Stop, Hide). Users with motion sensitivities or low bandwidth cannot halt the background video.
     - **Performance Overhead:** `preload="auto"` forces immediate streaming of `/videos/d.mp4` on page load, competing with critical CSS/JS for network bandwidth.
  2. **`ShowcaseIframe.tsx`:**
     - Uses `IntersectionObserver` with `rootMargin: '300px 0px'` to lazily mount `/section-showcase/index.html`. This is a clean performance practice.
     - Lacks `sandbox` attribute or `allow` permissions on `<iframe>` to prevent unauthorized script behavior.
  3. **`ReelsShowcase.tsx` — Severe Timer Bug & Image Issues:**
     - **Unstoppable Timer Bug:** In `useEffect` (lines 92–117), a 12-second `setTimeout` unconditionally advances the reel (`handleNext()`). If the user clicks **Pause**, `isPlaying` is set to `false`, but the timer is **NOT cancelled**. The reel forcibly auto-advances while paused!
     - **Image Warnings:** Lines 167 and 250 use raw `<img>` tags for poster previews.
     - **A11y Button Listener:** Lines 160 and 243 specify `role="button" tabIndex={0}` on `div.reel-card` but lack `onKeyDown` listeners (Enter/Space), failing WCAG 2.1.1 Keyboard requirements.

---

### 2.5. `PartnerLogoSphere.tsx` (Three.js 3D Sphere)
- **Location:** `src/components/PartnerLogoSphere.tsx` (667 lines)
- **Role:** Interactive 3D Fibonacci sphere rotating 34 partner brand logos around a central DRS Deals hero anchor.
- **Findings:**
  1. **Fatal Memory Leak on Component Unmount:**
     - The cleanup function (lines 627–640) calls `renderer.dispose()` and removes DOM nodes, but **fails to dispose of any Three.js GPU assets**:
       - `floorGeo.dispose()`, `floorMat.dispose()`
       - `planeGeo.dispose()`
       - `drsHeroMat.dispose()`, `drsHeroMat.uniforms.map.value?.dispose()`
       - All 34 partner logo `mat.dispose()` and `mat.uniforms.map.value?.dispose()`
     - Navigating between pages repeatedly leaks WebGL textures and shader programs into GPU VRAM, culminating in browser tab crashes with `CONTEXT_LOST_WEBGL`.
  2. **Missing WebGL Support Verification:**
     - Directly calls `new THREE.WebGLRenderer({ alpha: true, antialias: true })` without testing for WebGL support.
     - On environments where WebGL is disabled or unavailable, this throws an uncaught runtime exception and crashes the React render tree.
  3. **Continuous Background Rendering (Battery / CPU Drain):**
     - The `requestAnimationFrame` loop runs perpetually at 60 FPS, calculating 34 shader matrix deflections even when the user has scrolled several screens away.
     - Lacks an `IntersectionObserver` to pause the rendering loop when out of the viewport.
  4. **Canvas Resize Handling:**
     - `onResize` correctly updates `camera.fov`, `camera.aspect`, `camera.position.z`, `camera.updateProjectionMatrix()`, and `renderer.setSize(width, height)`.

---

### 2.6. `CorporateTrainShowcase.tsx`
- **Location:** `src/components/CorporateTrainShowcase.tsx` (217 lines)
- **Role:** Continuous horizontal Delhi Metro train animation cycling corporate partner logos with speed controls.
- **Findings:**
  1. **ESLint Fatal Error:**
     - Line 44: `setIsVisible(true);` inside `useEffect()` triggers:
       `error Error: Calling setState synchronously within an effect can trigger cascading renders (react-hooks/set-state-in-effect)`.
     - Calling `setState` synchronously within the body of an effect causes a cascading re-render cycle on every mount.
  2. **Image Overuse (25 Unoptimized Images):**
     - Renders 12 middle cars duplicated once (12 x 2 = 24 `<img>` tags for `/images/train/delhi_metro_middle.webp`) plus 1 client logo = 25 raw `<img>` tags.
  3. **Infinite Error Loop Vulnerability:**
     - Line 105: `onError={(e) => { (e.target as HTMLImageElement).src = currentClient.logoFallback; }}`
     - If `logoFallback` is missing or fails to load, `onError` re-fires infinitely, blocking the main thread.
  4. **Speed Change Lifecycle Glitch:**
     - `advanceClient` relies on `transitionTime`. Changing the speed pill recalculates `transitionTime`, re-executing `useEffect` and causing a visual hitch in the train car progression.

---

### 2.7. `HoneycombFeatures.tsx` & `CubeSteps.tsx`
- **Role:** Interactive 3D presentation cards for DRS Deals features and 4-step booking workflow.
- **Findings:**
  1. **Pacing Defect (2-Second Auto-Flip):**
     - Both components auto-advance every **2000ms**.
     - Users cannot comfortably read 2 to 3 sentences in 2 seconds.
     - Neither component pauses when the user hovers the cursor over the card.
  2. **Dynamic Style Injection in `CubeSteps.tsx`:**
     - Lines 136–145 inject an inline `<style>` tag containing dynamic `@keyframes cubeRotate` inside JSX:
       ```tsx
       <style>{`
           @keyframes cubeRotate {
               from { transform: translateZ(-${halfWidth}px) rotateY(0deg); }
               to { transform: translateZ(-${halfWidth}px) rotateY(-90deg); }
           }
       `}</style>
       ```
     - This causes the browser to re-parse CSS rules on every render cycle. This should be refactored using CSS variables (e.g., `style={{ '--cube-depth': `${halfWidth}px` } as React.CSSProperties}`).
  3. **Honeycomb DOM Churn:**
     - Every transition mounts and animates dozens of `.hex-cell` DIVs simultaneously, causing layout calculation spikes on mobile devices.

---

### 2.8. Carousels & Marquees (`RotatingDealGallery.tsx`, `ReviewsMarquee.tsx`, `CategoryMarquee.tsx`)
- **Role:** Deal image carousel, hotelier/customer review marquees, and category partner brand strips.
- **Findings:**
  1. **`RotatingDealGallery.tsx`:**
     - Uses `setInterval(..., 2000)` to force photo changes every 2 seconds.
     - Lacks touch swipe gestures.
     - When a user clicks a thumbnail to view a specific hotel picture, the 2-second interval abruptly overrides their choice and advances to the next picture.
     - Uses raw `<img>` tags (lines 50 and 85).
  2. **`ReviewsMarquee.tsx`:**
     - Two opposing marquee rows (Row 1 forward, Row 2 reverse).
     - Properly applies `aria-hidden="true"` to duplicated marquee items.
     - Accessible star ratings (`{'★'.repeat(rev.rating)}` inside `aria-label="5 out of 5 stars"`).
     - Needs explicit CSS pause-on-hover and touch pause support for users reading testimonials.
  3. **`CategoryMarquee.tsx`:**
     - Constant speed calculation (`partners.length * 5` seconds).
     - Unused import: Line 4 imports `Image from 'next/image'`, but Line 57 uses `<img src={partner.logoSrc} ... />`.

---

### 2.9. Card Layouts & Directories (`PartnerGridGallery.tsx`, `BlogCard.tsx`)
- **Role:** Filterable directory of past partners and editorial blog preview cards.
- **Findings:**
  1. **`BlogCard.tsx`:**
     - Line 9 uses raw `<img>` instead of `next/image` `<Image />`.
     - Clean card structure with category badge, reading time, excerpt, and author.
  2. **`PartnerGridGallery.tsx`:**
     - Line 88 uses raw `<img>` for partner logos.
     - Performance: Computes the `locations` array on every render cycle without `useMemo`.
     - Filter state: Search query and location pill filters function reliably with a dedicated "Clear Filter" fallback when no results match.

---

### 2.10. Forms & Input Handling (`ContactForm.tsx`, `PartnerForm.tsx`, `NewsletterForm.tsx`)
- **Role:** Concierge inquiries, B2B partner applications, and newsletter subscriptions.
- **Findings:**
  1. **`ContactForm.tsx` & `PartnerForm.tsx` — Email Client Dependency:**
     - Forms **do not submit to an API**. They construct a formatted `mailto:` URL and set `window.location.href = mailtoUrl`.
     - On desktop systems without configured Outlook/Mail clients or on webmail (Gmail in Chrome), clicking submit does nothing externally while the UI transitions to "Email Draft Created".
     - Labeling: `<label>` elements lack `htmlFor` attributes, and `<input>` elements lack matching `id`s, reducing accessibility score on Lighthouse/screen readers.
     - Mitigating Feature: A "Copy Inquiry Details" button is included, which copies text to clipboard.
  2. **`NewsletterForm.tsx`:**
     - Real API Integration: Connects via `POST /api/newsletter`.
     - Properly handles loading, success, and error states.
     - Disables input and submit button during active network requests.

---

## 3. Next.js `<Image />` vs `<img>` Audit (68 ESLint Warnings)

### 3.1. Inventory Breakdown

| Category | File | Count | Details |
|---|---|---|---|
| **Components** | `src/components/Header.tsx` | 3 | Desktop logo, mega menu featured, drawer logo |
| **Components** | `src/components/Footer.tsx` | 1 | Brand logo |
| **Components** | `src/components/CorporateTrainShowcase.tsx` | 3 | Client logo, 2 train car loop definitions |
| **Components** | `src/components/ReelsShowcase.tsx` | 2 | Left and right preview posters |
| **Components** | `src/components/RotatingDealGallery.tsx` | 2 | Main viewport image, thumbnail buttons |
| **Components** | `src/components/PartnerGridGallery.tsx` | 1 | Partner logo |
| **Components** | `src/components/CategoryMarquee.tsx` | 1 | Partner logo |
| **Components** | `src/components/BlogCard.tsx` | 1 | Blog featured banner |
| **Pages** | `src/app/page.tsx` | 25 | Hero cards, deals, category thumbnails |
| **Pages** | `src/app/deals/page.tsx` | 2 | Deal cards |
| **Pages** | Category pages (4 files) | 4 | Hotel, restaurant, theme park, waterpark |
| **Pages** | Collection pages (5 files) | 5 | Couples, family, weekend, corporate, all |
| **Pages** | Destination pages (4 files) | 4 | Delhi, Jaipur, Mumbai, all |
| **Pages** | Guide pages (4 files) | 4 | Top 10, fine dining, family parks, all |
| **Pages** | Experience pages (2 files) | 2 | Spa, all |
| **Pages** | About, Explore, Search, Blog (4 files) | 4 | About hero, explore deals, search, blog post |
| **Total** | | **68** | All triggering `@next/next/no-img-element` |

### 3.2. Performance Impact of Raw `<img>` Tags
- **No Responsive Sizing:** Serves desktop-resolution images to mobile screens, wasting 300%–500% cellular bandwidth.
- **CLS (Cumulative Layout Shift):** Images without explicit aspect ratio placeholders cause layout jumping as assets load.
- **No Modern Format Compression:** Bypasses Next.js automatic conversion to AVIF and WebP (already configured in `next.config.ts`).

---

## 4. Mobile Responsiveness & Viewport Overlap Analysis

### 4.1. Stacking Context & Z-Index Collision Map

```
z-index: 1002  -->  .premium-mobile-drawer (Mobile Nav Menu)
z-index: 1001  -->  .premium-drawer-overlay (Backdrop blur)
z-index: 1000  -->  .chatbot-modal-container (when open in CSS)
z-index:  995  -->  .chatbot-floating-wrapper (Chatbot container)
z-index:  990  -->  .bottom-right-floating-container (ScrollToTop + WhatsApp)
z-index:  900  -->  .lux-header (Sticky Navigation Bar)
```

### 4.2. Identified Viewport Conflicts:
1. **Chatbot Overlapping WhatsApp:**
   When the chat window opens on devices `< 480px`, it occupies `left: 12px; right: 12px; bottom: 12px;`. Because its stacking context is 995, it covers the WhatsApp button (990) entirely.
2. **Fixed 24px Offsets on Small Screens:**
   `BottomRightActions.tsx` uses inline styles:
   `bottom: '24px', right: '24px'`
   On a 360px viewport, `52px (button) + 24px (margin) = 76px`, occupying over 21% of the screen width and obstructing card CTA buttons.
3. **Train Track & Sphere Touch Conflicts:**
   `PartnerLogoSphere.tsx` has `touchAction: 'pan-y'`, but horizontal swipes intended to scroll the page can get captured by the Three.js drag handler.

---

## 5. Accessibility (a11y) & WCAG 2.1 AA Compliance Findings

| Component | Guideline | Issue | Severity |
|---|---|---|---|
| `HomeTopVideo.tsx` | WCAG 2.2.2 (Level A) | Video autoplays continuously with no pause, stop, or hide control | **High** |
| `HomeTopVideo.tsx` | WCAG 1.4.11 (Level AA) | Missing `poster` attribute leads to empty black container on iOS Low Power Mode | **High** |
| `CorporateTrainShowcase.tsx` | React 19 / ESLint | Synchronous `setState` within `useEffect` body causes cascading re-renders | **Critical** |
| `CorporateTrainShowcase.tsx` | Robustness | `onError` fallback lacks loop termination check; missing image triggers browser lockup | **Medium** |
| `PartnerLogoSphere.tsx` | Performance / Memory | Textures, materials, and geometries never disposed on unmount; no offscreen render pause | **Critical** |
| `PartnerLogoSphere.tsx` | Robustness | No WebGL availability check before initializing `WebGLRenderer` | **High** |
| `HoneycombFeatures.tsx` | WCAG 2.2.1 (Level A) | 2-second auto-rotation with no pause on hover prevents reading | **High** |
| `CubeSteps.tsx` | WCAG 2.2.1 (Level A) | 2-second auto-rotation with no pause on hover prevents reading | **High** |
| `CubeSteps.tsx` | Maintainability | Inlines dynamic `<style>` tag into JSX every render | **Medium** |
| `RotatingDealGallery.tsx` | Usability | Auto-rotates every 2s, overriding manual thumbnail clicks; no touch swipe | **High** |
| `ReelsShowcase.tsx` | Usability / Logic | 12s timer continues to advance video even after user explicitly presses pause | **High** |
| `ReelsShowcase.tsx` | WCAG 2.1.1 (Level A) | Preview cards have `role="button"` and `tabIndex={0}` but lack `onKeyDown` handlers | **Medium** |
| `Header.tsx` | WCAG 2.1.1 / 2.4.3 | Desktop mega menu is unreachable via standard Tab keyboard navigation order | **Medium** |
| `Header.tsx` | WCAG 2.4.3 (Level A) | Mobile drawer does not trap keyboard focus when open | **Medium** |
| `ContactForm.tsx` & `PartnerForm.tsx` | WCAG 1.3.1 (Level A) | Form `<label>` tags lack `htmlFor` and input elements lack `id` | **Medium** |
| `ContactForm.tsx` & `PartnerForm.tsx` | Usability / Reliablity | Submissions rely on `mailto:` protocol which fails silently without desktop mail client | **High** |

---

## 6. Actionable Implementation Plans for Phase 2 & Phase 3

### Phase 2: Immediate Bug & Lint Fixes (Prioritized)

#### Fix 1: Eliminate ESLint Cascading Render Error in `CorporateTrainShowcase.tsx`
- **Problem:** Synchronous `setIsVisible(true)` on line 44 within `useEffect`.
- **Solution:** Initialize `isVisible` as `true` (since it starts visible), eliminating the need to set state on mount:
```tsx
// Before:
const [isVisible, setIsVisible] = useState(false);
useEffect(() => {
    if (!isPlaying) return;
    setIsVisible(true); // <-- ESLINT ERROR
    ...
}, [isPlaying, cycleTime, advanceClient]);

// After:
const [isVisible, setIsVisible] = useState(true);
useEffect(() => {
    if (!isPlaying) {
        if (timerRef.current) clearInterval(timerRef.current);
        if (stateTimerRef.current) clearTimeout(stateTimerRef.current);
        return;
    }

    timerRef.current = setInterval(() => {
        advanceClient();
    }, cycleTime);

    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (stateTimerRef.current) clearTimeout(stateTimerRef.current);
    };
}, [isPlaying, cycleTime, advanceClient]);
```
- **Prevent `onError` Infinite Loop:**
```tsx
onError={(e) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== currentClient.logoFallback) {
        target.src = currentClient.logoFallback;
    }
}}
```

#### Fix 2: Prevent Three.js GPU Memory Leaks in `PartnerLogoSphere.tsx`
- **Solution:** Add WebGL support detection, `IntersectionObserver` to pause rendering when offscreen, and complete disposal of all geometries, materials, and textures in the unmount cleanup:
```tsx
// Check WebGL availability
const isWebGLAvailable = () => {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
        return false;
    }
};

// Cleanup function in useEffect:
return () => {
    cancelAnimationFrame(animId);
    floorGeo.dispose();
    floorMat.dispose();
    planeGeo.dispose();
    drsHeroMat.dispose();
    drsHeroMat.uniforms.map.value?.dispose();
    
    logos.forEach(mesh => {
        mesh.geometry.dispose();
        const m = mesh.material as THREE.ShaderMaterial;
        m.uniforms.map.value?.dispose();
        m.dispose();
    });

    renderer.dispose();
    container.innerHTML = '';
    // Event listener removals...
};
```

#### Fix 3: Fix Reels Auto-Slide Timer Bug in `ReelsShowcase.tsx`
- **Solution:** Only set the fallback auto-advance timer if `isPlaying` is true:
```tsx
useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const video = centerVideoRef.current;
    if (video) {
        video.currentTime = 0;
        video.play().catch(() => {
            if (!video.muted) {
                video.muted = true;
                setIsMuted(true);
                video.play().catch(() => {});
            }
        });
        setIsPlaying(true);
    }

    // Only set auto-slide timer if actually playing
    if (isPlaying) {
        timerRef.current = setTimeout(() => {
            handleNext();
        }, 12000);
    }

    return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };
}, [activeIndex, isPlaying, handleNext]);
```
- Add keyboard accessibility to preview cards:
```tsx
onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePrev();
    }
}}
```

#### Fix 4: Fix 2-Second Pacing & Pause-on-Hover
- Update `HoneycombFeatures.tsx`, `CubeSteps.tsx`, and `RotatingDealGallery.tsx`:
  - Increase auto-advance duration from 2000ms to **6000ms–8000ms**.
  - Add `onMouseEnter={() => setIsPaused(true)}` and `onMouseLeave={() => setIsPaused(false)}`.
  - In `RotatingDealGallery.tsx`, cancel auto-rotation permanently or for 30s when user explicitly selects a thumbnail.

#### Fix 5: Resolve Mobile Overlap between Floating Actions & Chatbot
- In `BottomRightActions.tsx`, replace inline style positions with CSS class `.bottom-right-floating-container`:
```css
.bottom-right-floating-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 990;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

@media (max-width: 480px) {
    .bottom-right-floating-container {
        bottom: 16px;
        right: 16px;
    }
    /* When chatbot is open, hide or tuck the bottom actions */
    body.chatbot-open .bottom-right-floating-container {
        opacity: 0;
        pointer-events: none;
        transform: translateY(20px);
        transition: all 0.25s ease;
    }
}
```

---

### Phase 3: Systematic Modernization & UX Refinement

#### Step 1: Migrate Core Components to Next.js `<Image />`
- Replace 14 `<img>` tags in components with `<Image />`:
  1. `Header.tsx`:
     ```tsx
     import Image from 'next/image';
     <Image
         src="/images/logo-festive-3d-clean.webp"
         alt="DRS Deals 3D Luxury Gold Logo"
         width={140}
         height={76}
         priority
         className="lux-logo-img festive-3d-logo"
     />
     ```
  2. `Footer.tsx`:
     ```tsx
     <Image
         src={siteConfig.logo}
         alt="DRS Deals Logo"
         width={180}
         height={48}
         className="footer-logo-img"
         style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
     />
     ```
  3. `BlogCard.tsx`:
     ```tsx
     <Image
         src={post.image}
         alt={post.imageAlt}
         width={400}
         height={225}
         className="hover-zoom"
         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
     />
     ```
  4. `RotatingDealGallery.tsx`, `PartnerGridGallery.tsx`, `CategoryMarquee.tsx`.

#### Step 2: Implement Real API Submission for Forms
- Create `/api/contact/route.ts` and `/api/partners/route.ts` using structured email dispatch (Resend, Nodemailer, or AWS SES).
- Connect `ContactForm.tsx` and `PartnerForm.tsx` to these endpoints with loading spinners and validation toasts, keeping the `mailto:` option only as an explicit fallback link.
- Connect `NewsletterForm.tsx` into `Footer.tsx` so users on any page can subscribe.

#### Step 3: Upgrade Video UX in `HomeTopVideo.tsx`
- Add `poster="/images/home-video-poster.webp"` to `<video>`.
- Change `preload="auto"` to `preload="metadata"`.
- Add play/pause toggle pill and audio toggle button for compliance with WCAG 2.2.2.

---

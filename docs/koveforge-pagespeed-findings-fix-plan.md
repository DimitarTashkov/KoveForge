# KoveForge — Real PageSpeed Findings: Mobile Speed Fix Plan (v5)
> **Agent brief for whichever Opus agent owns execution**
> Continues KT numbering from v1–v4 (KT-1–24)
> Source: real PageSpeed Insights report, homepage, Aug 3 2026 — Moto G Power emulation, Slow 4G, Lighthouse 13.4.1
> This is not a hypothesis document. Every number below is from the actual report, not inferred from reading code.

---

## The real scores

| Category | Score |
|---|---|
| Performance (mobile) | **61** |
| Accessibility | 98 |
| Best Practices | 100 |
| SEO | 100 |
| Agentic Browsing (new/experimental category) | 1/2 |

| Core Web Vital | Measured | Threshold ("Good") | Status |
|---|---|---|---|
| First Contentful Paint (FCP) | 2.9 s | < 1.8 s | Needs Improvement |
| Largest Contentful Paint (LCP) | 3.2 s | < 2.5 s | Needs Improvement |
| Total Blocking Time (TBT) | **0 ms** | < 200 ms | **Good — no action needed** |
| Cumulative Layout Shift (CLS) | **1.000** | < 0.1 | **Severe — this is the headline problem** |
| Speed Index (SI) | 4.4 s | < 3.4 s | Needs Improvement |

**Important correction to the v4 plan's hypotheses:** v4's B.1 guessed that unminified `project-gallery.js` might be a main-thread execution problem. Real data disproves that — **TBT is 0ms**, meaning JavaScript execution is not hurting the score at all. Don't minify it as a performance fix; it's a nice-to-have for transfer bytes only, not a scoring issue. Real measurement beats hypothesis — this is exactly why v4 insisted on evaluating before touching code.

---

## 🗝️ Keynote takeaways (continuing KT-25 onward)

| # | Takeaway |
|---|---|
| **KT-25** | CLS = 1.000 is not a rounding issue — it's at or near the maximum the metric can register, and the report traces the *entire* score to one element: `<footer class="footer">`. This is the single highest-priority fix in this plan |
| **KT-26** | The CLS problem and the "Render-blocking requests" problem (Est. savings 2,050ms) share the same root cause: Google Fonts. Fixing font delivery is very likely to fix both at once — this is not two separate projects |
| **KT-27** | The critical path data shows one font file chain taking **1,359ms** — the longest single dependency in the entire page load — because loading Google Fonts requires three sequential hops (HTML → Google's CSS → Google's font files) before the browser even knows which font file URLs to request |
| **KT-28** | `_headers` caching is confirmed fully effective — "Use efficient cache lifetimes: Est. savings of 0 KiB." No action needed there; it's already optimal |
| **KT-29** | Preconnects are confirmed complete — PSI explicitly states "No additional origins are good candidates for preconnecting." No action needed there either |

---

## 🔴 P0 — Fix the CLS catastrophe (and the render-blocking cost with it)

### The evidence, laid out together
1. **Layout shift culprits:** 100% of the page's CLS score (1.000) traces to `<footer class="footer">`
2. **Render-blocking requests:** `style.css` (480ms), `visual-refresh.css` (480ms), and the Google Fonts stylesheet (750ms) are flagged with an estimated **2,050ms** in potential savings
3. **Network dependency tree:** the font files load through a 3-hop chain — document → `fonts.googleapis.com/css2?family=...` → `fonts.gstatic.com/.../*.woff2` — with the slowest file arriving at **1,359ms**, the longest critical-path latency on the page
4. **Confirmed in the repo:** `font-display:swap` is already set correctly (good for not hiding text), but swap-by-definition means the page first renders in a fallback font, then re-renders in Inter/JetBrains Mono once the font finally arrives — up to 1.3 seconds later
5. **Confirmed in the repo:** no JavaScript touches the footer directly — its shift isn't a JS bug, it's a downstream consequence of every line of text above it changing size when the fonts swap in. By the time you reach the footer at the bottom of the page, the accumulated height change from the swap is largest there

This is a well-known pattern: **late-arriving, render-blocking Google Fonts causing a full-page reflow on swap.** The fix addresses both the CLS score and the 2,050ms render-blocking estimate simultaneously, because they're the same underlying issue.

### The fix — self-host the fonts

1. Download the actual font files currently being requested (Inter, weights 400–900; JetBrains Mono, weights 400–700) as `.woff2` — Google Fonts' "download family" option or `google-webfonts-helper` can provide self-hostable files with the exact same weights already in use.
2. Save them to `assets/fonts/` in the repo.
3. Replace the current Google Fonts `<link>` tags:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400..900&family=JetBrains+Mono:wght@400..700&display=swap" rel="stylesheet">
   ```
   with local `@font-face` declarations plus preload hints:
   ```html
   <link rel="preload" as="font" type="font/woff2" href="assets/fonts/inter-variable.woff2" crossorigin>
   <link rel="preload" as="font" type="font/woff2" href="assets/fonts/jetbrains-mono-variable.woff2" crossorigin>
   ```
   ```css
   @font-face{font-family:"Inter";src:url("assets/fonts/inter-variable.woff2") format("woff2");font-weight:400 900;font-display:swap}
   @font-face{font-family:"JetBrains Mono";src:url("assets/fonts/jetbrains-mono-variable.woff2") format("woff2");font-weight:400 700;font-display:swap}
   ```
4. This collapses the 3-hop chain (HTML → Google CSS → Google font file) into a single same-origin, preloaded request — directly attacking the 1,359ms critical-path number and the 2,050ms render-blocking estimate.
5. Remove the now-unused `fonts.googleapis.com`/`fonts.gstatic.com` preconnect tags once self-hosted.

### Belt-and-suspenders addition — match fallback font metrics
Self-hosting makes the swap happen *sooner*, which shrinks the window where a mismatch is visible, but doesn't guarantee zero shift by itself if the fallback font's metrics differ from Inter/JetBrains Mono's. For a robust fix, also add metric-matching to the fallback:
```css
@font-face{
  font-family:"Inter Fallback";
  src:local("Arial");
  ascent-override:90%; descent-override:22%; line-gap-override:0%; size-adjust:107%;
}
```
(Exact override percentages depend on Inter's actual metrics — use a generator like Fontaine's or Capsize's fallback calculator against the real font file rather than guessing these numbers.) Set the CSS `font-family` stack to `"Inter", "Inter Fallback", sans-serif` so the fallback occupies the same visual space Inter will, eliminating the reflow even before the real font finishes loading.

### Re-test after this fix specifically
Re-run PageSpeed Insights on the homepage after this change alone, before touching anything else in this plan. If CLS drops close to 0 and the render-blocking estimate disappears, that confirms the diagnosis was right and the rest of this plan is lower-priority polish. If CLS is still elevated afterward, the footer itself needs direct investigation (re-open the Layout shift culprits panel to see if it points somewhere new).

---

## 🟠 P1 — Image delivery (Est. savings: 66 KiB across 3 images)

### 1. Homepage hero image
```html
<img src="assets/images/visuals/hero_dashboard_ui_light_1782566450159.webp" ... width="1024" height="1024" loading="eager" decoding="async">
```
Displayed at 663×663, file is 1024×1024 — flagged for 24.9 KiB in savings. Generate a properly-sized variant (e.g. 700×700 to cover retina at the actual display size) rather than shipping the full 1024×1024 to every device.

### 2. Logo — two separate, stackable issues
```html
<img src="assets/images/brand/koveforge-logo-hq.webp" ... width="100" height="100" fetchpriority="high" decoding="async">
```
- **Compression:** flagged for 15.9 KiB in savings from better compression alone, same dimensions
- **Sizing:** the file is natively 256×256 but displayed at 123×123 in the header — flagged for a further 20.5 KiB
- **Additional wrinkle found in the repo:** this exact same file is *also* used in the footer at a third display size (`.footer-brand img{width:50px;height:50px}`). One fixed-size file can't be simultaneously correct for a 123×123 header slot and a 50×50 footer slot — this needs `srcset` with 2–3 size variants (e.g. 64w/128w/256w), not just a single resize, or two purpose-built files if that's simpler for a hand-maintained site.

### 3. Hotel Oazis project card image
```html
<img src="assets/images/projects/hotel-oazis/19-image7.webp" ... width="520" height="320" loading="lazy" decoding="async">
```
Displayed at 660×396 (note: CSS display size differs from the HTML width/height attributes here — worth double-checking which is authoritative), file is 803×482 — flagged for 17.0 KiB. This is the same class of issue flagged generally for project-card images back in the v2 performance plan (no `srcset` sitewide) — this is PSI now confirming it with a real number on a specific file, not a general suspicion.

---

## 🟡 P2 — Forced reflow in `navigation.js` (39ms — minor, but real)

PSI's trace points to `navigation.js?v=20260705:1:1839`. Reading the file, there are two candidate patterns, both well-known forced-reflow causes:

1. **Mobile menu focus management** — `navToggle.focus()` is called immediately after `classList.toggle(...)` mutations when the menu closes (e.g. via Escape key). Calling `.focus()` right after a style-affecting DOM mutation is a classic forced-reflow trigger, because the browser must resolve layout to know if the target is focusable/visible.
2. **Header hide-on-scroll** — the scroll handler reads `window.scrollY` inside a `requestAnimationFrame` loop, immediately after which it mutates `classList` on the (likely `position: sticky`) header. Across consecutive scroll frames, this read-after-write pattern can force a synchronous layout flush.

Don't guess which one — 39ms is small enough that it's worth 5 minutes of confirmation before changing code. Open Chrome DevTools → Performance panel, record a trace while scrolling and toggling the mobile menu, and check the exact flagged call in the "Bottom-Up" or "Forced reflow" warning to see which of the two it actually is. Fix accordingly:
- If it's the focus call: defer the `.focus()` to the next animation frame (`requestAnimationFrame(() => navToggle.focus())`) so it runs after the browser has already settled the layout from the class change.
- If it's the scroll handler: cache `scrollY` reads and decouple them from the same-frame `classList` writes, or migrate the hide-on-scroll behavior to `IntersectionObserver` with a sentinel element, which sidesteps synchronous scroll-position reads entirely.

---

## 🟢 P3 — Reduce unused CSS (Est. savings: 13 KiB)

Modest relative to the font fix. Worth doing as part of the same pass since you'll already be in `style.css` for the font changes, but doesn't justify a dedicated critical-CSS-extraction project on its own — 13 KiB is real but not the kind of number that changes the site's performance category. Use Chrome DevTools' Coverage tab on the live page to see exactly which rules are unused before trimming anything, so nothing needed for other viewport sizes gets cut by mistake.

---

## Minor items worth a mention, not urgent

- **Accessibility (98/100):** "Heading elements are not in a sequentially-descending order" — a heading level gets skipped somewhere on the homepage. Cheap to find (scan the `<h1>`–`<h6>` sequence) and fix; not a speed issue, but it was in the same report and costs little to close out while in the code.
- **`cdn-cgi/l/email-decode.min.js`:** Cloudflare's automatic email-obfuscation script, 1.22 KiB / 174ms in the critical path. This is Cloudflare protecting any visible email address from scrapers — small cost, and disabling it would expose the email address in plain HTML, so leave it unless spam isn't a concern.
- **Agentic Browsing (1/2):** a new, still-experimental PSI category — its one failing check is the same CLS issue already covered in P0. No separate action needed; it should resolve alongside the font fix.

---

## ✅ Already confirmed good — do not touch

| Item | Evidence |
|---|---|
| Caching (`_headers`) | PSI: "Use efficient cache lifetimes — Est. savings of 0 KiB" |
| Preconnect hints | PSI: "No additional origins are good candidates for preconnecting" |
| JS execution / main-thread cost | TBT = 0ms — confirmed non-issue, don't prioritize minifying `project-gallery.js` for performance reasons |
| Long tasks | Only 1 found, consistent with 0ms TBT — not a real problem |

---

## 📁 File change map

| File | Change |
|---|---|
| `index.html` (and all pages using the same font `<link>` tags) | Remove Google Fonts `<link>`s, add self-hosted `@font-face` preloads |
| `assets/fonts/` | **New folder** — self-hosted Inter + JetBrains Mono `.woff2` files |
| `assets/css/style.css` | Add `@font-face` rules with fallback `size-adjust` metric matching; trim confirmed-unused rules (P3) |
| `assets/images/visuals/hero_dashboard_ui_light_*.webp` | Resize to match actual display dimensions |
| `assets/images/brand/koveforge-logo-hq.webp` | Re-compress + add `srcset` variants for header (123px) vs footer (50px) use |
| `assets/images/projects/hotel-oazis/19-image7.webp` | Resize/re-encode to match display dimensions |
| `assets/js/navigation.js` | Fix forced-reflow source once confirmed via DevTools trace (P2) |

---

## 📊 P0 verification — measured result (Aug 3 2026, post-deploy)

Re-tested against the live site at `https://www.koveforge.tech/` after commit `38252c4`
shipped through GitHub Pages. Engine: **Lighthouse 13.4.1, mobile form factor, simulated
throttling — the same engine and version the original PSI report used.** Run locally
rather than through the PSI web service because the keyless PSI API quota was exhausted
that day; the lab numbers are produced by the same Lighthouse binary either way.

| Metric | Before (PSI, Aug 3) | After P0 | Change |
|---|---|---|---|
| **Performance score** | 61 | **99** | +38 |
| **CLS** | **1.000** | **0.000** | target <0.1 — **met** |
| **Render-blocking est. savings** | **2,050 ms** | **250 ms** | −1,800 ms |
| FCP | 2.9 s | 1.3 s | −1.6 s |
| LCP | 3.2 s | 1.9 s | −1.3 s |
| Speed Index | 4.4 s | 2.6 s | −1.8 s |
| TBT | 0 ms | 0 ms | unchanged (was already good) |

Supporting evidence:
- **Layout shift culprits panel is empty** — the `layout-shifts` audit returns
  `notApplicable` with zero items. The `<footer class="footer">` culprit is gone, not merely reduced.
- **Google Fonts requests: 0** in the network waterfall (was a 3-hop chain).
- The 1,359 ms critical-path font file is gone. Same-origin font loads now cost
  46 / 51 / 69 / 115 ms. Whole page is 18 requests.
- Remaining render-blocking 250 ms is `style.css` (150 ms) + `visual-refresh.css` —
  our own same-origin CSS, no third-party chain left.

### ⚠️ Correction to this plan's CLS root-cause diagnosis

The plan attributed CLS 1.000 to the Google Fonts swap reflow (KT-25/KT-26). The
evidence says that was **not** the real cause. The actual culprit was
`content-visibility:auto` on `<main>`, removed in commit `098545f`:

> `<main>` always intersects the viewport, so it could never actually be skipped and
> the property bought no rendering work — but for one layout pass it reported height 0,
> which put the footer at the top of the viewport and then dropped it ~18,000px once
> `main` got its real height.

That mechanism explains what a font swap cannot: a score at the metric's 1.000 ceiling
attributed **100% to a single element**, the footer. `font-display:swap` produces small
shifts spread across many text nodes, typically 0.05–0.3 — not 1.000 on one element.

Both fixes shipped in the same deploy, so they are strictly confounded in this
measurement. But the mechanism, and the fact that CLS landed at exactly 0.000, both
point at `content-visibility`. The font self-hosting is what earned the −1,800 ms
render-blocking and −1.6 s FCP; it was not what fixed CLS.

**Consequence for the checklist:** the `size-adjust` fallback-metrics item was
prescribed as belt-and-suspenders *for CLS*. CLS is now 0.000 — that item has no
measurable target left, and picking wrong override percentages visibly alters text
rendering. Left undone deliberately; see checklist note.

### Revised P1/P3 numbers (re-measured, supersede the pre-fix figures above)

- **P1 total is now 46 KiB, not 66 KiB** — several image commits landed since the
  original report. Current: hero **20.5 KiB** (was 24.9), Hotel Oazis `19-image7.webp`
  **17.0 KiB** (unchanged), logo **8.5 KiB** (was 15.9 + 20.5 = 36.4, already partly resized).
- **P3 is already resolved** — `unused-css-rules` now scores 1 with no reported savings.
  The 13 KiB is gone. No work required.

---

## 📊 P1 / P2 / accessibility — measured result (Aug 3 2026, pre-deploy)

Measured with Lighthouse 13.4.1 against a local server running the exact build, so
these are lab numbers for the code, not yet for the live origin. A live re-run is
still owed after deploy.

| Audit | After P0 | After P1/P2 |
|---|---|---|
| `image-delivery-insight` | **46 KiB** | **6 KiB** |
| Accessibility score | 98 | **100** |
| `heading-order` | FAIL | **PASS** |
| CLS / TBT | 0 / 0 ms | 0 / 0 ms |

### P1 — what shipped
Nothing was resized in place. `19-image7.webp` also serves `og:image` and the
full-width `.case-image`, and the hero's 1024px still earns its keep on desktop at
2x, so every fix is an added `srcset` rung instead:

- **Hero** — added 512w/768w rungs, `sizes="(min-width:1024px) 560px, 100vw"`.
  Mobile was pulling all 1024px for a 663px slot. **21.0 KiB → 0.**
  The `dark-only` hero got the same treatment; PSI never flagged it only because
  the audit runs in light mode.
- **Hotel Oazis** — added a 660w rung (30.4 KiB vs 52.2 KiB). The first `sizes` I
  wrote (`100vw`) still picked the 803w file, because the card is 377 CSS px inside a
  412 px viewport, not full-bleed. Measured the real width at seven viewports and
  wrote `sizes` from that. **17.0 KiB → 0.**
- **Logo** — the flagged waste was *compression*, not sizing (150×150 already, not
  the 256×256 the plan assumed — an earlier commit had resized it). Added a 128w
  header rung and a 100w footer rung. **8.5 KiB → 5.8 KiB.**
  The residual is not achievable: a quality sweep showed q60 buys ~1 KiB against
  visible degradation on a logo with an alpha channel. Lighthouse's compression
  estimate is unreliable for WebP+alpha. Left at q82.

### P2 — trace first, then fix
A real Chrome trace (CDP, 4× CPU throttle, mobile emulation, scripted scroll and
menu toggle) attributed **146 forced style recalcs / 201 ms to `fn=a`** — the
rAF scroll handler. **The plan's candidate 1 (`navToggle.focus()`) never appeared
in the trace at all.** Candidate 2 confirmed.

Worth recording: the first fix attempted was guarding the `classList` writes so they
only fire on real state change. Across three runs per variant it made **no
difference** (218.6 / 219.8 / 217.6 ms medians) — the single-run numbers that first
suggested otherwise were noise. The write guard was not the answer.

What worked is the plan's actual wording — *decouple the read from the same-frame
writes*: read `window.scrollY` in the passive `scroll` listener, let the rAF callback
only write. **137.6 ms → 0.0 ms forced reflow, 125 events → 0, reproducible across
three runs.** Header show/hide, the 120px threshold, the 8px deadzone, menu-open
suppression, Escape handling and focus return were all verified unchanged.

### Accessibility
- `index.html` — 17 card titles sat at `h4` directly under an `h2`. Promoted to `h3`
  and moved the two context CSS rules with them. Computed styles diffed before and
  after across all 17: **identical** on font-size, weight, line-height, letter-spacing,
  colour, margin and family.
- `services.html` — had its own undetected `h1 → h3` gap. The service-card section had
  no heading at all, so it got a visually-hidden `h2` via the existing `.sr-only`
  utility, which also gives the section an accessible name.

### Cache busts
`style.css` and `navigation.js` both changed content, and their previous tokens are
live and cached, so both were bumped to `?v=20260803`. Font files were untouched and
keep `?v=20260730`. New image variants ship with `?v=20260803`.

---

## ✅ Definition of done

```
[x] Fonts self-hosted; Google Fonts external requests removed from network waterfall
        -> verified: 0 googleapis/gstatic requests in the waterfall
[x] Re-run PSI on homepage: CLS measurably improved from 1.000 (target: < 0.1)
        -> 1.000 -> 0.000; layout-shifts audit notApplicable, zero culprits
[x] Re-run PSI on homepage: render-blocking estimate reduced from 2,050ms
        -> 2,050ms -> 250ms (own CSS only, no third-party chain)
[~] Fallback font metrics matched via size-adjust (belt-and-suspenders on CLS)
        -> NOT DONE, deliberately. CLS is already 0.000, so this optimises against
           a metric at floor while risking visible text-rendering changes. Revisit
           only if CLS regresses. Decision belongs to the owner, not the agent.
[x] Hero image, logo, and Hotel Oazis image resized/compressed per PSI's specific numbers
        -> image-delivery-insight 46 KiB -> 6 KiB. Hero and Hotel Oazis fully cleared;
           logo residual 5.8 KiB is a Lighthouse heuristic WebP+alpha cannot hit
[x] Logo has srcset covering both its header (123px) and footer (50px) display contexts
        -> 128w header rung + 100w footer rung, sizes="70px" / "50px".
           Note: 123px is 70 CSS px x 1.75 DPR, not a 123px header slot as the plan read it
[x] navigation.js forced-reflow source confirmed via DevTools trace before any fix applied
        -> trace ran first; named fn=a (scroll handler), cleared candidate 1 entirely.
           Fix measured at 137.6ms -> 0.0ms over three runs per variant
[x] Heading hierarchy gap found and fixed (quick accessibility win)
        -> index.html h2->h4 fixed (17 titles, computed styles verified identical);
           services.html h1->h3 also found and fixed. Accessibility 98 -> 100
[x] P3 unused CSS (13 KiB) — no longer applicable
        -> unused-css-rules now scores 1 with no reported savings; nothing to trim
[~] Full PSI re-run afterward; Performance score improvement documented before/after
        -> P0 documented live (61 -> 99). P1/P2 verified in lab against a local server;
           a live re-run is still owed once this deploys
[~] Fallback font metrics matched via size-adjust
        -> still deliberately not done; see the P0 section for why
```

---

*Every fix above traces to a specific number in the real report. P0 (fonts/CLS) is where almost all of the actual score damage lives — do it first, re-test, and treat P1–P3 as genuine but secondary once P0's impact is confirmed.*

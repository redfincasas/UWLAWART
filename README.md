# UWLAW ART — site

Plain HTML/CSS/JS, no build step, no dependencies. Deploys straight to Cloudflare Pages.

## Files
- `index.html` — page structure
- `styles.css` — all styling (design tokens at the top of the file)
- `script.js` — mobile nav, scroll reveal, contact form handling

## 1. Logo
`logo.png` is already wired into the header and footer, sitting on a small white chip so the black artwork reads clearly against the dark background (the original file has a black mark on solid white, and the site background is near-black — the chip keeps it legible instead of the black fill disappearing). Swap `logo.png` for a new file anytime and the chip sizing will still work; just keep it reasonably tight-cropped.

## 2. The work carousel
Right now the carousel runs on 9 real photos sitting in the `/work` folder (`work-1.jpg` … `work-9.jpg`) — left/right arrow buttons, dot navigation, keyboard arrows, and swipe on mobile all work already, no API needed.

**To add or swap photos:** drop a new image in `/work`, then in `index.html` either edit an existing line or add a new one inside `<div class="carousel-track">`:

```html
<div class="carousel-slide"><img src="work/work-10.jpg" alt="Describe the mural here" loading="lazy"></div>
```

Add a matching `<button class="carousel-dot">` in `.carousel-dots` for each slide — script.js counts whatever's there, so nothing else needs to change.

**To switch to the live Instagram feed later:**
1. Go to **snapwidget.com** and log in with the `@uwlawart` Instagram account.
2. Create a widget → choose the **Carousel** or **Slider** layout — these give visitors left/right click-through navigation between photos.
3. Set the accent color to `#2946FF` and background to `#101114` so it blends with the site.
4. Copy the `<iframe>` code SnapWidget gives you.
5. In `index.html`, replace the whole `<div class="carousel" id="work-carousel">...</div>` block with the iframe.

EmbedSocial works the same way if you'd rather use that instead.

## 3. FAQ section
20 questions covering pricing, service area, timelines, permits, surfaces, and process — aimed at "custom mural nyc" style searches. It includes `FAQPage` and `LocalBusiness` structured data (JSON-LD, in `index.html`) so search engines and AI assistants/agents can surface these answers directly. If your pricing, location, or turnaround times change, update both the visible `<details>` blocks *and* the matching JSON-LD text so they stay in sync.

## 4. Contact form
The form submits directly to `info@uwlawart.com` using **FormSubmit** — no backend, no signup, nothing to configure.

- **The first submission after this goes live triggers a one-time confirmation email** to `info@uwlawart.com` from FormSubmit. Someone needs to open that email and click "Activate Form" once. Every submission after that lands in the inbox normally, formatted as a table with the name/email/location/message fields.
- After a successful submission, people are redirected back to the site with a "Thanks" message instead of FormSubmit's generic confirmation page.
- If you ever want more control (custom templates, logging to a spreadsheet, etc.), swap the form's `action` attribute for Formspree or a Cloudflare Pages Function instead — same drop-in pattern.

The WhatsApp number (646-894-6811) is also linked in the header, the footer, and directly under the contact form via `wa.me` links — those just open a WhatsApp chat, no setup needed.

## 5. Deploy to Cloudflare Pages
1. Push this folder to a GitHub repo (or use Cloudflare's direct upload).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git** (or "Upload assets" for a direct drag-and-drop deploy).
3. Build settings: leave **build command empty** and set **output directory** to `/` (this is a static site, nothing to build).
4. Deploy. That's it.

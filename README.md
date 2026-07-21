# UWLAW ART — site

Plain HTML/CSS/JS, no build step, no dependencies. Deploys straight to Cloudflare Pages.

## Files
- `index.html` — page structure
- `styles.css` — all styling (design tokens at the top of the file)
- `script.js` — mobile nav, scroll reveal, contact form handling

## 1. Logo
`logo.png` is already wired into the header and footer, sitting on a small white chip so the black artwork reads clearly against the dark background (the original file has a black mark on solid white, and the site background is near-black — the chip keeps it legible instead of the black fill disappearing). Swap `logo.png` for a new file anytime and the chip sizing will still work; just keep it reasonably tight-cropped.

## 2. Wire up the Instagram carousel
This uses a third-party embed (no custom scraping code, no API tokens to manage):

1. Go to **snapwidget.com** and log in with the `@uwlawart` Instagram account.
2. Create a widget → choose the **Carousel** or **Slider** layout — these give visitors left/right click-through navigation between photos, which is what you asked for.
3. In the widget's style settings, set the accent color to `#2946FF` and background to `#101114` so it blends with the site.
4. Copy the `<iframe>` code SnapWidget gives you.
5. Open `index.html`, find `<div id="ig-embed">`, and paste the iframe in, replacing the placeholder `<div class="ig-placeholder">` block.

EmbedSocial works the same way if you'd rather use that instead.

## 3. FAQ section
20 questions covering pricing, service area, timelines, permits, surfaces, and process — aimed at "custom mural nyc" style searches. It includes `FAQPage` and `LocalBusiness` structured data (JSON-LD, in `index.html`) so search engines and AI assistants/agents can surface these answers directly. If your pricing, location, or turnaround times change, update both the visible `<details>` blocks *and* the matching JSON-LD text so they stay in sync.

## 4. Contact form
The form currently just shows a confirmation message in the browser — it doesn't send anywhere yet. Two easy options:
- **Formspree / Getform**: sign up, change the `<form>` tag's `action` attribute to the URL they give you, and it'll submit for real with zero code changes.
- **Cloudflare Pages Function**: add a `/functions/contact.js` file that forwards submissions to an email API (Resend, Postmark, etc). More setup, but keeps everything on Cloudflare.

## 5. Deploy to Cloudflare Pages
1. Push this folder to a GitHub repo (or use Cloudflare's direct upload).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git** (or "Upload assets" for a direct drag-and-drop deploy).
3. Build settings: leave **build command empty** and set **output directory** to `/` (this is a static site, nothing to build).
4. Deploy. That's it.

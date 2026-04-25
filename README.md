# Awamane Consult Ltd — Website

Production-grade website for **Awamane Consult Ltd**, a Kenyan agricultural consultancy led by Prof. Titus Ikusya Kanui. Built with Astro 5, React (islands), Tailwind CSS v4, and Markdown content collections.

---

## Quick start

```bash
# Install dependencies
npm install

# Run the development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

That's it. No backend to configure, no database, no CMS — all content lives in `src/content/` as Markdown files.

---

## Project structure

```
awamane-consult/
├── public/                     Static assets served as-is
│   ├── logo.png
│   ├── robots.txt
│   └── images/                 Field photos, optimized at build time
│
├── src/
│   ├── assets/                 Images processed by Astro (if any)
│   │
│   ├── components/
│   │   ├── layout/             Header, Footer
│   │   ├── sections/           Hero, cards, CTA, contact form, etc.
│   │   └── ui/                 Small primitives (icons, eyebrow)
│   │
│   ├── content/                ← Edit these to update site content
│   │   ├── services/           One .md file per service pillar
│   │   ├── projects/           One .md file per project
│   │   ├── team/               One .md file per team member
│   │   └── blog/               One .md (or .mdx) file per post
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro    Shared page shell (head, header, footer, SEO)
│   │
│   ├── pages/                  File-based routing
│   │   ├── index.astro         /
│   │   ├── about.astro         /about
│   │   ├── training.astro      /training
│   │   ├── contact.astro       /contact
│   │   ├── 404.astro           Custom not-found page
│   │   ├── services/
│   │   │   ├── index.astro     /services
│   │   │   └── [slug].astro    /services/crops-and-soil, /services/livestock, ...
│   │   ├── projects/
│   │   │   ├── index.astro     /projects
│   │   │   └── [slug].astro    /projects/mango-orchard, ...
│   │   └── blog/
│   │       ├── index.astro     /blog
│   │       └── [slug].astro    /blog/whatever-post
│   │
│   ├── styles/
│   │   └── global.css          Tailwind v4 + design tokens + utilities
│   │
│   ├── config.ts               SITE constants, NAV_LINKS — edit contact info here
│   └── content.config.ts       Content collection schemas
│
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Editing content

**All text and imagery comes from two places:**

### 1. `src/config.ts` — global site data

Open this file to change:
- Business name, tagline, description
- Phone number, email, address
- LinkedIn URL
- Navigation structure

This is where you should replace the **placeholder contact details** (`+254 700 000 000`, `info@awamaneconsult.co.ke`) with the real ones before launch.

### 2. `src/content/` — page content

Each subfolder is a "collection":

- `services/` — three Markdown files, one per pillar (crops, livestock, water)
- `projects/` — one file per project, with frontmatter specifying category, location, cover image
- `team/` — one file per team member; Prof. Kanui is the "lead"
- `blog/` — empty; add a `.md` file here and it appears on `/blog` automatically

Frontmatter keys are validated against the schema in `src/content.config.ts`. If you add a wrong key or leave a required one out, the build will fail with a clear message.

### Adding a blog post

Create `src/content/blog/my-post.md`:

```markdown
---
title: "How to read a soil test report"
description: "A practical walkthrough for smallholder farmers."
pubDate: 2026-05-01
author: "Prof. Titus Kanui"
coverImage: "/images/my-cover.jpg"
tags: ["soil", "farming basics"]
---

Your article content goes here. Markdown works as expected:
headings, **bold**, *italics*, lists, [links](https://example.com).
```

Save and refresh — it's live.

### Adding a new project

Drop a Markdown file into `src/content/projects/`:

```markdown
---
title: "Dairy Cooperative Support"
summary: "Helping a 40-member dairy cooperative improve milk yields..."
location: "Kiambu County"
year: "2025"
category: "livestock"
coverImage: "/images/my-project-cover.jpg"
featured: true
order: 7
---

Longer project description in the body...
```

`category` must be one of: `crops`, `livestock`, `water`, `training`, `community`.

---

## Images

Put photos in `public/images/` and reference them by path, e.g. `coverImage: "/images/my-photo.jpg"`.

For best performance, keep images under 2000px on the longest side before uploading.

---

## Design system

Brand colors, typography, and component utilities are defined in `src/styles/global.css`. The theme uses CSS variables pulled directly from the Awamane logo:

- `--color-forest-*` — primary green palette
- `--color-earth-*` — gold / ochre accents
- `--color-water-*` — blue water motif
- `--color-cream`, `--color-sand` — warm backgrounds
- Typography: **Fraunces** (display) + **Inter** (body), loaded from Google Fonts

To tweak the palette, edit the `@theme` block at the top of `global.css`.

---

## Contact form

The form on `/contact` is a **React island** (`src/components/sections/ContactForm.tsx`). It currently simulates a successful submit — you'll want to wire it to a real endpoint before launch. The quickest path:

1. Sign up for a free [Formspree](https://formspree.io/) account
2. Create a new form and copy its endpoint URL
3. Replace the `await new Promise(...)` stub in `ContactForm.tsx` with a `fetch()` call to that endpoint

Alternatively, use [Web3Forms](https://web3forms.com/), [Netlify Forms](https://docs.netlify.com/forms/setup/), or your own API.

---

## Deploying

The site is pure static HTML — deploy anywhere:

- **Vercel:** push to GitHub, import project, done. Free.
- **Netlify:** same — `npm run build` produces the `dist/` folder.
- **Cloudflare Pages:** connect your repo, set build command to `npm run build`, output directory to `dist`.

Before deploying, update `site` in `astro.config.mjs` to your final domain so the sitemap and canonical URLs point to the right place.

---

## Pre-launch checklist

- [ ] Replace placeholder phone/email in `src/config.ts`
- [ ] Confirm registered name and address (currently "Awamane Consult Ltd", Kyevaluki, Machakos County)
- [ ] Add a real photograph of Prof. Kanui (currently using an elegant monogram placeholder)
- [ ] Update the "500+ farmers, 40+ workshops..." stats on `/training` with actual numbers
- [ ] Add real client/partner names and logos
- [ ] Wire up the contact form to a real endpoint (Formspree recommended)
- [ ] Update `site` URL in `astro.config.mjs`
- [ ] Add Google Analytics or Plausible if tracking is wanted
- [ ] Create social media profiles and add links to the footer + config
- [ ] Set up a favicon (currently using the logo — consider a cleaner icon for tiny sizes)

---

## License

All content © Awamane Consult Ltd. Source code provided for the client's use.

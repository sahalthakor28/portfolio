# Muhammadsahal Thakor — portfolio

Quiet, white/black/gray portfolio. Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lenis.
No GSAP, no three.js, no loader, no external runtime scripts.

## Run

```bash
npm install          # postinstall copies fonts -> src/fonts and brand logos -> public/logos
npm run dev          # http://localhost:3000
npm run build && npm start
```

Put your résumé PDF at `public/resume.pdf` (the "Résumé ↓" buttons download it).

## Content

Everything on the page is read from `src/lib/data.ts`, taken from the résumé. Edit it there.
Nothing was invented: no GitHub links per project, no achievements, no testimonials.
The Achievements section is not rendered because the résumé has no ranks, ratings or honours.

## Sections

| # | Section | Component | Motion |
|---|---|---|---|
| – | Hero | `hero/Hero.tsx` | looping intro video, voice pauses when <35% visible |
| 01 | About | `sections/About.tsx` | hanging ID card, damped pendulum, 3D flip |
| 02 | Skills | `sections/Skills.tsx` | periodic table, diagonal wave reveal, inspector |
| 03 | Work | `sections/Work.tsx` | expanding accordion, illustrative UI wipe |
| 04 | Certifications | `sections/Certifications.tsx` | ink-flood rows |
| 05 | Experience | `sections/Experience.tsx` | scroll-drawn timeline |
| 06 | Contact | `sections/Contact.tsx` | hopping letters, copy chip, spinning badge |

## Rebuilding the hero video

```bash
python3 scripts/build-hero-assets.py path/to/intro.mp4
```

Needs `ffmpeg`, `numpy`, `Pillow`. The crop (`CROP`, 4:5) is set for the supplied 1280×720 clip.
The script crops, whitens the backdrop (white point 0.93 for this footage), cross-fades the last 0.5 s
into the first 0.5 s for picture and audio (numpy, sample-accurate), and writes `public/hero/hero.mp4`,
`hero.webm`, `public/portrait-bust.webp` and `public/og.jpg`.

## Checks

```bash
npm run lint
npm start &                      # after npm run build
npx playwright install chromium
node scripts/check-overflow.mjs  # scrollWidth === innerWidth at 360–1920 px, screenshots at 1440 and 390
```

## Credits and licences

- Brand logos: [devicon](https://github.com/devicons/devicon) "original" SVGs, MIT. Licence copied to `public/logos/LICENSE-devicon.txt`.
  Logos that devicon lacks (e.g. ERPNext, Ganache) fall back to thin line icons.
- Fonts (self-hosted via `next/font/local`, SIL OFL): Inter Tight, Instrument Serif, JetBrains Mono, from the Fontsource packages.

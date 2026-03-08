# Aşkın Fear — Developer Portfolio

Live at **[askin-portfolio.vercel.app](https://askin-portfolio.vercel.app)**

A hand-crafted, production-grade portfolio built with Next.js 16, TypeScript, and custom CSS. Designed to showcase full-stack SaaS work through interactive project case studies, scroll-reveal animations, and a clean dark-mode UI — with no animation libraries.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Custom CSS (no Tailwind, no UI libs) |
| Font | Geist Sans / Geist Mono |
| Deployment | Vercel (auto-deploy from `main`) |

---

## Features

- **Project case studies** — per-slide content with image carousels, section titles, descriptions, and bullet points for each featured project
- **Featured / Other Projects split** — recruiter-focused layout with a primary grid and a secondary grid for earlier work
- **Scroll-reveal animations** — powered by `IntersectionObserver`, zero runtime dependencies
- **Filterable project grid** — filter by tech stack tag with live count badges
- **SEO metadata** — Open Graph, Twitter card, keywords, robots directives, and `metadataBase` configured for Vercel
- **Animated background** — floating orbs and CSS grid overlay, CSS-only
- **Fully responsive** — tested across mobile, tablet, and desktop breakpoints

---

## Projects Showcased

### Featured
| Project | Description | Stack |
|---|---|---|
| [Flowody](https://askin-portfolio.vercel.app) | Workforce SaaS — scheduling, invoicing, templates | React, TypeScript, Node.js, PostgreSQL |
| [Clevermode](https://clevermode.com.au) | Production SaaS — printer registration, billing, AWS | Next.js, Firebase, Stripe, AWS |
| This Portfolio | The site itself | Next.js 16, TypeScript, CSS |

### Other
Cocktail Finder, Gossip Girl API, Realm Portfolio

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
├── layout.tsx          # Root layout — SEO metadata, fonts
├── page.tsx            # Redirects / → /portfolio
├── portfolio/
│   └── page.tsx        # Main portfolio page (all sections)
└── globals.css         # All styles
public/
└── *.png               # Project screenshots and OG image
```

---

## Deployment

Automatically deployed to Vercel on every push to `main`. No manual steps required.

```bash
git push origin main   # triggers deploy
```

---

## Contact

**Aşkın Fear** — Full-Stack Developer, Melbourne AU

- [askin-portfolio.vercel.app](https://askin-portfolio.vercel.app)
- [linkedin.com/in/askin-fear](https://www.linkedin.com/in/askin-fear/)
- [github.com/wild-butterfly](https://github.com/wild-butterfly)
- askinfear@hotmail.com

# Adil Jaseem - Professional Portfolio V4

A modern Next.js portfolio presenting Adil Jaseem as a **Full Stack Software Engineer working across AI platforms, distributed systems, real-time products, and LLM infrastructure**.

This revision replaces the earlier signal-service-heavy positioning with the complete QuantiFore contribution story: the full frontend, core SML workflow and services, entity and real-time services, signal intelligence, local model infrastructure, environment orchestration, observability, and Git workflows.

## What changed in V4

- Simplified typography using **Inter** for all primary text and **IBM Plex Mono** only for technical metadata.
- Added a custom React Bits-inspired rotating hero headline with word-level blur, depth, and reduced-motion support.
- Added pointer-driven 3D tilt, scroll parallax, animated network visuals, architecture pulses, project system diagrams, and restrained ambient motion.
- Rewrote About, Experience, Architecture, Projects, and Skills around verified end-to-end ownership.
- Presents Signal Scraper and Signal Scheduler as the **latest major contribution inside QuantiFore**, not as a separate professional identity.
- Adds focused QuantiFore case studies for:
  - Full platform engineering
  - Core Stock or Model Lookup workflow
  - Evidence-backed signal intelligence
  - Multi-environment platform operations
- Adds four project-image slots to the primary QuantiFore case study and additional slots to the focused case studies.
- Includes an updated ATS-friendly résumé in both PDF and DOCX formats.
- Includes ready-to-copy LinkedIn, CV, and ownership-reference documents in `career/`.

## Positioning used by the portfolio

**Full Stack Software Engineer - AI Platforms & Distributed Systems**

The contribution hierarchy is intentionally explicit:

### Built directly

- Complete QuantiFore React and TypeScript frontend
- SML Coordinator Service
- SML Orchestrator Service
- Query Parser Service
- Entity Resolution Service
- WebSocket Gateway Service
- Signal Scraper Service
- Signal Scheduler Service
- Local llama.cpp, Ollama, and MLX integration
- Docker Compose development, staging, and production workflows
- Bootstrap automation
- Grafana, Loki, and Grafana Alloy observability
- Git branching, repository, integration, and release workflows

### Integrated, extended, debugged, or supported

- ETL, CFRI, and ATI workflows
- Blueprint, dashboard, simulation, authentication, gateway, CDC, relational, graph, time-series, and cache services

See [`career/OWNERSHIP_REFERENCE.md`](career/OWNERSHIP_REFERENCE.md) before making future content changes.

## Technology stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Motion
- Lucide React
- React Icons for brand marks
- Native Canvas 2D network animation
- Server-side contact endpoint with optional Resend delivery

## Run locally

The repository pins Node 24 through `.nvmrc`.

```bash
nvm install
nvm use
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Before deployment, run:

```bash
npm run check
```

## Environment variables

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=916238933779

# Optional server-side contact delivery
RESEND_API_KEY=re_replace_me
CONTACT_TO_EMAIL=your-email@example.com
CONTACT_FROM_EMAIL=Portfolio <hello@your-verified-domain.com>
```

The portfolio still works without the Resend variables. Visitors can use direct email, LinkedIn, GitHub, or WhatsApp.

## Résumé files

The embedded `/resume` route uses:

```text
public/resume/adil-jaseem-resume.pdf
public/resume/adil-jaseem-resume.docx
```

The page provides browser viewing, PDF download, and editable DOCX download. Replace either file while keeping the same filename to update it without changing React code.

## Add QuantiFore screenshots

Place sanitized WebP or AVIF images in:

```text
public/projects/
```

Then add the image path to the matching media entry in `lib/portfolio-data.ts`:

```ts
{
  label: "Simulation workspace",
  description: "Causal graph, scenario controls, and timeline.",
  alt: "QuantiFore simulation workspace",
  src: "/projects/quantifore-simulation.webp",
}
```

Until `src` is supplied, the portfolio renders a polished animated placeholder.

Recommended primary screenshots:

```text
quantifore-dashboard.webp
quantifore-monitoring.webp
quantifore-simulation.webp
quantifore-signals.webp
```

Remove customer names, private IP addresses, internal URLs, credentials, proprietary prompts, private datasets, and confidential diagrams before publishing.

## Main content files

- `lib/site.ts` - personal, contact, social, and résumé settings
- `lib/portfolio-data.ts` - experience, skills, projects, case studies, ownership, and image slots
- `components/rotating-role.tsx` - animated hero role phrases
- `components/hero-section.tsx` - parallax hero and 3D tilt interaction
- `components/architecture-section.tsx` - interactive contribution map
- `components/project-visual.tsx` - animated project-specific system visuals
- `career/LINKEDIN_PROFILE_UPDATE.md` - LinkedIn headline, About, Experience, Projects, Featured, and Skills copy
- `career/CV_MASTER_CONTENT.md` - editable master résumé content
- `career/OWNERSHIP_REFERENCE.md` - wording boundaries for built versus integrated work

## Routes

- `/` - complete portfolio
- `/resume` - embedded résumé and downloads
- `/work/quantifore-platform`
- `/work/quantifore-sml-workflow`
- `/work/quantifore-signal-intelligence`
- `/work/quantifore-platform-operations`
- `/work/newsraven`
- `/work/earlier-product-experience`
- `/api/contact` - optional server-side contact delivery

## Contact options

The project uses four complementary contact paths:

- Direct WhatsApp conversation link
- Direct email link
- LinkedIn
- Server-side contact form through Resend when configured

No email provider credential is exposed to the browser.

## Quality and accessibility

- Semantic landmarks and heading hierarchy
- Keyboard-operable navigation and controls
- Visible focus states
- Mobile navigation with Escape support and body locking
- `prefers-reduced-motion` handling across CSS, Motion, and Canvas
- Secure response headers
- Metadata, Open Graph image, JSON-LD, sitemap, robots, and web manifest
- Print-ready and downloadable résumé assets

See [`VALIDATION.md`](VALIDATION.md) for the completed checks and the remaining dependency-backed check to run after installation.

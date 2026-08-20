# Adil Jaseem Portfolio

The site now opens with a simple plain portfolio. The 3D city is still available from the header and from the city preview in the first section.

## Main flow

1. Visitors land on the plain portfolio.
2. The first section gives a small preview of the city.
3. The 3D city button opens the walkable view.
4. Each building opens its portfolio section inside the city.
5. The Plain portfolio button returns to the regular page.

## Copy and profile update

The plain portfolio now presents Adil as a Full Stack Developer based in Trivandrum. The introduction and About section place React at the centre of the front-end work and Python at the centre of the back-end work. The About section stays personal and does not describe the current employer.

## 3D city interface

The city uses the same warm white theme as the plain portfolio. The entry card, city title, control hints, hover labels, pause dialog, fallback notice, section panels, and building signs now use white surfaces, soft borders, dark text, and the purple accent from the main site.

## Pointer lock handling

The city no longer uses the Three.js PointerLockControls helper. It uses a small, local first-person controller and requests pointer lock only from an explicit button press.

The city waits briefly after pointer lock is released before it allows another request. It checks whether the browser exposes the Pointer Lock API, then treats the real browser request as the source of truth. A temporary failure no longer disables walking for the rest of the session, and there is no short timeout while a browser prompt may still be open. When the API is genuinely unavailable, the same city opens in a static browse view, so each building can still be selected.

## Spendwise update

Spendwise is included in the Projects section. The entry covers the Capacitor Android integration and the native Java flow for new bank debit SMS capture. It also mentions the review inbox, optional automatic entry, local parsing, and raw message privacy.

## Stack

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS 4
* React Three Fiber
* Drei
* Framer Motion
* GSAP
* EmailJS

## Run locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

Add the existing resume file at `public/resume.pdf`, and set the EmailJS values from `.env.example` before deployment.

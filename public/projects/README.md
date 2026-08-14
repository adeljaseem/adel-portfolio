# Portfolio project images

Place only sanitized portfolio screenshots in this directory and reference them from `lib/portfolio-data.ts`.

## Recommended primary QuantiFore captures

- `quantifore-dashboard.webp`
- `quantifore-monitoring.webp`
- `quantifore-simulation.webp`
- `quantifore-signals.webp`

## Recommended focused case-study captures

- `quantifore-query-processing.webp`
- `quantifore-model-ready.webp`
- `quantifore-websocket-activity.webp`
- `quantifore-signal-feed.webp`
- `quantifore-signal-map.webp`
- `quantifore-observability.webp`
- `quantifore-environment-status.webp`
- `newsraven-search.webp`

## Image guidance

- Prefer WebP or AVIF.
- Use 1600-2400 px width for dashboard captures.
- Preserve natural browser proportions; avoid tiny cropped panels unless the case study calls for a detail view.
- Remove customer names, credentials, private IP addresses, internal URLs, account data, proprietary prompts, exact environment configuration, and confidential architecture diagrams.
- Add useful `alt` text describing the visible workflow rather than writing “screenshot”.

## Add an image

```ts
{
  label: "Simulation workspace",
  description: "Causal graph, scenario controls, and timeline.",
  alt: "QuantiFore simulation workspace with causal graph and scenario controls",
  src: "/projects/quantifore-simulation.webp",
}
```

When `src` is omitted, the application displays an animated project-image placeholder, so incomplete galleries do not break the layout.

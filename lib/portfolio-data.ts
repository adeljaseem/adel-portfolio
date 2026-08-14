export type ProjectKind =
  | "platform"
  | "workflow"
  | "signal"
  | "infrastructure"
  | "news"
  | "health";

export type ProjectGroup = "quantifore" | "earlier";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectMedia = {
  label: string;
  description: string;
  alt: string;
  src?: string;
};

export type ProjectFocusArea = {
  title: string;
  ownership: "Built" | "Co-developed" | "Integrated";
  detail: string;
  technologies: string[];
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  period: string;
  role: string;
  summary: string;
  overview: string;
  kind: ProjectKind;
  group: ProjectGroup;
  featured?: boolean;
  latest?: boolean;
  tags: string[];
  metrics: ProjectMetric[];
  challenge: string;
  contributions: string[];
  focusAreas: ProjectFocusArea[];
  decisions: Array<{ title: string; detail: string }>;
  impact: string[];
  architecture: string[];
  media: ProjectMedia[];
  confidentiality?: string;
};

export const projects: Project[] = [
  {
    slug: "quantifore-platform",
    title: "QuantiFore - Enterprise Intelligence & Simulation Platform",
    shortTitle: "QuantiFore Platform Engineering",
    eyebrow: "Primary project · End-to-end platform contribution",
    period: "Feb 2025 - Present",
    role: "Full Stack Developer · Software Engineer",
    group: "quantifore",
    featured: true,
    summary:
      "Building QuantiFore across the complete product frontend, core SML services, real-time delivery, platform environments, local LLM infrastructure, and observability.",
    overview:
      "QuantiFore is the main platform I work on at Numenor. My contribution spans the full engineering path: I built the complete React and TypeScript product, the core Stock or Model Lookup workflow and its supporting services, real-time WebSocket delivery, the latest signal-intelligence services, and much of the environment and operational tooling used to run the platform. I also integrate and debug workflows that cross ETL, CFRI, ATI, dashboard, simulation, identity, gateway, and data services without claiming sole ownership of their specialist internals.",
    kind: "platform",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Python",
      "FastAPI",
      "gRPC",
      "RabbitMQ",
      "PostgreSQL",
      "TimescaleDB",
      "Apache AGE",
      "Redis",
      "WebSockets",
      "Docker Compose",
      "Grafana",
      "llama.cpp",
      "Ollama",
    ],
    metrics: [
      { value: "10+", label: "analytical product workspaces" },
      { value: "7+", label: "core services built" },
      { value: "26+", label: "service and infrastructure containers" },
      { value: "3", label: "development, staging, production environments" },
    ],
    challenge:
      "Turn a large event-driven backend into a clear analytical product while keeping long-running query, signal, graph, simulation, and LLM workflows reliable, observable, and responsive to the user.",
    contributions: [
      "Built the complete React and TypeScript frontend across authentication, onboarding, dashboard analytics, monitoring, signal analysis, alerts, causal visualization, simulation, model management, administration, settings, and real-time activity workflows.",
      "Designed and implemented the core SML workflow through the SML Coordinator and SML Orchestrator services, including validation, job envelopes, RabbitMQ dispatch, semantic-cache handling, downstream workflow coordination, state tracking, and completion handling.",
      "Built the Query Parser and Entity Resolution services for structured intent extraction, anchors and drivers, semantic tokens and embeddings, canonical entity resolution, aliases, geographic context, Wikidata integration, and local-model-assisted disambiguation.",
      "Built the WebSocket Gateway Service to deliver SML completion events, alerts, job updates, and other RabbitMQ-backed notifications to authenticated frontend sessions.",
      "Architected and developed the Signal Scraper and Signal Scheduler services as the latest major contribution, covering query planning, trusted-source ranking, relevance screening, crawling, evidence verification, geocoding, deduplication, distributed scheduling, persistence, and real-time alert publication.",
      "Set up and integrated self-hosted models using llama.cpp, Ollama, MLX experiments, GGUF models, OpenAI-compatible endpoints, context and concurrency configuration, retries, routing, and local development workflows.",
      "Built and maintained development, staging, and production environment workflows with Docker Compose, health checks, networks, volumes, startup ordering, environment injection, bootstrap automation, and service-level troubleshooting.",
      "Configured Grafana, Loki, and Grafana Alloy observability and maintained Git branching, repository conventions, integration practices, environment coordination, and release workflows.",
      "Integrated with ETL, CFRI, ATI, blueprint, dashboard, simulation, authentication, gateway, CDC, relational, graph, time-series, and caching services while preserving accurate ownership boundaries.",
    ],
    focusAreas: [
      {
        title: "Complete analytical frontend",
        ownership: "Built",
        detail:
          "The entire React and TypeScript application, including maps, graphs, simulation controls, monitoring, signals, alerts, administration, authentication, responsive states, and real-time updates.",
        technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Mapbox GL", "D3.js", "Motion"],
      },
      {
        title: "SML Coordinator & Orchestrator",
        ownership: "Built",
        detail:
          "The event-driven entry and coordination path for natural-language model lookup, including 202-style job acceptance, RabbitMQ dispatch, semantic cache resolution, fast and slow paths, workflow state, and completion events.",
        technologies: ["Python", "gRPC", "RabbitMQ", "PostgreSQL", "Redis", "Protocol Buffers"],
      },
      {
        title: "Query Parser & Entity Resolution",
        ownership: "Built",
        detail:
          "Structured parsing and standardization for intents, entities, anchors, drivers, embeddings, aliases, contextual disambiguation, and canonical stock or concept names.",
        technologies: ["Python", "Sentence Transformers", "Ollama", "Wikidata", "pgvector", "Pydantic"],
      },
      {
        title: "WebSocket delivery",
        ownership: "Built",
        detail:
          "Authenticated, event-driven delivery of model readiness, job progress, alerts, and real-time activity from RabbitMQ workflows into the product interface.",
        technologies: ["WebSockets", "RabbitMQ", "FastAPI", "JWT", "Redis"],
      },
      {
        title: "Signal intelligence",
        ownership: "Built",
        detail:
          "The latest service family: distributed scheduling plus an evidence-backed discovery pipeline for trusted search, crawling, extraction, verification, deduplication, geocoding, and alerts.",
        technologies: ["Python", "SearXNG", "Crawl4AI", "MCP", "asyncpg", "aio-pika", "Wikidata"],
      },
      {
        title: "Platform environments & operations",
        ownership: "Built",
        detail:
          "Docker Compose environments, bootstrap scripts, shared local model serving, staging and production workflows, centralized logs, health checks, and Git integration practices.",
        technologies: ["Docker", "Docker Compose", "Bash", "Grafana", "Loki", "Alloy", "Git", "Kustomize"],
      },
      {
        title: "Scientific and data workflows",
        ownership: "Integrated",
        detail:
          "End-to-end integration, debugging, contract alignment, and validation across ETL, CFRI, ATI, simulation, dashboard, graph, time-series, relational, and CDC surfaces.",
        technologies: ["ETL", "CFRI", "ATI", "Simulation", "TimescaleDB", "Apache AGE", "Debezium"],
      },
    ],
    decisions: [
      {
        title: "Immediate feedback, asynchronous execution",
        detail:
          "The coordinator accepts work quickly while RabbitMQ handles expensive discovery and orchestration. WebSocket events keep the product responsive until the model is ready.",
      },
      {
        title: "Exact and semantic lookup",
        detail:
          "Query parsing returns structured meaning and embeddings; the orchestrator uses exact tokens and vector similarity before starting more expensive model-discovery paths.",
      },
      {
        title: "Evidence before confidence",
        detail:
          "Signal extraction requires source-backed evidence checks, trust filtering, deterministic fallbacks, and deduplication rather than treating model output as automatically correct.",
      },
      {
        title: "Shared infrastructure, isolated environments",
        detail:
          "Environment-specific configuration, shared model-serving processes, health checks, and bootstrap commands keep development, staging, and production workflows consistent without duplicating heavy resources.",
      },
      {
        title: "Specialist services own specialist data",
        detail:
          "The orchestrator coordinates; ETL, CFRI, ATI, and simulation components keep their domain responsibilities. This avoids oversized payloads and inaccurate ownership boundaries.",
      },
    ],
    impact: [
      "Delivered a unified analytical experience over APIs, queues, graph data, time-series data, local LLM endpoints, simulations, and real-time notifications.",
      "Expanded from frontend ownership into core backend workflow design, distributed services, model infrastructure, observability, and environment operations.",
      "Created repeatable platform workflows for developers and staging through Docker Compose, bootstrap automation, centralized logs, and shared model infrastructure.",
      "Improved reliability and explainability through typed contracts, job isolation, retries, dead-letter handling, evidence checks, semantic lookup, and observable completion states.",
    ],
    architecture: [
      "React + TypeScript analytical client",
      "Kong and identity boundary",
      "SML Coordinator accepts and dispatches user jobs",
      "RabbitMQ carries jobs and domain events",
      "SML Orchestrator manages context, cache checks, fast paths, slow paths, and state",
      "Query Parser and Entity Resolution structure and standardize user intent",
      "ETL, CFRI, ATI, dashboard, and simulation services execute specialist work",
      "WebSocket Gateway returns progress, readiness, and alert events",
      "PostgreSQL, TimescaleDB, Apache AGE, Redis, and object storage serve domain data",
      "Docker environments, local LLM servers, Grafana, Loki, and Alloy support operations",
    ],
    media: [
      {
        label: "Main intelligence dashboard",
        description: "Primary dashboard, analytical summary, navigation, and real-time activity surface.",
        alt: "QuantiFore main intelligence dashboard screenshot",
      },
      {
        label: "Monitoring workspace",
        description: "Historical and projected stock views, thresholds, controls, and saved monitoring states.",
        alt: "QuantiFore monitoring workspace screenshot",
      },
      {
        label: "Simulation workspace",
        description: "Causal graph, model controls, scenario overrides, timeline, and full-screen analysis.",
        alt: "QuantiFore simulation workspace screenshot",
      },
      {
        label: "Signal analysis",
        description: "Geographic signal context, event activity, filters, and alert-oriented workflows.",
        alt: "QuantiFore signal analysis screenshot",
      },
    ],
    confidentiality:
      "Client data, credentials, internal addresses, proprietary prompts, private diagrams, and non-public algorithms are intentionally excluded. Add only sanitized screenshots to the prepared media slots.",
  },
  {
    slug: "quantifore-sml-workflow",
    title: "QuantiFore SML Workflow - From Natural Language to a Ready Model",
    shortTitle: "Core SML Workflow",
    eyebrow: "QuantiFore deep dive · Core backend ownership",
    period: "2025 - Present",
    role: "Designer and developer",
    group: "quantifore",
    summary:
      "An event-driven workflow that parses natural-language requests, resolves semantic history, coordinates model discovery, and returns real-time readiness updates.",
    overview:
      "I built the main services behind QuantiFore's Stock or Model Lookup workflow: the SML Coordinator, SML Orchestrator, Query Parser, Entity Resolution Service, and WebSocket Gateway. Together, they convert a user query into structured intent, perform exact and semantic lookup, coordinate fast and slow model-resolution paths, track asynchronous work, and notify the frontend when the requested model is ready.",
    kind: "workflow",
    tags: [
      "Python",
      "FastAPI",
      "gRPC",
      "Protocol Buffers",
      "RabbitMQ",
      "PostgreSQL",
      "Redis",
      "pgvector",
      "Sentence Transformers",
      "WebSockets",
      "Wikidata",
    ],
    metrics: [
      { value: "5", label: "core services built" },
      { value: "2", label: "exact and semantic cache tiers" },
      { value: "202", label: "immediate asynchronous acceptance pattern" },
    ],
    challenge:
      "Accept complex user queries without blocking the interface, preserve organization context, reuse prior work safely, and coordinate multiple specialist services while keeping the user informed in real time.",
    contributions: [
      "Built the SML Coordinator Service to validate requests, construct standard job envelopes, publish high-priority work, and return immediate acceptance to the frontend.",
      "Built the SML Orchestrator Service to hydrate organization context, call parsing and resolution services, perform exact and vector cache checks, select fast or slow paths, dispatch downstream jobs, and manage workflow state.",
      "Built the Query Parser Service to return structured intent, normalized entities, anchors, drivers, semantic tokens, and embeddings from natural-language requests.",
      "Built the Entity Resolution Service for canonical naming, aliases, disambiguation, geography and scope handling, Wikidata integration, and local-model-assisted normalization.",
      "Built the WebSocket Gateway Service so completion events, progress states, and alerts can reach the correct authenticated frontend session.",
      "Integrated the workflow with blueprint, ETL, CFRI, ATI, dashboard, simulation, PostgreSQL, Redis, RabbitMQ, CDC, and frontend state transitions.",
    ],
    focusAreas: [
      {
        title: "Synchronous entry",
        ownership: "Built",
        detail: "Fast validation and 202-style acceptance through the coordinator, with traceable job and organization context.",
        technologies: ["FastAPI", "gRPC", "Protocol Buffers", "RabbitMQ"],
      },
      {
        title: "Asynchronous orchestration",
        ownership: "Built",
        detail: "Context hydration, semantic history lookup, workflow branching, downstream dispatch, retries, job state, and completion handling.",
        technologies: ["Python", "RabbitMQ", "PostgreSQL", "Redis", "aio-pika"],
      },
      {
        title: "Natural-language structure",
        ownership: "Built",
        detail: "Intent, entity, anchor, driver, relationship, token, and embedding generation behind a typed service contract.",
        technologies: ["Sentence Transformers", "Local LLMs", "Pydantic", "gRPC"],
      },
      {
        title: "Entity standardization",
        ownership: "Built",
        detail: "Alias resolution, canonical stock names, location and scope context, Wikidata grounding, and disambiguation.",
        technologies: ["Ollama", "Wikidata", "PostgreSQL", "Python"],
      },
      {
        title: "Real-time completion",
        ownership: "Built",
        detail: "Authenticated WebSocket delivery from RabbitMQ events to processing, ready, failed, and alert states in the frontend.",
        technologies: ["WebSockets", "RabbitMQ", "JWT", "Redis"],
      },
    ],
    decisions: [
      {
        title: "Stateless parsing, stateful orchestration",
        detail: "Parsing computes structured meaning; the orchestrator owns cache and workflow state. This keeps service responsibilities clear.",
      },
      {
        title: "Hybrid semantic reuse",
        detail: "Exact normalized tokens handle obvious repeats while vector similarity catches high-confidence paraphrases without scanning all prior queries in Python.",
      },
      {
        title: "Fast path before expensive discovery",
        detail: "Existing graph entities and reusable blueprints are attempted before ETL and causal-inference work is dispatched.",
      },
      {
        title: "The UI never waits on the whole workflow",
        detail: "Processing state and WebSocket completion make long-running work visible without freezing the analytical interface.",
      },
    ],
    impact: [
      "Created the core path connecting user language to QuantiFore's model and graph workflows.",
      "Reduced unnecessary downstream work through exact and semantic reuse before expensive discovery.",
      "Made asynchronous model generation understandable in the product through persistent states and real-time completion events.",
    ],
    architecture: [
      "Frontend submits a stock or conceptual query",
      "SML Coordinator validates and publishes a standard job",
      "SML Orchestrator hydrates organization context",
      "Query Parser returns structured intent, semantic token, and embedding",
      "Entity Resolution standardizes ambiguous entities and locations",
      "Orchestrator checks exact and semantic history",
      "Fast path resolves existing entities or reusable blueprints",
      "Slow path coordinates ETL, CFRI, and ATI workflows",
      "Completion events update state and flow through the WebSocket Gateway",
      "Frontend loads the ready model and dashboard state",
    ],
    media: [
      {
        label: "Query and processing state",
        description: "The user-facing query flow from immediate acceptance to model readiness.",
        alt: "QuantiFore query processing interface screenshot",
      },
      {
        label: "Causal model result",
        description: "The resulting graph or model loaded after SML completion.",
        alt: "QuantiFore causal model result screenshot",
      },
      {
        label: "Real-time notification",
        description: "Processing, completion, or job activity notification delivered through WebSockets.",
        alt: "QuantiFore real-time job notification screenshot",
      },
    ],
    confidentiality:
      "The workflow is explained at a public systems level. Internal schemas, endpoints, prompts, thresholds, credentials, and customer data are excluded.",
  },
  {
    slug: "quantifore-signal-intelligence",
    title: "QuantiFore Signal Intelligence - Evidence-Backed Discovery",
    shortTitle: "Signal Intelligence Pipeline",
    eyebrow: "QuantiFore deep dive · Latest major contribution",
    period: "2026 - Present",
    role: "Architect and developer",
    group: "quantifore",
    latest: true,
    summary:
      "A distributed scheduler and multi-stage AI pipeline for trusted-source discovery, crawling, grounded extraction, geocoding, deduplication, and real-time alerts.",
    overview:
      "The Signal Scraper and Signal Scheduler services are my latest major contribution within QuantiFore. The workflow takes organization context, plans targeted searches, ranks trusted sources, performs batched relevance screening, crawls selected pages, extracts structured business signals, verifies evidence against the source, resolves geography, deduplicates results, persists them, and publishes completion and high-impact alert events.",
    kind: "signal",
    tags: [
      "Python",
      "RabbitMQ",
      "asyncpg",
      "aio-pika",
      "SearXNG",
      "Crawl4AI",
      "MCP",
      "Wikidata",
      "llama.cpp",
      "OpenAI-compatible APIs",
      "PostgreSQL",
      "Docker",
    ],
    metrics: [
      { value: "10+", label: "pipeline stages" },
      { value: "2", label: "model routes for speed and quality" },
      { value: "2", label: "URL and signal deduplication layers" },
    ],
    challenge:
      "Simple LLM extraction was not reliable enough. The service needed to discover relevant sources efficiently, control model cost and concurrency, prove that extracted claims existed in the source, and remain resilient to malformed model output and individual message failures.",
    contributions: [
      "Designed the Signal Scheduler with cron-driven eligibility checks, claim-before-publish semantics, in-flight limits, stale-claim recovery, expiry pruning, and standard RabbitMQ envelopes.",
      "Built LLM query planning from organization name, industry, geography, description, and signal categories.",
      "Integrated SearXNG search, trusted-source scoring, URL normalization, cross-query deduplication, and result caps before expensive crawling.",
      "Implemented batched relevance screening so only higher-value pages proceed to Crawl4AI and MCP-based extraction.",
      "Implemented fast and quality-focused model routing through OpenAI-compatible local endpoints with bounded concurrency, retries, backoff, and deterministic fallbacks.",
      "Required verbatim evidence and verified it through normalized exact matching and fuzzy fallback checks before accepting a signal.",
      "Added content-hash caching, signal fingerprints, Wikidata geocoding, persistence, job tracking, completion events, and real-time high-impact alerts.",
    ],
    focusAreas: [
      {
        title: "Distributed scheduling",
        ownership: "Built",
        detail: "Claim-before-publish dispatch, scan frequency, in-flight limits, stale recovery, pruning, and repeat-safe job creation.",
        technologies: ["Python", "croniter", "asyncpg", "RabbitMQ"],
      },
      {
        title: "Search and trust",
        ownership: "Built",
        detail: "Targeted query planning, metasearch, trusted-domain scores, ranking, URL normalization, and pre-crawl filtering.",
        technologies: ["SearXNG", "httpx", "PostgreSQL", "Local LLMs"],
      },
      {
        title: "Grounded extraction",
        ownership: "Built",
        detail: "Crawl4AI content retrieval, structured extraction, evidence requirements, exact and fuzzy verification, and malformed-JSON recovery.",
        technologies: ["Crawl4AI", "MCP", "Pydantic", "llama.cpp"],
      },
      {
        title: "Reliability and delivery",
        ownership: "Built",
        detail: "Bounded inference, retries, fallbacks, publisher confirms, dead-letter handling, per-message isolation, persistence, and event publication.",
        technologies: ["aio-pika", "asyncio", "Tenacity", "PostgreSQL", "WebSockets"],
      },
    ],
    decisions: [
      {
        title: "Screen before crawling",
        detail: "A single relevance pass over titles and snippets reduces unnecessary browser work and reserves extraction for stronger candidates.",
      },
      {
        title: "Route models by task",
        detail: "Smaller, faster models handle planning and screening; larger quality-focused models handle structured signal extraction.",
      },
      {
        title: "Evidence is a required field",
        detail: "A signal is rejected when its cited evidence cannot be found in the original content, reducing unsupported output.",
      },
      {
        title: "Failures remain local",
        detail: "One page, model response, or queue message can fail without terminating the rest of the scan batch.",
      },
    ],
    impact: [
      "Created a reliable path from global information sources to structured, inspectable business signals.",
      "Balanced throughput and extraction quality through batched screening, model routing, bounded concurrency, and selective crawling.",
      "Made results safer to consume through evidence checks, trust scores, deduplication, geocoding, and real-time event delivery.",
    ],
    architecture: [
      "Signal Scheduler selects eligible organizations and claims work",
      "RabbitMQ dispatches a standard signal-discovery job",
      "Signal Scraper loads organization and trusted-source context",
      "Local LLM plans targeted queries",
      "SearXNG returns candidate results",
      "Trust ranking and batched relevance screening reduce the candidate set",
      "Crawl4AI and MCP retrieve selected content",
      "Quality-focused model extracts structured signals with source evidence",
      "Verification, geocoding, content hashing, and signal deduplication run",
      "PostgreSQL persistence, completion events, and high-impact alerts follow",
    ],
    media: [
      {
        label: "Signal tracker",
        description: "Signal list, impact context, filters, and live activity state.",
        alt: "QuantiFore signal tracker screenshot",
      },
      {
        label: "Geographic signal view",
        description: "Map-based signal origins and contributing-event context.",
        alt: "QuantiFore geographic signal view screenshot",
      },
      {
        label: "Evidence and source detail",
        description: "Signal detail showing source, evidence, impact, and metadata.",
        alt: "QuantiFore evidence-backed signal detail screenshot",
      },
    ],
    confidentiality:
      "Model prompts, internal scoring thresholds, source credentials, deployment endpoints, customer profiles, and proprietary extraction rules are excluded.",
  },
  {
    slug: "quantifore-platform-operations",
    title: "QuantiFore Platform Operations - Environments, LLMs & Observability",
    shortTitle: "Platform Environments & LLM Operations",
    eyebrow: "QuantiFore deep dive · Platform enablement",
    period: "2025 - Present",
    role: "Platform contributor and primary implementer",
    group: "quantifore",
    summary:
      "Multi-environment Docker orchestration, bootstrap automation, shared model serving, centralized observability, and Git workflows for a large microservice platform.",
    overview:
      "Beyond feature and service development, I built much of the practical operating layer used to run QuantiFore. This includes development, staging, and production-oriented configurations; Docker Compose orchestration; bootstrap commands; service health checks; networks and volumes; shared llama.cpp and Ollama endpoints; Grafana, Loki, and Alloy; and repository and Git workflows that coordinate changes across a large service surface.",
    kind: "infrastructure",
    tags: [
      "Docker",
      "Docker Compose",
      "Bash",
      "Git",
      "Gitflow",
      "llama.cpp",
      "Ollama",
      "MLX",
      "GGUF",
      "Grafana",
      "Loki",
      "Grafana Alloy",
      "Kong",
      "Authentik",
      "WireGuard",
      "Kustomize",
    ],
    metrics: [
      { value: "26+", label: "services and infrastructure containers" },
      { value: "3", label: "environment workflows" },
      { value: "1", label: "shared model-serving foundation" },
    ],
    challenge:
      "Keep a large service ecosystem reproducible and operable across multiple environments while avoiding port conflicts, duplicated model weights, hidden startup dependencies, fragmented logs, and environment drift.",
    contributions: [
      "Built and maintained Docker Compose configurations for application services, databases, RabbitMQ, Redis, identity, gateway, observability, and supporting infrastructure.",
      "Established environment-specific development, staging, and production workflows with separate configuration, networks, volumes, health checks, and startup ordering.",
      "Developed and maintained bootstrap automation for up, down, restart, build, pull, logs, status, shell, validation, configuration inspection, cleanup, pruning, observability, and lower-memory development modes.",
      "Set up shared llama.cpp and Ollama model-serving processes, GGUF model configurations, local and remote endpoints, context sizing, parallelism, retries, and application integration.",
      "Configured Grafana, Loki, and Grafana Alloy for container discovery, structured log forwarding, service inspection, and dashboard-oriented troubleshooting.",
      "Supported Kong, Authentik, Okta, WireGuard, Debezium, database, and RabbitMQ integration across environment boundaries.",
      "Maintained Git branching and repository conventions, feature integration practices, environment coordination, merge handling, and release-oriented workflows.",
    ],
    focusAreas: [
      {
        title: "Environment orchestration",
        ownership: "Built",
        detail: "Repeatable application and infrastructure stacks with environment files, dependencies, health checks, networks, volumes, and operational commands.",
        technologies: ["Docker", "Docker Compose", "Bash", "Linux", "macOS"],
      },
      {
        title: "Shared LLM infrastructure",
        ownership: "Built",
        detail: "llama.cpp and Ollama serving, GGUF models, OpenAI-compatible APIs, context and concurrency configuration, and service integration.",
        technologies: ["llama.cpp", "Ollama", "MLX", "GGUF", "OpenAI-compatible APIs"],
      },
      {
        title: "Observability",
        ownership: "Built",
        detail: "Container discovery, centralized structured logs, datasource provisioning, dashboards, and service-level troubleshooting.",
        technologies: ["Grafana", "Loki", "Grafana Alloy", "JSON logging"],
      },
      {
        title: "Platform integration",
        ownership: "Integrated",
        detail: "Gateway, identity, VPN, CDC, database, queue, and environment interactions across development and staging.",
        technologies: ["Kong", "Authentik", "Okta", "WireGuard", "Debezium", "RabbitMQ"],
      },
      {
        title: "Repository workflow",
        ownership: "Built",
        detail: "Git branching, repository conventions, integration practices, environment coordination, merge flow, and release preparation.",
        technologies: ["Git", "GitHub", "Gitflow", "Pull requests", "Semantic versioning"],
      },
    ],
    decisions: [
      {
        title: "Heavy models are shared",
        detail: "Model weights and inference servers are centralized so each environment and developer workflow can reuse the same expensive resources.",
      },
      {
        title: "Configuration stays outside images",
        detail: "Environment-specific values are injected at runtime, keeping images reusable and reducing accidental environment coupling.",
      },
      {
        title: "One operational entry point",
        detail: "Bootstrap commands hide repetitive Compose details while still exposing validation, logs, service shells, cleanup, and targeted operations.",
      },
      {
        title: "Logs are part of the platform",
        detail: "Structured output and centralized collection make cross-service failures traceable instead of requiring manual inspection of isolated containers.",
      },
    ],
    impact: [
      "Made a large platform easier to start, inspect, rebuild, and troubleshoot across development and staging.",
      "Reduced duplicated model resources through shared local inference infrastructure.",
      "Improved cross-service visibility through centralized logs and repeatable operational workflows.",
      "Created a consistent Git and environment model for integrating work across many services.",
    ],
    architecture: [
      "Environment files select development, staging, or production-oriented configuration",
      "Bootstrap commands validate and compose the requested runtime",
      "Docker networks connect application, data, messaging, identity, and observability layers",
      "Health checks and dependency ordering protect startup sequencing",
      "Shared llama.cpp and Ollama servers provide local model endpoints",
      "Grafana Alloy discovers containers and forwards structured logs",
      "Loki stores logs and Grafana exposes service-oriented exploration",
      "Git branching and repository workflows coordinate implementation and releases",
    ],
    media: [
      {
        label: "Operations dashboard",
        description: "Grafana or service-health view using sanitized names and data.",
        alt: "QuantiFore operations dashboard screenshot",
      },
      {
        label: "Environment status",
        description: "Sanitized service status or bootstrap workflow output.",
        alt: "QuantiFore environment status screenshot",
      },
      {
        label: "Local model infrastructure",
        description: "Sanitized model-serving health, configuration, or integration view.",
        alt: "QuantiFore local LLM infrastructure screenshot",
      },
    ],
    confidentiality:
      "Private IP addresses, ports, environment values, credentials, internal hostnames, model paths, and production topology are intentionally omitted.",
  },
  {
    slug: "newsraven",
    title: "Newsraven - AI-Assisted Media Intelligence",
    shortTitle: "Newsraven",
    eyebrow: "Earlier product experience · AI-assisted media",
    period: "2022 - 2024",
    role: "Software Developer",
    group: "earlier",
    summary:
      "React, Node.js, GraphQL, and AI-assisted search and content workflows across summaries, generated stories, ask features, and semantic retrieval.",
    overview:
      "At Grapelime Innovations, Newsraven gave me practical full-stack product experience before QuantiFore. I worked across React interfaces, Material UI, Node.js and GraphQL functionality, scheduled jobs, PostgreSQL, vector retrieval, Pinecone, OpenAI, Gemini, Claude, testing, review, and deployment support.",
    kind: "news",
    tags: ["React", "Material UI", "Node.js", "GraphQL", "PostgreSQL", "Pinecone", "OpenAI", "Gemini", "Claude"],
    metrics: [
      { value: "3", label: "model providers integrated" },
      { value: "Full-stack", label: "product contribution" },
      { value: "Semantic", label: "search and retrieval workflows" },
    ],
    challenge:
      "Add useful AI-assisted discovery and content features to a real product while keeping the frontend, backend, retrieval, scheduled processing, and deployment flow maintainable.",
    contributions: [
      "Built React and Material UI interfaces for summaries, ask features, generated stories, and advanced search workflows.",
      "Contributed Node.js and GraphQL APIs, scheduled tasks, server-side feature logic, and PostgreSQL integration.",
      "Integrated OpenAI, Gemini, and Claude for podcast, video, article, search, question-answering, and generated-content experiences.",
      "Implemented semantic and similarity-search behavior with vector databases and Pinecone.",
      "Reviewed code, removed redundant implementation, supported test deployments, and validated complete product flows.",
    ],
    focusAreas: [
      {
        title: "AI-assisted interfaces",
        ownership: "Built",
        detail: "Reusable React experiences for summaries, ask flows, generated stories, and semantic search.",
        technologies: ["React", "Material UI", "CSS", "JavaScript"],
      },
      {
        title: "Backend integration",
        ownership: "Co-developed",
        detail: "GraphQL APIs, scheduled processing, server-side logic, databases, and AI provider integrations.",
        technologies: ["Node.js", "GraphQL", "PostgreSQL", "OpenAI", "Gemini", "Claude"],
      },
      {
        title: "Semantic retrieval",
        ownership: "Built",
        detail: "Similarity search and vector-backed retrieval for more relevant discovery and answer experiences.",
        technologies: ["Pinecone", "Vector databases", "PostgreSQL"],
      },
    ],
    decisions: [
      {
        title: "AI as a product capability",
        detail: "Model output was integrated into clear product workflows rather than exposed as a raw chat interface.",
      },
      {
        title: "Retrieval before response",
        detail: "Semantic and vector search helped ground the content available to user-facing AI features.",
      },
      {
        title: "Review the complete path",
        detail: "Testing and deployment validation covered the interface, backend, provider integration, and returned content together.",
      },
    ],
    impact: [
      "Expanded my role from React implementation into backend, AI integration, search, testing, and deployment support.",
      "Delivered practical AI-assisted discovery features inside an established product experience.",
      "Built the product foundation that later supported deeper work in Python services and distributed systems.",
    ],
    architecture: [
      "React and Material UI client",
      "Node.js and GraphQL service layer",
      "PostgreSQL application data",
      "Vector retrieval with Pinecone",
      "OpenAI, Gemini, and Claude integrations",
      "Scheduled processing, testing, and deployment validation",
    ],
    media: [
      {
        label: "Search and content workspace",
        description: "Search and content workspace from the AI-assisted media product.",
        alt: "Newsraven product screenshot",
      },
      {
        label: "AI-assisted workflow",
        description: "Summary, ask, generated-story, or semantic-search workflow.",
        alt: "Newsraven AI-assisted workflow screenshot",
      },
    ],
    confidentiality:
      "The project is described from my contribution record. Client source code, private data, and non-public product details are not reproduced.",
  },
  {
    slug: "earlier-product-experience",
    title: "Clinasyst & Responseloop - Product Interface Engineering",
    shortTitle: "Clinasyst & Responseloop",
    eyebrow: "Earlier product experience · React engineering",
    period: "2022 - 2024",
    role: "Software Developer",
    group: "earlier",
    summary:
      "Reusable clinical interfaces, interactive states, authentication flows, testing, and Google Maps-based location workflows built with React.",
    overview:
      "Alongside Newsraven, I contributed to Clinasyst and Responseloop. The work focused on dependable React components, dynamic workflow states, frontend testing, account flows, and map-based experiences. These projects established the product-engineering discipline that I later carried into larger analytical platforms.",
    kind: "health",
    tags: ["React", "JavaScript", "Responsive UI", "Component architecture", "Testing", "Google Maps", "Authentication UX"],
    metrics: [
      { value: "Reusable", label: "component patterns" },
      { value: "Interactive", label: "workflow states" },
      { value: "Mapped", label: "location flows" },
    ],
    challenge:
      "Build reliable interfaces for dynamic clinical and location-aware workflows while keeping state, validation, responsive behavior, and account interactions understandable.",
    contributions: [
      "Developed reusable React components and dynamic user-interface states for clinical product workflows.",
      "Implemented and tested loading, empty, validation, error, success, and responsive states.",
      "Integrated Google Maps into location creation and related user flows.",
      "Improved login, signup, logout, account, and navigation experiences in collaboration with the wider team.",
    ],
    focusAreas: [
      {
        title: "Clinical interfaces",
        ownership: "Built",
        detail: "Reusable components and predictable states for data-heavy product workflows.",
        technologies: ["React", "JavaScript", "Responsive UI", "Testing"],
      },
      {
        title: "Location workflows",
        ownership: "Built",
        detail: "Map-assisted creation flows and account interactions designed around clear user feedback.",
        technologies: ["Google Maps", "React", "Authentication UX"],
      },
    ],
    decisions: [
      {
        title: "State is part of the interface",
        detail: "Loading, empty, validation, error, success, and disabled states were treated as core product behavior.",
      },
      {
        title: "Reusable boundaries",
        detail: "Components received clear data and interaction contracts so screens could compose behavior instead of duplicating it.",
      },
      {
        title: "Test the whole flow",
        detail: "Validation focused on the complete user journey rather than only the static visual output of individual components.",
      },
    ],
    impact: [
      "Improved consistency and maintainability across growing React product surfaces.",
      "Strengthened practical experience in frontend architecture, testing, maps, and account workflows.",
      "Built a product-focused foundation before expanding into backend services and platform engineering.",
    ],
    architecture: [
      "React component layer",
      "Reusable interaction patterns",
      "API-driven workflow states",
      "Google Maps integration",
      "Authentication and account flows",
      "Functional testing and release validation",
    ],
    media: [
      {
        label: "Clinical product interface",
        description: "Reusable clinical product interface and workflow state.",
        alt: "Clinasyst product interface screenshot",
      },
      {
        label: "Location workflow",
        description: "Location creation, map interaction, or account workflow.",
        alt: "Responseloop location workflow screenshot",
      },
    ],
    confidentiality:
      "Patient information, private customer screens, and proprietary implementation details are intentionally excluded.",
  },
];

export const experience = [
  {
    company: "Numenor",
    role: "Full Stack Developer",
    period: "Feb 2025 - Present",
    location: "Trivandrum, Kerala, India",
    current: true,
    summary:
      "Building QuantiFore end to end across the complete product frontend, core SML and real-time services, signal intelligence, local LLM infrastructure, observability, and multi-environment platform operations.",
    scope: [
      "Complete frontend",
      "Core SML workflow",
      "7+ services built",
      "Platform environments",
      "Self-hosted LLMs",
      "Observability",
    ],
    highlights: [
      "Built the complete React and TypeScript product across authentication, onboarding, dashboards, monitoring, signal analysis, alerts, causal visualization, simulation, model management, administration, settings, and real-time activity workflows.",
      "Designed and implemented the SML Coordinator and SML Orchestrator services for request acceptance, organization context, RabbitMQ jobs, exact and semantic lookup, workflow branching, state tracking, and downstream coordination.",
      "Built the Query Parser and Entity Resolution services for intent, entities, anchors, drivers, embeddings, canonical names, aliases, geographic context, Wikidata grounding, and local-model-assisted disambiguation.",
      "Built the WebSocket Gateway Service for authenticated SML completion, progress, alert, and activity delivery to frontend sessions.",
      "Architected and developed the Signal Scraper and Signal Scheduler services as the latest major contribution, with trusted search, crawling, grounded extraction, evidence verification, geocoding, deduplication, distributed claims, persistence, and alerts.",
      "Set up and integrated llama.cpp, Ollama, MLX experiments, GGUF models, OpenAI-compatible endpoints, model routing, context and concurrency configuration, retries, and local development workflows.",
      "Built and maintained Docker Compose development, staging, and production workflows, service dependencies, health checks, networks, volumes, environment injection, and bootstrap automation for a 26+ container platform.",
      "Configured Grafana, Loki, and Grafana Alloy and maintained Git branching, repository conventions, feature integration, environment coordination, merge, and release workflows.",
      "Integrated and debugged end-to-end flows across ETL, CFRI, ATI, blueprint, dashboard, simulation, authentication, gateway, CDC, PostgreSQL, TimescaleDB, Apache AGE, Redis, and RabbitMQ.",
    ],
  },
  {
    company: "Grapelime Innovations Private Limited",
    role: "Software Developer",
    period: "Dec 2022 - Sep 2024",
    location: "Kochi, Kerala, India",
    current: false,
    summary:
      "Delivered React product experiences and backend integrations across AI-assisted media, clinical, and location-based applications.",
    scope: ["React products", "Node.js + GraphQL", "AI integrations", "Semantic search", "Testing + deployment"],
    highlights: [
      "Developed dynamic React interfaces and reusable product components across Newsraven, Clinasyst, and Responseloop.",
      "Built and extended Node.js and GraphQL APIs, scheduled tasks, server-side processing, database integration, and Google Maps-based workflows.",
      "Integrated OpenAI, Gemini, and Claude for summarization, question-answering, generated content, and search experiences.",
      "Implemented semantic and similarity-search workflows with PostgreSQL, vector databases, and Pinecone.",
      "Conducted code review, removed redundant implementation, supported test deployments, and validated complete feature flows.",
    ],
  },
  {
    company: "Luminar Technolab",
    role: "MEARN Stack Developer Intern",
    period: "May 2022 - Sep 2022",
    location: "Kochi, Kerala, India",
    current: false,
    summary:
      "Established a practical foundation in React, Node.js, databases, Git, responsive development, and end-to-end project delivery.",
    scope: ["React", "Node.js", "Full-stack projects", "Git"],
    highlights: [
      "Built frontend and full-stack projects with React and JavaScript.",
      "Practiced complete delivery across UI, APIs, data, version control, and deployment.",
    ],
  },
] as const;

export const skillGroups = [
  {
    title: "Frontend & Visualization",
    icon: "layout",
    level: "Primary",
    summary: "Complete analytical products, real-time state, maps, graphs, simulation controls, and responsive workflow UX.",
    skills: ["React", "TypeScript", "Next.js", "Vite", "Tailwind CSS", "Motion", "Mapbox GL", "D3.js", "Redux Toolkit", "Axios"],
  },
  {
    title: "Backend & APIs",
    icon: "server",
    level: "Production",
    summary: "Async Python services, typed contracts, service boundaries, APIs, workers, and application integration.",
    skills: ["Python", "FastAPI", "Node.js", "GraphQL", "gRPC", "Protocol Buffers", "Pydantic", "asyncpg", "SQLAlchemy", "aio-pika"],
  },
  {
    title: "Distributed Workflows",
    icon: "network",
    level: "Production",
    summary: "Event-driven jobs, semantic workflow coordination, reliable delivery, WebSockets, retries, claims, and service state.",
    skills: ["RabbitMQ", "Direct exchanges", "Topic exchanges", "Dead-letter queues", "Publisher confirms", "Transactional outbox", "CDC", "WebSockets", "AsyncIO"],
  },
  {
    title: "AI & LLM Infrastructure",
    icon: "brain",
    level: "Hands-on",
    summary: "Local model serving, model routing, grounded extraction, semantic retrieval, bounded inference, and resilient fallbacks.",
    skills: ["llama.cpp", "Ollama", "MLX", "GGUF", "OpenAI-compatible APIs", "Sentence Transformers", "Crawl4AI", "MCP", "LangGraph", "Pinecone"],
  },
  {
    title: "Data Systems",
    icon: "database",
    level: "Production",
    summary: "Application-oriented relational, time-series, graph, cache, vector, and migration workflows.",
    skills: ["PostgreSQL", "TimescaleDB", "Apache AGE", "Neo4j", "Redis", "pgvector", "MinIO", "Alembic", "SQL", "Vector search"],
  },
  {
    title: "Platform & Environments",
    icon: "cloud",
    level: "Primary",
    summary: "Multi-service environments, bootstrap automation, gateways, identity, networking, and operational troubleshooting.",
    skills: ["Docker", "Docker Compose", "Bash", "Git", "Gitflow", "Kustomize", "Kubernetes exposure", "Kong", "Authentik", "Okta", "WireGuard"],
  },
  {
    title: "Observability & Reliability",
    icon: "activity",
    level: "Hands-on",
    summary: "Centralized logs, container discovery, service health, traceable events, and cross-service debugging.",
    skills: ["Grafana", "Loki", "Grafana Alloy", "Structured JSON logging", "Health checks", "Retries", "Backoff", "Correlation IDs", "Docker logs"],
  },
] as const;

export const education = [
  {
    institution: "Gems Arts and Science College, Ramapuram",
    qualification: "Bachelor of Computer Applications",
    period: "2019 - 2022",
    location: "Malappuram, Kerala, India",
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const profile = {
  name: "Adil Jaseem",
  initials: "AJ",
  role: "Full Stack Developer",
  company: "Numenor",
  location: "Trivandrum, Kerala, India",
  focus: "React on the front end, Python on the back end",
  email: "adiljaseem.2000@gmail.com",
  phone: "+91 62389 33779",
  yearsExperience: "3+",
  availability: "Open to full-time roles and selected projects",
  resumeHref: "/resume.pdf",
  social: {
    github: "https://github.com/adeljaseem",
    linkedin: "https://www.linkedin.com/in/adil-jaseem-775457231",
    instagram: "https://www.instagram.com/adelljaseem",
  },
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Full Stack Developer · Trivandrum",
  headline: ["I turn", "complex work", "into", "clear products."],
  plainHeadline: "I build complete products, from React interfaces to Python services.",
  sub: "My main focus is React on the front end and Python on the back end. I also work with APIs, databases, real-time features, local AI, and the deployment work needed to keep a product running.",
  ctaPrimary: { label: "View projects", href: "#work" },
  ctaSecondary: { label: "Contact me", href: "#contact" },
};

export const WORLD_POSITIONS: [number, number][] = [
  [-11, 34],
  [11, 16],
  [-11, 0],
  [11, -16],
  [-11, -34],
];

export const SPAWN_POINT: [number, number, number] = [0, 1.7, 48];
export const EYE_HEIGHT = 1.7;
export const WORLD_RADIUS = 52;

export type Station = {
  label: string;
  code: string;
  href: string;
  featured?: boolean;
};

export const district: Station[] = [
  { label: "Home", code: "00", href: "#home" },
  { label: "About", code: "01", href: "#about" },
  { label: "Experience", code: "02", href: "#experience" },
  { label: "Projects", code: "03", href: "#work", featured: true },
  { label: "Skills", code: "04", href: "#skills" },
  { label: "Contact", code: "05", href: "#contact" },
];

export const about = {
  paragraphs: [
    "I am a full stack developer with more than three years of experience building web products and the services behind them.",
    "React and TypeScript are where I spend most of my time on the front end. On the back end, I mainly work with Python and FastAPI, along with PostgreSQL, RabbitMQ, WebSockets, and Docker.",
    "I like owning a feature from the first screen to the API, database, background jobs, and release. I try to keep things simple: make the product useful, keep the code clear, and leave it easy to maintain.",
  ],
  readouts: [
    { label: "Experience", value: "3+ years" },
    { label: "Front end", value: "React" },
    { label: "Back end", value: "Python" },
    { label: "Working style", value: "End to end" },
  ],
};

export type Achievement = string;

export const experience: {
  role: string;
  company: string;
  companyUrl?: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  achievements: Achievement[];
  stack: string[];
}[] = [
  {
    role: "Full Stack Developer",
    company: "Numenor",
    start: "Feb 2025",
    end: "Present",
    location: "Trivandrum, Kerala, India",
    summary:
      "At Numenor, I work across Quantifore's React product and the Python services behind it. My work covers user-facing workflows, request coordination, real-time updates, signal research, local model integration, observability, and releases across development, staging, and production.",
    achievements: [
      "Built the React and TypeScript application across authentication, onboarding, dashboards, monitoring, alerts, causal views, simulations, administration, settings, and live activity.",
      "Built Python services for request handling, workflow coordination, query parsing, entity resolution, signal scheduling, and WebSocket delivery.",
      "Designed RabbitMQ flows for service jobs, progress updates, retries, failure handling, and communication between services.",
      "Built the Signal Scraper and Signal Scheduler, including source checks, crawling, structured extraction, evidence verification, duplicate checks, and alerts.",
      "Integrated llama.cpp, Ollama, and other local model options with model routing, concurrency limits, retries, and developer controls.",
      "Set up Docker-based environments and observability for development, staging, and production.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "RabbitMQ",
      "PostgreSQL",
      "llama.cpp",
      "Docker",
      "WebSocket",
      "Grafana",
    ],
  },
];

export const pipeline = [
  { n: "01", label: "Query Planning" },
  { n: "02", label: "Web Search" },
  { n: "03", label: "Trust Filtering" },
  { n: "04", label: "Model Screening" },
  { n: "05", label: "Crawling" },
  { n: "06", label: "Extraction" },
  { n: "07", label: "Verification" },
  { n: "08", label: "Geocoding" },
  { n: "09", label: "Duplicate Check" },
  { n: "10", label: "Persistence" },
];

export type SkillCategory = {
  title: string;
  items: { name: string; icon: string }[];
};

export const skills: SkillCategory[] = [
  {
    title: "Front end",
    items: [
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    title: "Back end",
    items: [
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Node.js", icon: "node" },
      { name: "gRPC", icon: "grpc" },
      { name: "GraphQL", icon: "graphql" },
    ],
  },
  {
    title: "AI and local models",
    items: [
      { name: "llama.cpp", icon: "llama" },
      { name: "Ollama", icon: "ollama" },
      { name: "OpenAI API", icon: "openai" },
      { name: "Gemini AI", icon: "gemini" },
      { name: "LangChain", icon: "langchain" },
    ],
  },
  {
    title: "Data and messaging",
    items: [
      { name: "SQL", icon: "sql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "TimescaleDB", icon: "timescale" },
      { name: "Redis", icon: "redis" },
      { name: "Neo4j and Apache AGE", icon: "neo4j" },
      { name: "RabbitMQ", icon: "rabbitmq" },
    ],
  },
  {
    title: "Platform and mobile",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Grafana", icon: "grafana" },
      { name: "Debezium", icon: "debezium" },
      { name: "Okta and Authentik", icon: "okta" },
      { name: "Capacitor", icon: "workflow" },
      { name: "Android Studio", icon: "workflow" },
      { name: "Java", icon: "workflow" },
      { name: "Git", icon: "git" },
    ],
  },
];

export const featuredProject = {
  tag: "Enterprise · Confidential",
  name: "Quantifore",
  role: "Signal intelligence and system simulation platform",
  description:
    "Quantifore brings market signals, causal relationships, and simulation into one product. I work across the React interface and the Python services that collect data, coordinate jobs, run local models, and deliver live updates.",
  highlights: [
    "Ten-stage signal flow with source evidence checks",
    "Self-hosted llama.cpp models for controlled inference",
    "RabbitMQ workflows across core services",
    "WebSocket updates for live progress and alerts",
  ],
  stack: [
    "React",
    "TypeScript",
    "Python",
    "FastAPI",
    "RabbitMQ",
    "PostgreSQL",
    "llama.cpp",
    "Docker",
    "gRPC",
  ],
};

export type Project = {
  name: string;
  tag: string;
  description: string;
  stack: string[];
  highlights?: string[];
  href?: string;
  codeHref?: string;
};

export const secondaryProjects: Project[] = [
  {
    name: "Spendwise",
    tag: "Android finance app",
    description:
      "A personal budgeting and expense app built with React, Supabase, Capacitor, and native Android code. I connected the web app to Android Studio and built a Java flow that listens for new bank debit SMS alerts. Clear debit messages are parsed on the device, checked for duplicates, and placed in a review inbox. High-confidence payments can be added automatically, while raw SMS text is never saved or uploaded.",
    highlights: [
      "New bank debit SMS detection on Android",
      "Review inbox with optional automatic entry",
      "On-device parsing and duplicate protection",
      "Permission and privacy controls",
    ],
    stack: ["React", "Supabase", "Capacitor", "Android Studio", "Java"],
  },
  {
    name: "Newsraven",
    tag: "AI search",
    description:
      "An AI search product that helps users find related news and build stories from selected results. I built the React interface, along with the Node.js and GraphQL data flow.",
    stack: ["React", "Node.js", "GraphQL", "PostgreSQL"],
  },
  {
    name: "Clinasyst",
    tag: "Client project",
    description:
      "A client product focused on responsive React screens, live data views, and careful interaction details.",
    stack: ["React"],
  },
];

export const earlierBuilds: Project[] = [
  {
    name: "PeakStays",
    tag: "Travel booking interface",
    description: "A travel booking interface built in React.",
    stack: ["React"],
    codeHref: "https://github.com/adeljaseem/travelapp-peakstays",
  },
  {
    name: "Restaurant",
    tag: "Full stack demo",
    description: "An early restaurant ordering demo built while learning full stack development.",
    stack: ["React"],
    codeHref: "https://github.com/adeljaseem/restaurant",
  },
  {
    name: "Weather App",
    tag: "API integration",
    description: "A weather dashboard that reads a public forecast API.",
    stack: ["React"],
  },
  {
    name: "Trading Dashboard",
    tag: "Interface practice",
    description: "A trading dashboard built to practise complex interface layouts.",
    stack: ["React"],
  },
];

export const contact = {
  heading: "Let's talk",
  sub: "Have a role, product, or collaboration in mind? Send me a message.",
  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  },
};

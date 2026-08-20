import type { IconType } from "react-icons";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiFastapi,
  SiNodedotjs,
  SiGraphql,
  SiOllama,
  SiGooglegemini,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiRedis,
  SiNeo4J,
  SiRabbitmq,
  SiDocker,
  SiKubernetes,
  SiGrafana,
  SiOkta,
  SiGit,
  SiTimescale,
} from "react-icons/si";
import {
  Database,
  Workflow,
  Sparkles,
  Cpu,
  Network,
  Radio,
} from "lucide-react";

// A handful of technologies don't have a Simple Icons brand mark (or the
// mark doesn't read well at small sizes) — these fall back to a generic
// lucide icon that still communicates the right idea.
export const iconMap: Record<string, IconType> = {
  python: SiPython,
  typescript: SiTypescript,
  javascript: SiJavascript,
  sql: Database as unknown as IconType,
  fastapi: SiFastapi,
  node: SiNodedotjs,
  grpc: Network as unknown as IconType,
  graphql: SiGraphql,
  llama: Cpu as unknown as IconType,
  ollama: SiOllama,
  openai: Sparkles as unknown as IconType,
  gemini: SiGooglegemini,
  langchain: Workflow as unknown as IconType,
  workflow: Workflow as unknown as IconType,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  postgresql: SiPostgresql,
  timescale: SiTimescale,
  redis: SiRedis,
  neo4j: SiNeo4J,
  rabbitmq: SiRabbitmq,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  grafana: SiGrafana,
  debezium: Radio as unknown as IconType,
  okta: SiOkta,
  git: SiGit,
};

export function getIcon(key: string): IconType {
  return iconMap[key] ?? Sparkles;
}

// Renders directly (rather than returning a component reference for the
// caller to use as a JSX tag) since `icon` keys are a fixed, stable lookup
// table of already-declared components, not freshly created per render.
export function renderTechIcon(key: string, className?: string) {
  const Icon = iconMap[key] ?? Sparkles;
  return <Icon className={className} aria-hidden />;
}

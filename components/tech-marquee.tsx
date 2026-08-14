const technologies = [
  "React",
  "TypeScript",
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
  "Bash",
  "Kong",
  "Authentik",
  "Ollama",
  "llama.cpp",
  "Grafana",
  "Loki",
  "Grafana Alloy",
  "Git",
];

export function TechMarquee() {
  return (
    <div className="marquee-shell" aria-label="Technology focus">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {technologies.map((technology) => (
              <span key={`${copy}-${technology}`} className="marquee-item">
                <span className="size-1 rounded-full bg-cyan-300/70" />
                {technology}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

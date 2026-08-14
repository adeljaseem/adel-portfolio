const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://adil-portfolio.vercel.app";

const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "916238933779";
const whatsappMessage = encodeURIComponent(
  "Hi Adil, I found your portfolio and would like to discuss a software engineering opportunity.",
);

export const siteConfig = {
  name: "Adil Jaseem",
  firstName: "Adil",
  title: "Full Stack Software Engineer - AI Platforms & Distributed Systems",
  description:
    "Full Stack Software Engineer with 3+ years of professional experience building analytical React products, Python microservices, event-driven workflows, self-hosted LLM infrastructure, and multi-environment platforms.",
  url: configuredSiteUrl.replace(/\/+$/, ""),
  location: "Trivandrum, Kerala, India",
  email: "adiljaseem.2000@gmail.com",
  phone: "+91 6238933779",
  employer: "Numenor",
  role: "Full Stack Developer",
  availability: "Open to Full Stack, Backend, Platform, and AI Platform engineering roles",
  resumePath: "/resume/adil-jaseem-resume.pdf",
  resumeDocxPath: "/resume/adil-jaseem-resume.docx",
  links: {
    github: "https://github.com/adeljaseem",
    linkedin: "https://www.linkedin.com/in/adil-jaseem-775457231/",
    whatsapp: `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
  },
} as const;

export const navItems = [
  { label: "About", href: "/#about", section: "about" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Platform", href: "/#architecture", section: "architecture" },
  { label: "Work", href: "/#work", section: "work" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "Contact", href: "/#contact", section: "contact" },
] as const;

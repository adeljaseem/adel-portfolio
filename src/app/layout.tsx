import type { Metadata } from "next";
import { profile } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description:
    "Full Stack Developer working mainly with React and Python, plus real-time services and production systems.",
  keywords: [
    "Adil Jaseem",
    "Full Stack Developer",
    "Python",
    "FastAPI",
    "React",
    "Android",
    "Trivandrum",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description:
      "React interfaces, Python services, data systems, local AI, and production work in one portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-void text-ink antialiased">{children}</body>
    </html>
  );
}

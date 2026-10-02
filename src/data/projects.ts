export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  slug: string;
  github?: string;
  live?: string;
  details: string;
}

export const projects: ProjectItem[] = [
  {
    id: "zola",
    title: "Zola App",
    description: "A full-featured dating and social connection platform featuring real-time messaging, VoIP calling, and personality-based matching algorithms.",
    tech: ["React Native", "TypeScript", "Agora", "CallKeep", "WebSockets"],
    slug: "zola-app",
    details: "Built the mobile client featuring real-time state synchronization, foreground/background call notifications, and low-latency WebSockets.",
  },
  {
    id: "miss-stitch",
    title: "Miss Stitch — Luxury Couture & Atelier System",
    description: "A full-stack Pakistani luxury ethnic e-commerce platform and workshop atelier operations system bridging unstitched designer fabrics with bespoke made-to-measure tailoring.",
    tech: ["Next.js 16", "React 19", "Supabase", "Tailwind CSS v4", "Zustand"],
    slug: "miss-stitch",
    github: "https://github.com/FahadIqball/Miss-Stitch-Web",
    live: "https://miss-stitch.vercel.app",
    details: "Architected the full-stack system with Next.js 16 App Router, Supabase PostgreSQL RLS, bespoke tailoring measurement engines, and a workshop operations portal with printable tailor job cards.",
  },

  {
    id: "framework-detector",
    title: "App Framework Detector",
    description: "Analysis tool for detecting mobile application frameworks and libraries used in Android apps, developed by scanning metadata and signatures.",
    tech: ["Android Studio", "Java/Kotlin", "Python", "Metadata Scanning"],
    slug: "app-framework-detector",
    details: "Developed algorithms to scan APK archives, analyzing binary signatures and dependency files to identify the underlying build stack.",
  },
  {
    id: "ziuu",
    title: "Ziuu",
    description: "A dual-sided mobile marketplace application for gas cylinder & water can ordering, tracking, and fulfillment built with React Native.",
    tech: ["React Native", "TypeScript", "Google Maps API", "Push Notifications"],
    slug: "ziuu",
    details: "Engineered two distinct apps (client-facing and driver-facing) connected to a real-time order tracking and dispatch system.",
  },
  {
    id: "tjiepp",
    title: "Tjiepp",
    description: "A universal e-commerce and delivery platform allowing users to shop standard catalogs or purchase custom products via AI url scraping.",
    tech: ["React Native", "TypeScript", "AI Web Scraping", "Payment Gateways"],
    slug: "tjiepp",
    details: "Integrated a custom parser that reads product pages from any website, extracts catalog information using AI, and loads it into a checkout interface.",
  },
];

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  slug: string;
  github?: string;
  live?: string;
  details: string;
  image: string;
  deviceType: "mobile" | "web";
}

export const projects: ProjectItem[] = [
  {
    id: "zola",
    title: "Zola App",
    description: "A full-featured dating and social connection platform featuring real-time messaging, VoIP calling, and personality-based matching algorithms.",
    tech: ["React Native", "TypeScript", "Agora", "CallKeep", "WebSockets"],
    slug: "zola-app",
    github: "https://github.com/FahadIqball",
    details: "Built the mobile client featuring real-time state synchronization, foreground/background call notifications, and low-latency WebSockets.",
    image: "/images/projects/zola-app/screenshot1.png",
    deviceType: "mobile",
  },
  {
    id: "miss-stitch",
    title: "Miss Stitch",
    description: "A full-stack bespoke luxury fashion e-commerce platform and atelier operations system combining designer fabrics with custom made-to-measure tailoring.",
    tech: ["Next.js 16", "React 19", "Supabase", "Tailwind CSS", "Zustand"],
    slug: "miss-stitch",
    github: "https://github.com/FahadIqball/Miss-Stitch-Web",
    live: "https://miss-stitch-web.vercel.app",
    details: "Architected the full-stack system with Next.js 16 App Router, custom measurement engines, and a workshop operations portal for order management.",
    image: "/images/projects/miss-stitch/missstitch1.png",
    deviceType: "web",
  },
  {
    id: "framework-detector",
    title: "App Framework Detector",
    description: "Analysis tool for detecting mobile application frameworks and libraries used in Android apps, developed by scanning metadata and signatures.",
    tech: ["Android Studio", "Java/Kotlin", "Python", "Metadata Scanning"],
    slug: "app-framework-detector",
    github: "https://github.com/FahadIqball",
    details: "Developed algorithms to scan APK archives, analyzing binary signatures and dependency files to identify the underlying build stack.",
    image: "/images/projects/app-framework-detector/screenshot1.png",
    deviceType: "mobile",
  },
  {
    id: "ziuu",
    title: "Ziuu",
    description: "A dual-sided mobile marketplace application for gas cylinder & water can ordering, tracking, and fulfillment built with React Native.",
    tech: ["React Native", "TypeScript", "Google Maps API", "Push Notifications"],
    slug: "ziuu",
    github: "https://github.com/FahadIqball",
    details: "Engineered two distinct apps (client-facing and driver-facing) connected to a real-time order tracking and dispatch system.",
    image: "/images/projects/ziuu/screenshot1.png",
    deviceType: "mobile",
  },
  {
    id: "tjiepp",
    title: "Tjiepp",
    description: "A universal e-commerce and delivery platform allowing users to shop standard catalogs or purchase custom products via AI url scraping.",
    tech: ["React Native", "TypeScript", "AI Web Scraping", "Payment Gateways"],
    slug: "tjiepp",
    github: "https://github.com/FahadIqball",
    details: "Integrated a custom parser that reads product pages from any website, extracts catalog information using AI, and loads it into a checkout interface.",
    image: "/images/projects/tjiepp/hero.png",
    deviceType: "mobile",
  },
];

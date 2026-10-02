export interface SkillCategory {
  title: string;
  items: { name: string; iconSlug: string }[];
}

export interface CapabilityItem {
  title: string;
  icon: "globe" | "database" | "bell" | "zap" | "smartphone" | "credit-card";
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    items: [
      { name: "TypeScript", iconSlug: "typescript" },
      { name: "JavaScript", iconSlug: "javascript" },
      { name: "HTML5", iconSlug: "html5" },
      { name: "CSS3", iconSlug: "css3" },
    ],
  },
  {
    title: "Frameworks & State",
    items: [
      { name: "Next.js", iconSlug: "nextjs" },
      { name: "React", iconSlug: "react" },
      { name: "React Native", iconSlug: "reactnative" },
      { name: "Expo", iconSlug: "expo" },
      { name: "Tailwind CSS", iconSlug: "tailwindcss" },
      { name: "Zustand", iconSlug: "zustand" },
      { name: "Redux", iconSlug: "redux" },
    ],
  },
  {
    title: "Databases & Cloud",
    items: [
      { name: "Supabase", iconSlug: "supabase" },
      { name: "Firebase", iconSlug: "firebase" },
    ],
  },
  {
    title: "Tools & Ecosystem",
    items: [
      { name: "Git", iconSlug: "git" },
      { name: "GitHub", iconSlug: "github" },
      { name: "Android Studio", iconSlug: "androidstudio" },
      { name: "Postman", iconSlug: "postman" },
    ],
  },
];

export const coreCapabilities: CapabilityItem[] = [
  { title: "Server-Side Rendering (SSR) & App Router", icon: "globe" },
  { title: "Full-Stack Relational Databases & RLS", icon: "database" },
  { title: "Push Notifications & Deep Linking", icon: "bell" },
  { title: "Real-Time WebSockets & Live State Sync", icon: "zap" },
  { title: "Native Modules & Device Integrations", icon: "smartphone" },
  { title: "Payment Gateways & E-Commerce Checkouts", icon: "credit-card" },
];

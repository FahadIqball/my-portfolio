export interface SkillCategory {
  title: string;
  items: { name: string; iconSlug: string }[];
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
      { name: "React Native", iconSlug: "reactnative" },
      { name: "React", iconSlug: "react" },
      { name: "Expo", iconSlug: "expo" },
      { name: "Redux", iconSlug: "redux" },
      { name: "Zustand", iconSlug: "zustand" },
    ],
  },
  {
    title: "Databases & Cloud",
    items: [
      { name: "Firebase", iconSlug: "firebase" },
      { name: "Supabase", iconSlug: "supabase" },
    ],
  },
  {
    title: "Tools & OS",
    items: [
      { name: "Git", iconSlug: "git" },
      { name: "GitHub", iconSlug: "github" },
      { name: "Android Studio", iconSlug: "androidstudio" },
      { name: "Postman", iconSlug: "postman" },
    ],
  },
];

export const mobileFeatures = [
  "Push Notifications",
  "Deep Linking",
  "Background Tasks",
  "Native Modules Integration",
  "Google Maps API",
  "Payment Gateways (Stripe, etc.)",
];

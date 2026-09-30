export interface ExperienceRole {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export const experiences: ExperienceRole[] = [
  {
    company: "D12 Solutions",
    role: "React Native Developer",
    period: "Feb 2026 – Present",
    location: "Rahim Yar Khan, Pakistan",
    bullets: [
      "Engineered secure payment gateways, cloud functions, and third-party API integrations inside React Native apps.",
      "Integrated AI-powered features to enhance mobile workflow automation and user experiences.",
      "Managed direct client communications for requirement gathering and project updates in Agile/Scrum environments.",
    ],
  },
  {
    company: "Prepared Development Pvt. ltd",
    role: "React Native Developer",
    period: "Feb 2024 – Jan 2026",
    location: "Remote",
    bullets: [
      "Developed high-performance cross-platform Android & iOS applications translating UI/UX designs into responsive, reusable components.",
      "Integrated complex RESTful APIs, managed app state using React Hooks & Context API, and implemented offline persistence with AsyncStorage.",
      "Optimized app runtimes, fixed critical bugs, and maintained modular architecture with strict Git/GitHub collaborative workflows.",
    ],
  },
  {
    company: "Oracions.inc",
    role: "React Native Intern",
    period: "Sep 2023 – Feb 2024",
    location: "Rahim Yar Khan, Pakistan",
    bullets: [
      "Built a wisdom and story-sharing application, implementing core UI screens, custom navigation, and basic state management.",
      "Integrated backend application logic and handling user interactions during a project-focused internship.",
    ],
  },
];

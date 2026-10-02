import AnimatedSection from "../ui/AnimatedSection";
import styles from "./About.module.css";

export default function About() {
  return (
    <AnimatedSection id="about" className={styles.aboutSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="mono-label">01 // Who I Am</span>
          <h2 className={styles.title}>ABOUT ME</h2>
          <div className={styles.line} />
        </div>

        <div className={styles.content}>
          <p className={styles.paragraph}>
            I am a full-stack engineer specializing in modern web and mobile application architecture. 
            My work focuses on building high-performance web platforms with Next.js alongside 
            scalable cross-platform mobile applications with React Native, bridging aesthetic UI design 
            with resilient backend infrastructure.
          </p>
          <p className={styles.paragraph}>
            My expertise spans end-to-end product engineering—from designing relational schemas with 
            Supabase and building responsive web interfaces to managing complex state, real-time WebSockets, 
            and custom native integrations for iOS and Android.
          </p>
          <p className={styles.paragraph}>
            I value clean architecture, type safety with TypeScript, and agile collaboration. 
            Whether optimizing application render performance, implementing secure checkout flows, 
            or integrating AI-powered workflows, I focus on shipping maintainable and production-ready code.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

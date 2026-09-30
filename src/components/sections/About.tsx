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
            I am a software engineer specializing in cross-platform mobile architecture. 
            My daily work focuses on building robust Android and iOS applications with React Native, 
            where I bridge high-fidelity UI designs with complex system integrations.
          </p>
          <p className={styles.paragraph}>
            My expertise lies in managing complex app states, engineering real-time data layers 
            using WebSockets, and implementing VoIP calling. I am comfortable writing custom native 
            handles when standard wrappers fall short, ensuring that cross-platform limitations never 
            get in the way of performance.
          </p>
          <p className={styles.paragraph}>
            I enjoy clean architecture, type safety with TypeScript, and agile collaboration. 
            Whether optimizing application startup performance or integrating AI-powered workflow automation, 
            I focus on writing testable, reusable, and modular code.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

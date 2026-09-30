import { projects } from "@/data/projects";
import Carousel from "../ui/Carousel";
import AnimatedSection from "../ui/AnimatedSection";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <AnimatedSection id="projects" className={styles.projectsSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="mono-label">03 // Creations</span>
          <h2 className={styles.title}>FEATURED PROJECTS</h2>
          <div className={styles.line} />
        </div>
        
        <Carousel items={projects} />
      </div>
    </AnimatedSection>
  );
}

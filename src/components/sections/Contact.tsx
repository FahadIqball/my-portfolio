import { Mail, ArrowUpRight } from "lucide-react";
import TechIcon from "../ui/TechIcon";
import AnimatedSection from "../ui/AnimatedSection";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <AnimatedSection id="contact" className={styles.contactSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="mono-label">05 // Collaboration</span>
          <h2 className={styles.title}>CONTACT</h2>
          <div className={styles.line} />
        </div>

        <div className={styles.content}>
          <h2 className={styles.statement}>
            LET&apos;S BUILD SOMETHING TOGETHER.
          </h2>

          <div className={styles.emailContainer}>
            <span className={styles.emailLabel}>Get in touch:</span>
            <a href="mailto:fahadiqbalaps@gmail.com" className={styles.emailLink}>
              fahadiqbalaps@gmail.com
              <ArrowUpRight size={24} className={styles.arrow} />
            </a>
          </div>

          <div className={styles.socialRow}>
            <a
              href="https://linkedin.com/in/fadyyy"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <TechIcon slug="linkedin" size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/FahadIqball"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <TechIcon slug="github" size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

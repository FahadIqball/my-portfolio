import Link from "next/link";
import { Mail } from "lucide-react";
import TechIcon from "@/components/ui/TechIcon";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.copyright}>
          <span className="mono-label">© {currentYear} FAHAD IQBAL</span>
          <span className={styles.tagline}>Crafted with care · Code first</span>
        </div>

        <div className={styles.socials}>
          <a
            href="https://github.com/FahadIqball"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className={styles.socialLink}
          >
            <TechIcon slug="github" size={18} />
          </a>
          <a
            href="https://linkedin.com/in/fadyyy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className={styles.socialLink}
          >
            <TechIcon slug="linkedin" size={16} />
          </a>
          <a
            href="mailto:fahadiqbalaps@gmail.com"
            aria-label="Email Me"
            className={styles.socialLink}
          >
            <Mail size={18} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
